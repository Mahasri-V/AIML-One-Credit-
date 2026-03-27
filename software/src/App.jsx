import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">My Portfolio</div>
        <ul className="nav-links">
          {['hero', 'about', 'skills', 'projects', 'contact'].map(section => (
            <li key={section}>
              <a 
                href={`#${section}`} 
                className={activeSection === section ? 'active' : ''}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm John Doe</h1>
          <p className="hero-subtitle">Full Stack Developer & UI/UX Designer</p>
          <button className="cta-button">View My Work</button>
        </div>
        <div className="hero-bg">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <p>I'm a passionate developer with 5 years of experience creating beautiful and functional web applications.</p>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {['React', 'JavaScript', 'CSS', 'Node.js', 'Python', 'UI/UX'].map(skill => (
              <div key={skill} className="skill-card">
                <h3>{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            {[1,2,3].map(i => (
              <div key={i} className="project-card">
                <h3>Project {i}</h3>
                <p>Description of project {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact</h2>
          <p>Get in touch!</p>
        </div>
      </section>
    </div>
  );
}

export default App;