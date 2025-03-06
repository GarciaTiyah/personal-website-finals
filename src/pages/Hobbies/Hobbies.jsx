import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './Hobbies.css';

const hobbies = [
  {
    title: 'Gym',
    icon: '💪',
    description: 'Regular strength training and fitness workouts to maintain a healthy lifestyle.'
  },
  {
    title: 'Basketball',
    icon: '🏀',
    description: 'Playing basketball with Friends and Family.'
  },
  {
    title: 'Gaming',
    icon: '🎮',
    description: 'Playing strategy games and RPGs, Indie games, and casual games.'
  }
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Hobbies() {
  return (
    <PageTransition>
      <section className="page-section hobbies-section">
        <h1 className="section-title">Hobbies</h1>
        <motion.div
          className="hobbies-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              className="hobby-card"
              variants={itemVariants}
            >
              <div className="hobby-icon">{hobby.icon}</div>
              <h3 className="hobby-title">{hobby.title}</h3>
              <p className="hobby-description">{hobby.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
