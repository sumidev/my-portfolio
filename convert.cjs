const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../sumit-portfolio.backup.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  fs.writeFileSync(path.join(__dirname, 'src/index.css'), cssMatch[1].trim());
}

const bodyMatch = content.match(/<body>([\s\S]*?)<script>/);
if (bodyMatch) {
  let bodyContent = bodyMatch[1];
  
  // Convert HTML to JSX
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/onclick="([^"]+)"/g, 'onClick={() => {$1}}');
  bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
  bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
  bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
  bodyContent = bodyContent.replace(/<br>/g, '<br />');
  bodyContent = bodyContent.replace(/<input(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
  });
  bodyContent = bodyContent.replace(/style="--target-width:([^"]+)"/g, "style={{'--target-width': '$1'}}");
  bodyContent = bodyContent.replace(/style="([^"]+)"/g, (match, p1) => {
    if (p1.includes('--target-width')) return match;
    // VERY simple style to object conversion for this specific file
    // "background:#EBF0FF" -> style={{ background: '#EBF0FF' }}
    const rules = p1.split(';').filter(r => r.trim());
    const styleObj = {};
    rules.forEach(rule => {
      let [key, val] = rule.split(':');
      if (key && val) {
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = val.trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Also we need to wrap the body in a React component
  const jsxContent = `import React, { useEffect, useState, useRef } from 'react';
import './index.css';

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorGrow, setCursorGrow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bttVisible, setBttVisible] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, submitted, error

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);

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
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileNav = () => setMobileNavOpen(false);

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  const submitForm = () => {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!fname || !email || !message) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 2500);
      return;
    }
    setFormState('submitted');
  };

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMobileNav();
  };

  const handleMouseEnter = () => setCursorGrow(true);
  const handleMouseLeave = () => setCursorGrow(false);

  return (
    <>
      <div 
        id="cursor" 
        className={cursorGrow ? 'grow' : ''} 
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>

      <a 
        href="#hero" 
        id="btt" 
        aria-label="Back to top" 
        className={bttVisible ? 'visible' : ''}
        onClick={(e) => smoothScroll(e, '#hero')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>
      </a>
      
      ${bodyContent}
    </>
  );
}

export default App;
`;
  fs.writeFileSync(path.join(__dirname, 'src/App.jsx'), jsxContent);
}

console.log('Conversion done.');
