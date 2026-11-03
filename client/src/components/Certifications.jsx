import { useFadeIn } from '../hooks/useFadeIn'

const certs = [
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'Feb 2026',
    url: 'https://www.credly.com/badges/7dc7c354-2d70-4778-888c-163e21af178c/public_url',
    badge: '☁️',
    accent: '#ff9f43',
    status: 'Credly Verified ✓',
    desc: 'Core AWS cloud architecture, compute (EC2, Lambda), security (IAM), networking (VPC), storage (S3), and pricing models.',
    tags: ['AWS Cloud', 'EC2 & S3', 'Lambda', 'IAM'],
  },
  {
    title: 'Computer Networks and Internet Protocol',
    issuer: 'NPTEL / IIT Kharagpur',
    date: '2025',
    url: null,
    badge: '🌐',
    accent: '#00d4ff',
    status: 'IIT Kharagpur',
    desc: 'Comprehensive coursework on TCP/IP protocol suite, socket programming, routing algorithms, flow & congestion control, and network security.',
    tags: ['TCP/IP', 'Socket Programming', 'Routing'],
  },
  {
    title: 'CRUD Operations in MongoDB',
    issuer: 'MongoDB',
    date: 'June 2026',
    url: 'https://www.credly.com/badges/a427cb18-e63d-4a84-a994-0cf0945a8bea/public_url',
    badge: '🍃',
    accent: '#00ed64',
    status: 'Credly Verified ✓',
    desc: 'Hands-on MongoDB document modeling, indexing fundamentals, aggregation pipeline, and query optimization for real-world apps.',
    tags: ['MongoDB Atlas', 'Indexing', 'Aggregations'],
  },
  {
    title: 'AWS Deploying Serverless Applications',
    issuer: 'AWS Training & Certification',
    date: 'Dec 2025',
    url: null,
    badge: '⚡',
    accent: '#a855f7',
    status: 'AWS Verified',
    desc: 'Architecting modern event-driven serverless backends using AWS Lambda, API Gateway, DynamoDB, and cloud deployment patterns.',
    tags: ['AWS Lambda', 'API Gateway', 'Serverless'],
  },
  {
    title: 'AWS Solutions Architecture',
    issuer: 'Forage Virtual Experience',
    date: '2025',
    url: null,
    badge: '🏗️',
    accent: '#38bdf8',
    status: 'Simulation',
    desc: 'Designing scalable, cost-efficient, and highly available distributed systems on enterprise AWS cloud infrastructure.',
    tags: ['Architecture', 'High Availability', 'Scalability'],
  },
  {
    title: 'Git - Skill Up',
    issuer: 'GeeksforGeeks / Nation SkillUp',
    date: '2026',
    url: null,
    badge: '🌿',
    accent: '#f43f5e',
    status: 'Skill Certified',
    desc: 'Mastery in Git version control workflows, branching and merging strategies, rebase operations, and team collaboration.',
    tags: ['Git Workflows', 'Version Control', 'GitHub'],
  },
]

const community = [
  {
    title: 'AWS Community Day',
    type: 'Conference & Summit',
    year: '2025 & 2026',
    icon: '☁️',
    accent: '#ff9f43',
    desc: 'Attendee in 2025 & 2026. Attended deep dives on Serverless Architectures (Lambda, API Gateway), Cloud Security best practices, and AI/ML model deployments on AWS.',
    tags: ['Serverless Architecture', 'Cloud Security & IAM', 'Amazon SageMaker'],
  },
  {
    title: 'Adobe University Hackathon',
    type: 'National Hackathon',
    year: '2026',
    icon: '🏆',
    accent: '#ff3366',
    desc: 'Participated in the Adobe University Hackathon 2026, engineering rapid full-stack software solutions and AI integrations under tight collaboration deadlines.',
    tags: ['AI Integrations', 'Rapid Prototyping', 'Agile Collaboration'],
  },
  {
    title: 'Multi-Cloud Workshop',
    type: 'Technical Workshop',
    year: 'Dec 2025',
    icon: '🛠️',
    accent: '#06b6d4',
    desc: 'Participated in a focused hands-on workshop on multi-cloud integration, containerized deployment strategies, and multi-provider infrastructure management.',
    tags: ['Multi-Cloud Resiliency', 'DevOps & CI/CD', 'Cloud Infrastructure'],
  },
]

export default function Certifications() {
  const [ref, visible] = useFadeIn()

  const handleCardMouseMove = e => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section id="certifications" ref={ref}>
      <div className="container">
        {/* CERTIFICATIONS */}
        <div className="section-head-group">
          <p className="section-label">Verified Credentials</p>
          <h2 className="section-title">Certifications & Badges</h2>
        </div>

        <div className={`certs-grid fade-in${visible ? ' visible' : ''}`}>
          {certs.map((c, i) => (
            <div
              className={`cert-card fade-in delay-${Math.min(i + 1, 4)}${visible ? ' visible' : ''}`}
              key={c.title}
              style={{ '--cert-accent': c.accent }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="cert-card-spotlight" aria-hidden="true" />
              <div className="cert-card-shine" aria-hidden="true" />

              <div className="cert-card-header">
                <div
                  className="cert-badge-icon"
                  style={{
                    color: c.accent,
                    background: `color-mix(in srgb, ${c.accent} 14%, transparent)`,
                    borderColor: `color-mix(in srgb, ${c.accent} 35%, transparent)`,
                  }}
                >
                  {c.badge}
                </div>

                <div className="cert-header-meta">
                  <span
                    className="cert-status-pill"
                    style={{
                      color: c.accent,
                      background: `color-mix(in srgb, ${c.accent} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${c.accent} 25%, transparent)`,
                    }}
                  >
                    {c.status}
                  </span>
                  <span className="cert-date">{c.date}</span>
                </div>
              </div>

              <div className="cert-card-content">
                <div className="cert-issuer-text">{c.issuer}</div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-desc">{c.desc}</p>
              </div>

              {c.tags && (
                <div className="cert-tags">
                  {c.tags.map(t => (
                    <span key={t} className="cert-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="cert-card-footer">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn-action"
                    id={`cert-badge-${i}`}
                  >
                    <span>View Credential</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : (
                  <span className="cert-verified-label">
                    <span className="cert-verified-dot" style={{ background: c.accent }} />
                    Completed & Validated
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* COMMUNITY & HACKATHONS */}
        <div className="section-head-group" style={{ marginTop: 88 }}>
          <p className="section-label">Hackathons & Summits</p>
          <h2 className="section-title">Community & Events</h2>
        </div>

        <div className={`community-grid fade-in delay-2${visible ? ' visible' : ''}`}>
          {community.map((c, i) => (
            <div
              className="community-card"
              key={c.title}
              style={{ '--comm-accent': c.accent }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="community-card-spotlight" aria-hidden="true" />
              <div className="community-card-glow-bar" style={{ background: c.accent }} />

              <div className="community-card-header">
                <div
                  className="community-icon-box"
                  style={{
                    background: `color-mix(in srgb, ${c.accent} 15%, transparent)`,
                    borderColor: `color-mix(in srgb, ${c.accent} 35%, transparent)`,
                  }}
                >
                  <span className="comm-icon-text">{c.icon}</span>
                </div>

                <div className="community-meta">
                  <span
                    className="community-type-badge"
                    style={{
                      color: c.accent,
                      background: `color-mix(in srgb, ${c.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${c.accent} 28%, transparent)`,
                    }}
                  >
                    {c.type}
                  </span>
                  <span className="community-card-year">{c.year}</span>
                </div>
              </div>

              <div className="community-card-body">
                <h3 className="community-card-title">{c.title}</h3>
                <p className="community-card-desc">{c.desc}</p>
              </div>

              <div className="community-tags">
                {c.tags.map(tag => (
                  <span key={tag} className="community-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
