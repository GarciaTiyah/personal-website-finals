import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './PhotoGallery.css';

// Import gallery images
import gallery1 from '../../assets/images/Gallery1.jpg';
import gallery2 from '../../assets/images/Gallery2.jpg';
import gallery3 from '../../assets/images/Gallery3.jpg';
import gallery4 from '../../assets/images/Gallery4.jpg';
import gallery5 from '../../assets/images/Gallery5.jpg';
import gallery6 from '../../assets/images/Gallery6.jpg';
import gallery7 from '../../assets/images/Gallery7.jpg';
import gallery8 from '../../assets/images/Gallery8.jpg';
import gallery9 from '../../assets/images/Gallery9.jpg';
import gallery10 from '../../assets/images/Gallery10.jpg';
import gallery11 from '../../assets/images/Gallery11.jpg';
import gallery12 from '../../assets/images/Gallery12.jpg';
import gallery13 from '../../assets/images/Gallery13.jpg';
import gallery14 from '../../assets/images/Gallery14.jpg';
import gallery15 from '../../assets/images/Gallery15.jpg';

const photos = [
  { id: 1, url: gallery1, title: 'Museum', description: 'Raiding the Museum in the SouthWestern' },
  { id: 2, url: gallery2, title: 'Mallari', description: 'Movie Watching with the boys' },
  { id: 3, url: gallery3, title: 'Museum', description: 'Collaborating with classmates' },
  { id: 4, url: gallery4, title: 'Museum', description: 'Stolen photos of Me' },
  { id: 5, url: gallery5, title: 'Museum', description: 'Bidyuhiko' },
  { id: 6, url: gallery6, title: 'Mak', description: 'The Man Cant be Move' },
  { id: 7, url: gallery7, title: 'Rides?', description: 'The First ever Filipino man to do Bangking in Arcade' },
  { id: 8, url: gallery8, title: 'Museum', description: 'Angel' },
  { id: 9, url: gallery9, title: 'Museum', description: 'Looking at the Most Beautiful Woman of the Past' },
  { id: 10, url: gallery10, title: 'Museum', description: 'Raiders' },
  { id: 11, url: gallery11, title: 'Museum', description: 'The Prodigy Kid' },
  { id: 12, url: gallery12, title: 'Gym', description: 'Sir, I miss her' },
  { id: 13, url: gallery13, title: 'MSC Event', description: 'Miscrosoft Event' },
  { id: 14, url: gallery14, title: 'Senior High School Event', description: 'With The OG gang' },
  { id: 15, url: gallery15, title: 'SHS Graduation', description: 'The Trio' }
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <PageTransition>
      <section className="page-section gallery-section">
        <h1 className="section-title">Photo Gallery</h1>
        <motion.div
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="gallery-item"
              variants={itemVariants}
              onClick={() => openModal(photo)}
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="gallery-item-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedPhoto && (
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
                <img src={selectedPhoto.url} alt={selectedPhoto.title} />
                <div className="modal-text">
                  <h3>{selectedPhoto.title}</h3>
                  <p>{selectedPhoto.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
