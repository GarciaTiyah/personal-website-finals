import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './ITExperience.css';

const skills = [
  {
    name: 'HTML',
    percentage: 80,
    color: '#E44D26'
  },
  {
    name: 'CSS',
    percentage: 75,
    color: '#264DE4'
  },
  {
    name: 'JavaScript',
    percentage: 80,
    color: '#F7DF1E'
  },
  {
    name: 'Figma',
    percentage: 90,
    color: '#F24E1E'
  },
  {
    name: 'Python',
    percentage: 70,
    color: '#3776AB'
  },
  {
    name: 'Java',
    percentage: 90,
    color: '#007396'
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
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: width => ({
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};

export default function ITExperience() {
  return (
    <PageTransition>
      <section className="page-section experience-section">
        <h1 className="section-title">Technical Skills</h1>
        <motion.div
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-item"
              variants={itemVariants}
            >
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <div className="skill-progress-bg">
                <motion.div
                  className="skill-progress-bar"
                  custom={skill.percentage}
                  variants={progressVariants}
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
