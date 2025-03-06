import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import { supabase } from '../../lib/supabase';
import './Feedback.css';

export default function Feedback() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch initial feedback data
    fetchFeedback();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:feedback')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        (payload) => {
          setFeedbackList(currentFeedback => [payload.new, ...currentFeedback]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbackList(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFeedback = {
        name: name.trim() || 'Anonymous',
        content: feedback,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('feedback')
        .insert([newFeedback])
        .select();

      if (error) throw error;

      // Optimistically update the UI with the new feedback
      if (data && data.length > 0) {
        setFeedbackList(currentFeedback => [data[0], ...currentFeedback]);
      }

      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <PageTransition>
      <div className="page-container">
        <div className="page-section feedback-container">
          <h1 className="section-title">Feedback & Suggestions</h1>
          <div className="feedback-content-wrapper">
            <motion.form 
              className="feedback-form card"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="form-group">
                <label htmlFor="name">Name (Optional)</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts or suggestions..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit Feedback</button>
            </motion.form>

            <motion.div 
              className="feedback-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>Previous Feedback</h2>
              {feedbackList.length === 0 ? (
                <p className="no-feedback">No feedback submitted yet.</p>
              ) : (
                feedbackList.map(item => (
                  <motion.div 
                    key={item.id} 
                    className="feedback-item card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="feedback-header">
                      <h3>{item.name}</h3>
                    </div>
                    <p className="feedback-content">{item.content}</p>
                    <span className="feedback-timestamp">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
