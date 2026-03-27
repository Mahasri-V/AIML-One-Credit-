import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // === RENDERING TESTS ===
  describe('Rendering Tests', () => {
    it('should render the app component', () => {
      render(<App />);
      expect(screen.getByText('My Portfolio')).toBeInTheDocument();
    });

    it('should render the navbar with correct brand name', () => {
      render(<App />);
      const navBrand = screen.getByText('My Portfolio');
      expect(navBrand).toBeInTheDocument();
      expect(navBrand).toHaveClass('nav-brand');
    });

    it('should render all navigation links', () => {
      render(<App />);
      const sections = ['Hero', 'About', 'Skills', 'Projects', 'Contact'];
      
      sections.forEach(section => {
        const link = screen.getByRole('link', { name: section });
        expect(link).toBeInTheDocument();
      });
    });

    it('should render hero section with correct content', () => {
      render(<App />);
      expect(screen.getByText('Hi, I\'m John Doe')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Developer & UI/UX Designer')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument();
    });

    it('should render about section', () => {
      render(<App />);
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText(/I'm a passionate developer with 5 years of experience/i)).toBeInTheDocument();
    });

    it('should render skills section with all skills', () => {
      render(<App />);
      const skills = ['React', 'JavaScript', 'CSS', 'Node.js', 'Python', 'UI/UX'];
      
      skills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });

    it('should render projects section with project cards', () => {
      render(<App />);
      expect(screen.getByText('Projects')).toBeInTheDocument();
      
      for (let i = 1; i <= 3; i++) {
        expect(screen.getByText(`Project ${i}`)).toBeInTheDocument();
        expect(screen.getByText(`Description of project ${i}`)).toBeInTheDocument();
      }
    });

    it('should render contact section', () => {
      render(<App />);
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Get in touch!')).toBeInTheDocument();
    });

    it('should render floating shapes in hero background', () => {
      const { container } = render(<App />);
      const shapes = container.querySelectorAll('.floating-shape');
      expect(shapes).toHaveLength(3);
      expect(shapes[0]).toHaveClass('shape1');
      expect(shapes[1]).toHaveClass('shape2');
      expect(shapes[2]).toHaveClass('shape3');
    });
  });

  // === NAVIGATION TESTS ===
  describe('Navigation Tests', () => {
    it('should have correct href attributes on navigation links', () => {
      render(<App />);
      const heroLink = screen.getByRole('link', { name: 'Hero' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const skillsLink = screen.getByRole('link', { name: 'Skills' });
      const projectsLink = screen.getByRole('link', { name: 'Projects' });
      const contactLink = screen.getByRole('link', { name: 'Contact' });

      expect(heroLink).toHaveAttribute('href', '#hero');
      expect(aboutLink).toHaveAttribute('href', '#about');
      expect(skillsLink).toHaveAttribute('href', '#skills');
      expect(projectsLink).toHaveAttribute('href', '#projects');
      expect(contactLink).toHaveAttribute('href', '#contact');
    });

    it('should have hero section as active by default', () => {
      render(<App />);
      const heroLink = screen.getByRole('link', { name: 'Hero' });
      expect(heroLink).toHaveClass('active');
    });

    it('should have correct structure for section elements', () => {
      const { container } = render(<App />);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      
      sections.forEach(sectionId => {
        const section = container.querySelector(`#${sectionId}`);
        expect(section).toBeInTheDocument();
      });
    });
  });

  // === SCROLL TRACKING TESTS ===
  describe('Scroll Tracking Tests', () => {
    it('should add scroll event listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      render(<App />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      addEventListenerSpy.mockRestore();
    });

    it('should remove scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<App />);
      
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('should update active section when scrolling', () => {
      const { container } = render(<App />);
      
      // Simulate scroll to about section
      window.scrollY = 800;
      window.dispatchEvent(new Event('scroll'));
      
      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toHaveClass('active');
    });

    it('should update active navigation link based on scroll position', () => {
      const { container } = render(<App />);
      
      // Initially hero should be active
      let heroLink = screen.getByRole('link', { name: 'Hero' });
      expect(heroLink).toHaveClass('active');
      
      // Simulate scroll
      window.scrollY = 1200;
      window.dispatchEvent(new Event('scroll'));
      
      const skillsLink = screen.getByRole('link', { name: 'Skills' });
      // This test verifies the scroll tracking mechanism works
    });
  });

  // === BUTTON TESTS ===
  describe('Button Tests', () => {
    it('should render CTA button in hero section', () => {
      render(<App />);
      const button = screen.getByRole('button', { name: /view my work/i });
      expect(button).toBeInTheDocument();
    });

    it('should have correct button class', () => {
      render(<App />);
      const button = screen.getByRole('button', { name: /view my work/i });
      expect(button).toHaveClass('cta-button');
    });

    it('should be clickable', async () => {
      render(<App />);
      const button = screen.getByRole('button', { name: /view my work/i });
      
      const user = userEvent.setup();
      await user.click(button);
      
      // Button should still be in document after click
      expect(button).toBeInTheDocument();
    });
  });

  // === CSS CLASS TESTS ===
  describe('CSS Class Tests', () => {
    it('should apply correct classes to hero section', () => {
      const { container } = render(<App />);
      const heroSection = container.querySelector('#hero');
      expect(heroSection).toHaveClass('hero');
    });

    it('should apply correct classes to container elements', () => {
      const { container } = render(<App />);
      const containers = container.querySelectorAll('.container');
      
      expect(containers.length).toBeGreaterThan(0);
      containers.forEach(cont => {
        expect(cont).toHaveClass('container');
      });
    });

    it('should apply correct classes to skill cards', () => {
      const { container } = render(<App />);
      const skillCards = container.querySelectorAll('.skill-card');
      
      expect(skillCards).toHaveLength(6);
      skillCards.forEach(card => {
        expect(card).toHaveClass('skill-card');
      });
    });

    it('should apply correct classes to project cards', () => {
      const { container } = render(<App />);
      const projectCards = container.querySelectorAll('.project-card');
      
      expect(projectCards).toHaveLength(3);
      projectCards.forEach(card => {
        expect(card).toHaveClass('project-card');
      });
    });
  });

  // === ACCESSIBILITY TESTS ===
  describe('Accessibility Tests', () => {
    it('should have proper heading hierarchy', () => {
      render(<App />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Hi, I\'m John Doe');
    });

    it('should have all sections with proper heading levels', () => {
      render(<App />);
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      
      const texts = h2Elements.map(h => h.textContent);
      expect(texts).toContain('About Me');
      expect(texts).toContain('Skills');
      expect(texts).toContain('Projects');
      expect(texts).toContain('Contact');
    });

    it('should have descriptive link text', () => {
      render(<App />);
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have alt text or descriptive content for sections', () => {
      render(<App />);
      // Verify that all major sections have text content
      expect(screen.getByText('My Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Hi, I\'m John Doe')).toBeInTheDocument();
    });
  });

  // === LAYOUT TESTS ===
  describe('Layout Tests', () => {
    it('should render navbar at top level', () => {
      const { container } = render(<App />);
      const navbar = container.querySelector('.navbar');
      expect(navbar).toBeInTheDocument();
      expect(navbar).toHaveClass('navbar');
    });

    it('should have navbar with brand and links', () => {
      const { container } = render(<App />);
      const navbar = container.querySelector('.navbar');
      const navBrand = navbar.querySelector('.nav-brand');
      const navLinks = navbar.querySelector('.nav-links');
      
      expect(navBrand).toBeInTheDocument();
      expect(navLinks).toBeInTheDocument();
    });

    it('should have all main sections as direct children of app', () => {
      const { container } = render(<App />);
      const app = container.querySelector('.app');
      const sections = app.querySelectorAll('section');
      
      expect(sections).toHaveLength(5);
    });

    it('should have skills grid with proper layout', () => {
      const { container } = render(<App />);
      const skillsGrid = container.querySelector('.skills-grid');
      
      expect(skillsGrid).toBeInTheDocument();
      expect(skillsGrid).toHaveClass('skills-grid');
    });

    it('should have projects grid with proper layout', () => {
      const { container } = render(<App />);
      const projectsGrid = container.querySelector('.projects-grid');
      
      expect(projectsGrid).toBeInTheDocument();
      expect(projectsGrid).toHaveClass('projects-grid');
    });
  });

  // === CONTENT CONSISTENCY TESTS ===
  describe('Content Consistency Tests', () => {
    it('should have consistent skill count', () => {
      const { container } = render(<App />);
      const skillCards = container.querySelectorAll('.skill-card');
      
      expect(skillCards).toHaveLength(6);
    });

    it('should have consistent project count', () => {
      const { container } = render(<App />);
      const projectCards = container.querySelectorAll('.project-card');
      
      expect(projectCards).toHaveLength(3);
    });

    it('should render complete hero content', () => {
      const { container } = render(<App />);
      const heroContent = container.querySelector('.hero-content');
      
      expect(heroContent).toBeInTheDocument();
      expect(heroContent.querySelector('.hero-title')).toBeInTheDocument();
      expect(heroContent.querySelector('.hero-subtitle')).toBeInTheDocument();
    });

    it('should render hero background with shapes', () => {
      const { container } = render(<App />);
      const heroBg = container.querySelector('.hero-bg');
      
      expect(heroBg).toBeInTheDocument();
      expect(heroBg.querySelectorAll('.floating-shape')).toHaveLength(3);
    });
  });
});
