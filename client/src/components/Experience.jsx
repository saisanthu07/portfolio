import { useFadeIn } from '../hooks/useFadeIn'

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Debe Learning',
    type: 'Remote',
    duration: 'Aug 2026 – Oct 2026',
    status: 'Completed',
    accent: '#0a84ff',
    badge: 'Internship',
    logoText: 'DL',
    summary:
      'Engineered core features for live WebRTC video classrooms, automated cron workflows, third-party meeting APIs, and role-based access control across Next.js 14 and Firebase.',
    bullets: [
      'Built a custom WebRTC live video classroom and automated demo class recording tracking in Next.js 14 and Firebase.',
      'Automated multi-channel teacher class reminders via WhatsApp Cloud API and Firebase Cloud Functions v2 cron tasks.',
      'Integrated Google Meet, Calendar, and Zoom S2S OAuth APIs for automated meeting provisioning and Drive cloud recording sync.',
      'Optimized Firestore database queries and caching on high-frequency admin monthly report dashboards.',
      'Enforced Role-Based Access Control (RBAC) using Firebase custom claims and Google OAuth for admins, teachers, and students.',
    ],
    stack: [
      'Next.js 14',
      'Firebase',
      'WebRTC',
      'Firebase Cloud Functions v2',
      'WhatsApp Cloud API',
      'Google Meet API',
      'Google Calendar API',
      'Zoom S2S OAuth',
      'Firestore',
      'RBAC',
    ],
  },
]

export default function Experience() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <p className="section-label">Work Experience</p>
        <h2 className="section-title">Where I've Contributed</h2>

        <div className={`experience-list fade-in${visible ? ' visible' : ''}`}>
          {experiences.map((exp, idx) => (
            <article
              key={`${exp.company}-${idx}`}
              className="experience-card"
              style={{ '--exp-accent': exp.accent }}
              onMouseMove={e => {
                const el = e.currentTarget
                const rect = el.getBoundingClientRect()
                el.style.setProperty('--x', `${e.clientX - rect.left}px`)
                el.style.setProperty('--y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="experience-card-header">
                <div className="experience-company-group">
                  <div className="experience-logo-avatar" aria-hidden="true">
                    {exp.logoText}
                  </div>
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="experience-company-row">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-dot" aria-hidden="true">·</span>
                      <span className="experience-type">{exp.type}</span>
                    </div>
                  </div>
                </div>

                <div className="experience-meta">
                  <span className="experience-badge">{exp.badge}</span>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
              </div>

              <p className="experience-summary">{exp.summary}</p>

              <ul className="experience-bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>

              <div className="experience-stack">
                {exp.stack.map(tech => (
                  <span key={tech} className="experience-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
