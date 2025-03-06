import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import './Education.css';

const educationData = [
  {
    year: '2023 - Present',
    degree: 'Information Technology',
    school: 'Asia Pacific Colleges',
    description: 'Currently pursuing a degree in Information Technology, focusing on software development and system architecture.'
  },
  {
    year: '2022 - 2023',
    degree: 'Senior High School',
    school: 'Paranaque National Highschool',
    description: 'Completed senior high school education with a focus on technology and computing subjects.'
  },
  {
    year: '2017 - 2022',
    degree: 'High School Diploma',
    school: 'Paranaque National Highschool',
    description: 'Completed junior high school education, developing strong foundations in mathematics and science.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Education() {
  return (
    <PageTransition>
      <section className="page-section education-section">
        <h1 className="section-title">Education</h1>
        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content card">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-degree">{item.degree}</h3>
                <h4 className="timeline-school">{item.school}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
