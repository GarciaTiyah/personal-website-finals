import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './Achievements.css';

// Import achievement images
import achievement1 from '../../assets/images/Achievements1.png';
import achievement2 from '../../assets/images/Achievements2.png';
import achievement3 from '../../assets/images/Achievements3.png';
import achievement4 from '../../assets/images/Achievements4.png';
import achievement5 from '../../assets/images/Achievements5.png';
import achievement6 from '../../assets/images/Achievements6.png';

const certifications = [
  {
    id: 1,
    title: 'Achievement 1',
    image: achievement1,
    date: '2024'
  },
  {
    id: 2,
    title: 'Achievement 2',
    image: achievement2,
    date: '2024'
  },
  {
    id: 3,
    title: 'Achievement 3',
    image: achievement3,
    date: '2024'
  },
  {
    id: 4,
    title: 'Achievement 4',
    image: achievement4,
    date: '2024'
  },
  {
    id: 5,
    title: 'Achievement 5',
    image: achievement5,
    date: '2024'
  },
  {
    id: 6,
    title: 'Achievement 6',
    image: achievement6,
    date: '2024'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Achievements() {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <PageTransition>
      <section className="page-section achievements-section">
        <h1 className="section-title">Achievements & Certifications</h1>
        <motion.div
          className="certifications-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="certification-item"
              variants={itemVariants}
              onClick={() => openModal(cert)}
            >
              <div className="certification-image">
                <img src={cert.image} alt={cert.title} loading="lazy" />
                <div className="certification-overlay">
                  <h3>{cert.title}</h3>
                  <p>{cert.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={closeModal}>×</button>
                <img src={selectedCert.image} alt={selectedCert.title} />
                <div className="modal-info">
                  <h3>{selectedCert.title}</h3>
                  <p>Achieved: {selectedCert.date}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
