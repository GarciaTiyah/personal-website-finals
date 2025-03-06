import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './Goals.css';

const goals = {
  shortTerm: [
    {
      title: 'AI and Machine Learning Fundamentals',
      description: 'Learn the basics of AI and machine learning, including algorithms, data analysis, and model training.',
      timeline: '2 months'
    },
    {
      title: 'Enhance AI Security Skills',
      description: 'DEvelop skills in AI security, including data protection, encryption, and secure model deployment.',
      timeline: '3 months'
    },
    {
      title: 'Develop Portfolio Projects',
      description: 'Build three full-stack applications showcasing different technologies, including databases, APIs, and front-end frameworks.',
      timeline: '4 months'
    }
  ],
  longTerm: [
    {
      title: 'Start a Tech Company',
      description: 'Launch a startup focused on innovative software solutions that address real-world problems.',
      timeline: '5 years'
    },
    {
      title: 'Become an IT Manager or Tech Lead',
      description: 'Lead and mentor a team of developers in a major tech company, focusing on system architecture and development best practices.',
      timeline: '3 years'
    },
    {
      title: 'Create Educational Content',
      description: 'Develop online courses and tutorials to share IT knowledge and mentor aspiring developers.',
      timeline: '2 years'
    }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Goals() {
  return (
    <PageTransition>
      <section className="page-section goals-section">
        <h1 className="section-title">My Goals</h1>
        
        <div className="goals-container">
          <motion.div
            className="goals-category"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="category-title">Short-Term Goals</h2>
            <div className="goals-list">
              {goals.shortTerm.map((goal, index) => (
                <motion.div
                  key={index}
                  className="goal-card"
                  variants={itemVariants}
                >
                  <h3 className="goal-title">{goal.title}</h3>
                  <p className="goal-description">{goal.description}</p>
                  <span className="goal-timeline">Timeline: {goal.timeline}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="goals-category"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="category-title">Long-Term Goals</h2>
            <div className="goals-list">
              {goals.longTerm.map((goal, index) => (
                <motion.div
                  key={index}
                  className="goal-card"
                  variants={itemVariants}
                >
                  <h3 className="goal-title">{goal.title}</h3>
                  <p className="goal-description">{goal.description}</p>
                  <span className="goal-timeline">Timeline: {goal.timeline}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
