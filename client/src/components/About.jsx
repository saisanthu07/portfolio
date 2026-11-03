import { useFadeIn } from '../hooks/useFadeIn'

/**
 * About component renders the "About Me" section of the portfolio website.
 * It displays professional bio details, education info, experience with AWS and fullstack technologies,
 * and includes links to download the resume and view LinkedIn.
 *
 * @returns {React.JSX.Element} The rendered About section.
 */
export default function About() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <p className="section-label">About Me</p>
        <div className="about-grid">
          <div className={`about-text fade-in${visible ? ' visible' : ''}`}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>
              Full-Stack Developer & Software Engineer
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 24, fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-secondary, #888)' }}>
              Building things that actually ship.
            </p>
            <p>
              I'm a <strong>Computer Science (Artificial Intelligence)</strong> undergraduate at Parul University, Vadodara (2023 – 2027, <strong>7.46 CGPA</strong>). I specialize in building full-stack applications with <strong>React.js, Next.js, Node.js, Express.js, MongoDB, Firebase, and AWS</strong>.
            </p>
            <p>
              I have industry experience from my remote <strong>Software Developer internship at Debe Learning</strong>, where I developed a custom WebRTC live video classroom in Next.js 14 and Firebase, automated cron workflows with Firebase Cloud Functions v2 and WhatsApp Cloud API, and integrated Google Meet, Calendar, and Zoom S2S OAuth APIs.
            </p>
            <p>
              I take pride in architecting production platforms from scratch: from <strong>Codesuu</strong> (a collaborative coding platform featuring real-time multi-cursor editing and 24+ language code execution) to <strong>ShikshaBridge</strong> (an AI-powered learning gap analysis platform with NVIDIA NIM LLaMA 3.1) and <strong>Tasksuu</strong> (a multi-tenant SaaS project management system).
            </p>
            <p>
              Experienced in GitHub collaboration, Agile workflows, and CI/CD pipelines with GitHub Actions. Currently open to software engineering internships and full-time opportunities.
            </p>
            <div className="about-actions">
              <a href="/resume.pdf" download="Sai_Santhosh_Borra_Resume.pdf" className="btn-primary" id="about-resume-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Resume
              </a>
              <a href="https://linkedin.com/in/saisanthoshborra/" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="about-linkedin-btn">
                View LinkedIn
              </a>
            </div>
          </div>

          <div className={`about-image fade-in delay-2${visible ? ' visible' : ''}`}>
            <div className="about-profile-card">
              <div className="apc-inner">
                <img src="/profile_about.jpg" className="apc-img" alt="Borra Sai Santhosh" loading="lazy" />
                <div className="apc-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
