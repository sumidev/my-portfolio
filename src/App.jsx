import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import NetworkBackground from './NetworkBackground';
import promanageImg from './assets/promanage.png';
import { FaPhp, FaLaravel, FaReact, FaVuejs, FaJs, FaGitAlt, FaBootstrap, FaHtml5, FaWordpress, FaJira, FaServer, FaLink, FaCode, FaCloud, FaUsers, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin, FaGraduationCap, FaLaptopCode, FaCogs, FaEnvelope, FaPhoneAlt, FaPaperPlane, FaCheckCircle, FaBriefcase, FaArrowRight, FaWhatsapp, FaBuilding, FaChartLine } from 'react-icons/fa';
import { SiMysql, SiElasticsearch, SiVercel, SiPostman } from 'react-icons/si';

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bttVisible, setBttVisible] = useState(false);
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const [captchaVal1, setCaptchaVal1] = useState(Math.floor(Math.random() * 10) + 1);
  const [captchaVal2, setCaptchaVal2] = useState(Math.floor(Math.random() * 10) + 1);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setBttVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.eb-fill').forEach(bar => {
            bar.classList.add('animated');
          });
        }
      });
    }, { threshold: 0.12 });
    
    reveals.forEach(el => observer.observe(el));
    const aboutVis = document.querySelector('.about-visual');
    if (aboutVis) observer.observe(aboutVis);

    return () => {

      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileNav = () => setMobileNavOpen(false);

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  const submitForm = async () => {
    if (isSubmitting) return;

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const type = document.getElementById('ftype').value;
    const message = document.getElementById('fmessage').value.trim();
    const botcheck = document.getElementById('botcheck').checked;
    const captchaAns = document.getElementById('captcha').value.trim();

    if (botcheck) {
      return; // honeypot caught a bot
    }

    if (!fname || !email || !message) {
      setSubmitMessage({ text: 'Please fill in all required fields.', type: 'error' });
      setTimeout(() => setSubmitMessage({ text: '', type: '' }), 4000);
      return;
    }

    if (parseInt(captchaAns) !== (captchaVal1 + captchaVal2)) {
      setSubmitMessage({ text: 'Incorrect human verification answer.', type: 'error' });
      setTimeout(() => setSubmitMessage({ text: '', type: '' }), 4000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ text: '', type: '' });

    const payload = {
      access_key: "11bfe075-4307-4703-af1f-a92e633fdf05",
      name: `${fname} ${lname}`.trim(),
      email: email,
      subject: type ? `New Enquiry: ${type}` : "New Contact Form Submission",
      message: message
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        setSubmitMessage({ text: 'Message sent successfully! Thanks for reaching out.', type: 'success' });
        // Clear form
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('femail').value = '';
        document.getElementById('ftype').value = '';
        document.getElementById('fmessage').value = '';
        document.getElementById('captcha').value = '';
        // Reset captcha
        setCaptchaVal1(Math.floor(Math.random() * 10) + 1);
        setCaptchaVal2(Math.floor(Math.random() * 10) + 1);
        
        setTimeout(() => setSubmitMessage({ text: '', type: '' }), 6000);
      } else {
        setSubmitMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
        setTimeout(() => setSubmitMessage({ text: '', type: '' }), 4000);
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({ text: 'Network error. Please try again.', type: 'error' });
      setTimeout(() => setSubmitMessage({ text: '', type: '' }), 4000);
    }
    
    setIsSubmitting(false);
  };

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMobileNav();
  };



  return (
    <>
      <NetworkBackground />


      <a 
        href="#hero" 
        id="btt" 
        aria-label="Back to top" 
        className={bttVisible ? 'visible' : ''}
        onClick={(e) => smoothScroll(e, '#hero')}
      >
        <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>
      </a>

      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/916280040596" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

{/* Navigation */}
<nav id="navbar" className={scrolled ? 'scrolled' : ''}>
  <a href="#hero" className="nav-logo">S<span>.</span>Choudhary</a>
  <ul className="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#project">Project</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" className="nav-cta">
    <FaPaperPlane style={{ fontSize: '14px' }} />
    Hire Me
  </a>
  <div className="hamburger" id="hamburger" onClick={toggleMobileNav}>
    <span></span><span></span><span></span>
  </div>
</nav>

{/* Mobile Nav */}
<div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`} id="mobileNav">
  <a href="#about" onClick={() => {closeMobileNav()}}>About</a>
  <a href="#skills" onClick={() => {closeMobileNav()}}>Skills</a>
  <a href="#experience" onClick={() => {closeMobileNav()}}>Experience</a>
  <a href="#project" onClick={() => {closeMobileNav()}}>Project</a>
  <a href="#education" onClick={() => {closeMobileNav()}}>Education</a>
  <a href="#contact" onClick={() => {closeMobileNav()}}>Contact</a>
</div>

{/* ─── HERO ─── */}
<section id="hero">
  <div className="hero-bg-grid"></div>
  <div className="hero-blob blob-1"></div>
  <div className="hero-blob blob-2"></div>

  <div className="hero-content">
    <div className="hero-badge">Available for Opportunities</div>
    <h1 className="hero-name">Sumit<br /><span className="accent-word">Choudhary</span></h1>
    <p className="hero-title"><strong>Full Stack Developer</strong> · 5 Years of Experience</p>
    <p className="hero-summary">Building scalable web applications with PHP (Laravel), Vue.js & React.js. Passionate about clean code, secure APIs, and shipping products that make an impact.</p>
    <div className="hero-actions">
      <a href="#project" className="btn-primary">
        <FaBriefcase style={{ fontSize: '16px' }} />
        View My Work
      </a>
      <a href="#contact" className="btn-secondary">
        <FaEnvelope style={{ fontSize: '16px' }} />
        Let's Talk
      </a>
      <a href="https://wa.me/916280040596" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ borderColor: '#25D366', color: '#25D366' }}>
        <FaWhatsapp style={{ fontSize: '16px' }} />
        WhatsApp Me
      </a>
    </div>
    <div className="hero-stats">
      <div className="stat-item">
        <div className="stat-num">5+</div>
        <div className="stat-label">Years Experience</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">3</div>
        <div className="stat-label">Companies</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">MCA</div>
        <div className="stat-label">Postgraduate</div>
      </div>
    </div>
  </div>

  <div className="hero-visual">
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="close"></span>
          <span className="minimize"></span>
          <span className="maximize"></span>
        </div>
        <div className="terminal-title">sumit@ubuntu: ~</div>
      </div>
      <div className="terminal-body">
        <div className="command-line">
          <span className="prompt">sumit@ubuntu:~$</span> <span className="command">cat profile.json</span>
        </div>
        <div className="command-output">
          <pre>
{`{`}
  <span className="json-key">"name"</span>: <span className="json-str">"Sumit Choudhary"</span>,
  <span className="json-key">"role"</span>: <span className="json-str">"Full Stack Developer"</span>,
  <span className="json-key">"experience"</span>: <span className="json-str">"5+ Years"</span>,
  <span className="json-key">"core_stack"</span>: [<span className="json-str">"PHP/Laravel"</span>, <span className="json-str">"React.js"</span>, <span className="json-str">"Vue.js"</span>],
  <span className="json-key">"databases"</span>: [<span className="json-str">"MySQL"</span>, <span className="json-str">"Elasticsearch"</span>, <span className="json-str">"Redis"</span>],
  <span className="json-key">"infrastructure"</span>: [<span className="json-str">"AWS"</span>, <span className="json-str">"Docker"</span>, <span className="json-str">"CI/CD"</span>],
  <span className="json-key">"interests"</span>: [<span className="json-str">"System Design"</span>, <span className="json-str">"Performance"</span>, <span className="json-str">"Open Source"</span>],
  <span className="json-key">"status"</span>: <span className="json-str">"Available for hire"</span>,
  <span className="json-key">"location"</span>: <span className="json-str">"India (Remote / Relocation)"</span>
{`}`}
          </pre>
        </div>
        <div className="command-line mt-2">
          <span className="prompt">sumit@ubuntu:~$</span> <span className="command">npm run check-status</span>
        </div>
        <div className="command-output">
          <pre style={{color: '#A6E3A1'}}>
✓ checking availability...
✓ All systems operational
✓ Ready for new projects!
          </pre>
        </div>
        <div className="command-line mt-2">
          <span className="prompt">sumit@ubuntu:~$</span> <span className="cursor blink"></span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ─── ABOUT ─── */}
<section id="about">
  <div className="about-grid">
    <div className="about-text reveal">
      <div className="section-label">About Me</div>
      <h2 className="section-title">Crafting Reliable Software, End to End</h2>
      <div className="section-divider"></div>
      <p>I'm a Full Stack Developer with <strong>5 years of hands-on experience</strong> building and deploying production-grade web applications across the full stack. From designing secure REST APIs to crafting responsive frontends, I've worked across diverse domains including immigration tech, fintech, and HR systems.</p>
      <p>My core stack is <strong>PHP/Laravel on the backend</strong> and <strong>Vue.js/React.js on the frontend</strong>, building decoupled architectures that are scalable and maintainable. I thrive in Agile teams, value code reviews, and care deeply about writing clean, testable code.</p>
      <p>Whether it's optimizing database queries for high-traffic APIs, integrating Elasticsearch for smarter search, or deploying containerized apps on the cloud — I bring a full-picture perspective to every project.</p>
      <div className="about-highlights reveal reveal-delay-2">
        <div className="highlight-item">
          <div className="hi-icon"><FaServer style={{fontSize:'18px'}} /></div>
          <h4>Backend Expert</h4>
          <p>PHP, Laravel, REST APIs, MySQL, Elasticsearch</p>
        </div>
        <div className="highlight-item">
          <div className="hi-icon"><FaCode style={{fontSize:'18px'}} /></div>
          <h4>Frontend Skilled</h4>
          <p>React.js, Vue.js, JavaScript ES6+, Bootstrap</p>
        </div>
        <div className="highlight-item">
          <div className="hi-icon"><FaCloud style={{fontSize:'18px'}} /></div>
          <h4>Cloud Ready</h4>
          <p>Vercel, Railway, Git, Postman, Bitbucket</p>
        </div>
        <div className="highlight-item">
          <div className="hi-icon"><FaUsers style={{fontSize:'18px'}} /></div>
          <h4>Agile Team Player</h4>
          <p>Scrum, Jira, Sprint Planning, Code Reviews</p>
        </div>
      </div>
    </div>

    <div className="about-visual reveal reveal-delay-2">
      <div className="av-card">
        <div className="av-title">Proficiency Overview</div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">Laravel / PHP</span><span className="eb-pct">92%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '92%'}}></div></div>
        </div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">Vue.js</span><span className="eb-pct">88%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '88%'}}></div></div>
        </div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">React.js</span><span className="eb-pct">82%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '82%'}}></div></div>
        </div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">MySQL / Database</span><span className="eb-pct">85%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '85%'}}></div></div>
        </div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">RESTful APIs</span><span className="eb-pct">90%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '90%'}}></div></div>
        </div>
        <div className="exp-bar">
          <div className="eb-header"><span className="eb-label">Elasticsearch</span><span className="eb-pct">72%</span></div>
          <div className="eb-track"><div className="eb-fill" style={{'--target-width': '72%'}}></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ─── SKILLS ─── */}
<section id="skills">
  <div className="reveal">
    <div className="section-label">Tech Stack</div>
    <h2 className="section-title">Skills & Technologies</h2>
    <p className="section-sub">A curated toolkit built through 5 years of production experience across full-stack development.</p>
  </div>

  <div className="skills-layout">
    <div className="skill-categories">
      <div className="skill-cat reveal reveal-delay-1">
        <div className="sc-header">
          <div className="sc-icon" style={{"background":"#EBF0FF", "color": "#1A56DB"}}>
            <FaServer />
          </div>
          <span className="sc-title">Backend Development</span>
        </div>
        <div className="sc-tags">
          <span className="skill-pill">PHP</span>
          <span className="skill-pill">Laravel</span>
          <span className="skill-pill">RESTful APIs</span>
          <span className="skill-pill">Elasticsearch</span>
          <span className="skill-pill">MySQL</span>
          <span className="skill-pill">Database Design</span>
        </div>
      </div>

      <div className="skill-cat reveal reveal-delay-2">
        <div className="sc-header">
          <div className="sc-icon" style={{"background":"#F0FDF4", "color": "#16A34A"}}>
            <FaCode />
          </div>
          <span className="sc-title">Frontend Development</span>
        </div>
        <div className="sc-tags">
          <span className="skill-pill">React.js</span>
          <span className="skill-pill">Vue.js</span>
          <span className="skill-pill">JavaScript ES6+</span>
          <span className="skill-pill">HTML5</span>
          <span className="skill-pill">CSS3</span>
          <span className="skill-pill">Bootstrap</span>
          <span className="skill-pill">jQuery</span>
        </div>
      </div>

      <div className="skill-cat reveal reveal-delay-3">
        <div className="sc-header">
          <div className="sc-icon" style={{"background":"#FFF7ED", "color": "#EA580C"}}>
            <FaCloud />
          </div>
          <span className="sc-title">Tools & Deployment</span>
        </div>
        <div className="sc-tags">
          <span className="skill-pill">Git</span>
          <span className="skill-pill">Bitbucket</span>
          <span className="skill-pill">Vercel</span>
          <span className="skill-pill">Railway</span>
          <span className="skill-pill">Postman</span>
          <span className="skill-pill">WordPress (ACF)</span>
        </div>
      </div>

      <div className="skill-cat reveal reveal-delay-4">
        <div className="sc-header">
          <div className="sc-icon" style={{"background":"#FFF1F2", "color": "#E11D48"}}>
            <FaUsers />
          </div>
          <span className="sc-title">Methodologies</span>
        </div>
        <div className="sc-tags">
          <span className="skill-pill">Agile / Scrum</span>
          <span className="skill-pill">Jira</span>
          <span className="skill-pill">Sprint Planning</span>
          <span className="skill-pill">Code Reviews</span>
        </div>
      </div>
    </div>

    <div className="tech-showcase reveal reveal-delay-2">
      <div className="ts-title">Technology Icons</div>
      <div className="tech-grid">
        <div className="tech-card"><span className="tc-icon" style={{color: '#777BB4'}}><FaPhp /></span><span className="tc-name">PHP</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#FF2D20'}}><FaLaravel /></span><span className="tc-name">Laravel</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#61DAFB'}}><FaReact /></span><span className="tc-name">React.js</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#4FC08D'}}><FaVuejs /></span><span className="tc-name">Vue.js</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#F7DF1E'}}><FaJs /></span><span className="tc-name">JavaScript</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#4479A1'}}><SiMysql /></span><span className="tc-name">MySQL</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#005571'}}><SiElasticsearch /></span><span className="tc-name">Elasticsearch</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#F05032'}}><FaGitAlt /></span><span className="tc-name">Git</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#000000'}}><SiVercel /></span><span className="tc-name">Vercel</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#0B111A'}}><FaServer /></span><span className="tc-name">Railway</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#FF6C37'}}><SiPostman /></span><span className="tc-name">Postman</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#7952B3'}}><FaBootstrap /></span><span className="tc-name">Bootstrap</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#E34F26'}}><FaHtml5 /></span><span className="tc-name">HTML5 / CSS3</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#0052CC'}}><FaJira /></span><span className="tc-name">Jira</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#21759B'}}><FaWordpress /></span><span className="tc-name">WordPress</span></div>
        <div className="tech-card"><span className="tc-icon" style={{color: '#1A56DB'}}><FaLink /></span><span className="tc-name">REST APIs</span></div>
      </div>
    </div>
  </div>
</section>

{/* ─── EXPERIENCE ─── */}
<section id="experience">
  <div className="exp-layout">
    <div className="exp-sidebar reveal">
      <div className="section-label">Career</div>
      <h2 className="section-title">Work Experience</h2>
      <div className="section-divider"></div>
      <p style={{"fontSize":".9rem","color":"var(--ink-3)","lineHeight":"1.8"}}>5 years across global MNCs and product companies, building backend systems, APIs, and frontend interfaces at scale.</p>
    </div>

    <div className="timeline">
      {/* Adventus */}
      <div className="timeline-item reveal reveal-delay-1">
        <div className="tl-dot"></div>
        <div className="tl-card">
          <div className="tl-header">
            <div>
              <div className="tl-company">Adventus.io · Global Immigration MNC</div>
              <div className="tl-role">Software Engineer</div>
              <div className="tl-location">
                <FaMapMarkerAlt />
                Remote / Hybrid
              </div>
            </div>
            <span className="tl-date">Mar 2025 – Present</span>
          </div>
          <ul className="tl-desc">
            <li><span><strong>Backend Development:</strong> Maintained and optimized core backoffice inventory systems and recruiter portals using Laravel.</span></li>
            <li><span><strong>Search Integration:</strong> Leveraged Elasticsearch to improve search functionality and data retrieval speeds across the platform.</span></li>
            <li><span><strong>Frontend Integration:</strong> Built and updated dynamic interfaces using Vue.js, seamlessly connected to PHP backend services.</span></li>
            <li><span><strong>Agile Workflow:</strong> Daily standups, sprint planning, and code reviews within an Agile/Scrum framework.</span></li>
          </ul>
        </div>
      </div>

      {/* Virtual Oplossing */}
      <div className="timeline-item reveal reveal-delay-2">
        <div className="tl-dot"></div>
        <div className="tl-card">
          <div className="tl-header">
            <div>
              <div className="tl-company">Virtual Oplossing Pvt. Ltd</div>
              <div className="tl-role">PHP Developer</div>
              <div className="tl-location">
                <FaMapMarkerAlt />
                Mohali, India
              </div>
            </div>
            <span className="tl-date">Oct 2021 – Feb 2025</span>
          </div>
          <ul className="tl-desc">
            <li><span><strong>Upstox.com Development:</strong> Built and maintained the real-time stock listing and market watch pages, including robust RESTful APIs using Laravel for high-performance data rendering.</span></li>
            <li><span><strong>Enterprise Systems:</strong> Developed features for internal HRM and CRM tools supporting tracking and sales operations.</span></li>
            <li><span><strong>Database Management:</strong> Designed and optimized MySQL queries for high-traffic, data-intensive features.</span></li>
          </ul>
        </div>
      </div>

      {/* IT Boulevard */}
      <div className="timeline-item reveal reveal-delay-3">
        <div className="tl-dot"></div>
        <div className="tl-card">
          <div className="tl-header">
            <div>
              <div className="tl-company">IT Boulevard</div>
              <div className="tl-role">PHP Developer</div>
              <div className="tl-location">
                <FaMapMarkerAlt />
                Mohali, India
              </div>
            </div>
            <span className="tl-date">Oct 2020 – Oct 2021</span>
          </div>
          <ul className="tl-desc">
            <li><span><strong>Custom CMS Solutions:</strong> Built customized WordPress websites using PHP and ACF based on specific client requirements.</span></li>
            <li><span><strong>UI/UX Implementation:</strong> Translated designs into responsive frontends using HTML, CSS3, JavaScript, and Bootstrap.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ─── PROJECT ─── */}
<section id="project">
  <div className="reveal" style={{"marginBottom":"3rem"}}>
    <div className="section-label">Portfolio</div>
    <h2 className="section-title">Featured Projects</h2>
    <p className="section-sub">A showcase of full-stack applications, enterprise tools, and platforms I've built.</p>
  </div>

  <div className="project-card reveal">
    <div className="project-info">
      <div className="proj-label">
        <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Full Stack Personal Project
      </div>
      <h3 className="proj-name">ProManage</h3>
      <p className="proj-desc">A complete headless project management application built with a decoupled React + Laravel architecture. Manages modern workflow tasks with a secure API, stateful auth, and cloud deployment on Vercel + Railway.</p>
      <div className="proj-stack">
        <span className="stack-tag">React.js</span>
        <span className="stack-tag">Laravel API</span>
        <span className="stack-tag">MySQL</span>
        <span className="stack-tag">Vercel</span>
        <span className="stack-tag">Railway</span>
        <span className="stack-tag">REST APIs</span>
        <span className="stack-tag">CORS</span>
      </div>
      <ul className="proj-features" style={{"listStyle":"none"}}>
        <li><span className="feat-icon"><FaCheckCircle style={{color: 'var(--accent)'}} /></span><span><strong>Decoupled Architecture:</strong> Headless React SPA consuming a dedicated Laravel API backend</span></li>
        <li><span className="feat-icon"><FaCheckCircle style={{color: 'var(--accent)'}} /></span><span><strong>Secure Auth:</strong> Stateful authentication with proper CORS management and session handling</span></li>
        <li><span className="feat-icon"><FaCheckCircle style={{color: 'var(--accent)'}} /></span><span><strong>Cloud Deployed:</strong> React SPA on Vercel · Containerized API + DB on Railway</span></li>
      </ul>
      <div className="proj-creds">
        <strong>Demo Login:</strong> admin@example.com &nbsp;/&nbsp; password
      </div>
      <div className="proj-actions">
        <a href="https://promanage.sumitchoudhary.dev/" target="_blank" className="btn-primary">
          <FaExternalLinkAlt style={{ fontSize: '15px' }} />
          View Live Demo
        </a>
        <a href="https://www.linkedin.com/in/sumit-choudhary-142358192/" target="_blank" className="btn-secondary">
          <FaLinkedin style={{ fontSize: '15px' }} />
          LinkedIn
        </a>
      </div>
    </div>

    <div className="project-visual">
      {/* Browser Mockup */}
      <div className="pv-mockup">
        <div className="pv-bar">
          <div className="pv-dot red"></div>
          <div className="pv-dot yellow"></div>
          <div className="pv-dot green"></div>
          <div className="pv-url">promanage.sumitchoudhary.dev</div>
        </div>
        <div className="pv-content" style={{ padding: 0 }}>
          <img src={promanageImg} alt="ProManage Dashboard" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
      {/* Floating badges */}
      <div className="pv-float pv-float-1" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><FaReact style={{color: '#61DAFB', fontSize: '1.2rem'}} /> React SPA</div>
      <div className="pv-float pv-float-2" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><FaLaravel style={{color: '#FF2D20', fontSize: '1.2rem'}} /> Laravel API</div>
    </div>
  </div>

  {/* Other Projects */}
  <div className="other-projects reveal">
    {/* Adventus Portals */}
    <div className="op-card">
      <div className="op-icon" style={{background: '#F0FDF4', color: '#16A34A'}}>
        <FaBuilding />
      </div>
      <h3 className="op-title">Adventus Portals & Inventory</h3>
      <p className="op-desc">A suite of platforms for global immigration and recruitment, featuring recruiter/backoffice portals and an inventory module.</p>
      <div className="op-stack">
        <span className="stack-tag">Laravel</span>
        <span className="stack-tag">Vue.js</span>
        <span className="stack-tag">Elasticsearch</span>
      </div>
    </div>

    {/* HRM & CMT Tools */}
    <div className="op-card">
      <div className="op-icon" style={{background: '#FFF7ED', color: '#EA580C'}}>
        <FaCogs />
      </div>
      <h3 className="op-title">HRM & Logistics Systems</h3>
      <p className="op-desc">Internal enterprise tools streamlining HR attendance operations and managing truck/agent logistics with real-time notifications.</p>
      <div className="op-stack">
        <span className="stack-tag">PHP</span>
        <span className="stack-tag">Laravel</span>
        <span className="stack-tag">JavaScript</span>
      </div>
    </div>

    {/* Upstox Listing Page */}
    <div className="op-card">
      <div className="op-icon" style={{background: '#E0F2FE', color: '#0284C7'}}>
        <FaChartLine />
      </div>
      <h3 className="op-title">Upstox Stock Listing</h3>
      <p className="op-desc">Developed the stock listing and market watch pages for Upstox.com, focusing on high-performance data rendering and dynamic UI updates.</p>
      <div className="op-stack">
        <span className="stack-tag">WordPress</span>
        <span className="stack-tag">ACF</span>
        <span className="stack-tag">PHP</span>
        <span className="stack-tag">JavaScript</span>
      </div>
    </div>
  </div>
</section>

{/* ─── EDUCATION ─── */}
<section id="education">
  <div className="reveal">
    <div className="section-label">Qualifications</div>
    <h2 className="section-title">Education</h2>
    <p className="section-sub">A strong academic foundation combining computer science with engineering principles.</p>
  </div>
  <div className="edu-grid">
    <div className="edu-card reveal reveal-delay-1">
      <div className="edu-icon"><FaGraduationCap style={{color: "var(--accent)"}} /></div>
      <div className="edu-degree">Master of Computer Applications (MCA)</div>
      <div className="edu-school">Lovely Professional University</div>
      <div className="edu-period">2021 – 2024</div>
    </div>
    <div className="edu-card reveal reveal-delay-2">
      <div className="edu-icon"><FaLaptopCode style={{color: "var(--accent)"}} /></div>
      <div className="edu-degree">Bachelor of Computer Applications (BCA)</div>
      <div className="edu-school">DAV College Sector 10, Chandigarh</div>
      <div className="edu-period">2016 – 2019</div>
    </div>
    <div className="edu-card reveal reveal-delay-3">
      <div className="edu-icon"><FaCogs style={{color: "var(--accent)"}} /></div>
      <div className="edu-degree">Diploma in Production & Industrial Engineering</div>
      <div className="edu-school">CCET, Chandigarh</div>
      <div className="edu-period">2012 – 2015</div>
    </div>
  </div>
</section>

{/* ─── CONTACT ─── */}
<section id="contact">
  <div className="contact-layout">
    <div className="contact-info reveal">
      <div className="section-label">Get In Touch</div>
      <h2 className="section-title">Let's Build Something Great</h2>
      <div className="section-divider"></div>
      <p style={{"fontSize":".95rem","color":"var(--ink-2)","lineHeight":"1.85","marginBottom":"1.5rem"}}>Whether you're a recruiter, a company hiring for full-stack roles, or a client needing a reliable developer — I'd love to hear from you. I'm currently open to new opportunities.</p>
      <p style={{"fontSize":".875rem","color":"var(--ink-3)","lineHeight":"1.7"}}>Based in India · Available for Remote &amp; Hybrid roles · Open to Relocation for the right opportunity.</p>

      <div className="contact-links">
        <a href="mailto:sk.chd03@gmail.com" className="contact-link">
          <div className="cl-icon"><FaEnvelope /></div>
          <div className="cl-text">
            <div className="cl-label">Email</div>
            <div className="cl-value">sk.chd03@gmail.com</div>
          </div>
        </a>
        <a href="tel:+916280040596" className="contact-link">
          <div className="cl-icon"><FaPhoneAlt /></div>
          <div className="cl-text">
            <div className="cl-label">Mobile</div>
            <div className="cl-value">+91 6280040596</div>
          </div>
        </a>
        <a href="https://wa.me/916280040596" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ borderColor: 'rgba(37,211,102,0.3)' }}>
          <div className="cl-icon" style={{ color: '#25D366', background: 'rgba(37,211,102,0.1)' }}><FaWhatsapp /></div>
          <div className="cl-text">
            <div className="cl-label" style={{ color: '#25D366' }}>WhatsApp</div>
            <div className="cl-value">Chat with me</div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/sumit-choudhary-142358192/" target="_blank" className="contact-link">
          <div className="cl-icon"><FaLinkedin /></div>
          <div className="cl-text">
            <div className="cl-label">LinkedIn</div>
            <div className="cl-value">linkedin.com/in/sumit-choudhary-142358192</div>
          </div>
        </a>
      </div>
    </div>

    <div className="contact-form reveal reveal-delay-2">
      <div className="cf-title">Send a Message</div>
      <p className="cf-sub">Fill out the form and I'll get back to you within 24 hours.</p>

      {submitMessage.text && (
        <div className={`form-alert ${submitMessage.type}`}>
          {submitMessage.type === 'success' ? <FaCheckCircle style={{ fontSize: '1.2rem' }} /> : null}
          {submitMessage.text}
        </div>
      )}

      <div id="contactForm">
        <input type="checkbox" name="botcheck" id="botcheck" style={{ display: 'none' }} />
        
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input type="text" id="fname" placeholder="John" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" id="lname" placeholder="Doe" />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" id="femail" placeholder="john@company.com" />
        </div>
        <div className="form-group">
          <label>Enquiry Type</label>
          <select id="ftype">
            <option value="">Select an option…</option>
            <option>Job Opportunity</option>
            <option>Freelance Project</option>
            <option>Collaboration</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message *</label>
          <textarea id="fmessage" placeholder="Tell me about your project or opportunity…"></textarea>
        </div>
        
        <div className="form-group captcha-group">
          <label>Human Verification *</label>
          <div className="captcha-wrap">
            <span className="captcha-q">What is {captchaVal1} + {captchaVal2}?</span>
            <input type="number" id="captcha" placeholder="Answer" />
          </div>
        </div>

        <button className="submit-btn" onClick={() => {submitForm()}} disabled={isSubmitting}>
          {isSubmitting ? (
             <span className="spinner"></span>
          ) : (
            <>
              <FaPaperPlane style={{ fontSize: '16px' }} />
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
  </div>
</section>

{/* ─── FOOTER ─── */}
<footer>
  <a href="#hero" className="footer-logo">S<span>.</span>Choudhary</a>
  <span className="footer-copy">© 2025 Sumit Choudhary. All rights reserved.</span>
  <div className="footer-links">
    <a href="mailto:sk.chd03@gmail.com">Email</a>
    <a href="https://www.linkedin.com/in/sumit-choudhary-142358192/" target="_blank">LinkedIn</a>
    <a href="https://promanage.sumitchoudhary.dev/" target="_blank">Live Project</a>
  </div>
</footer>


    </>
  );
}

export default App;
