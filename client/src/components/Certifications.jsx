import { useFadeIn } from '../hooks/useFadeIn'

const certs = [
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'Feb 2026',
    url: 'https://www.credly.com',
  },
  {
    title: 'AWS Deploying Serverless Applications',
    issuer: 'AWS Training & Certification',
    date: 'Dec 2025',
    url: null,
  },
  {
    title: 'AWS Solutions Architecture',
    issuer: 'Forage Virtual Experience',
    date: '2025',
    url: null,
  },
  {
    title: 'Computer Networks and Internet Protocol',
    issuer: 'NPTEL / IIT Kharagpur',
    date: '2025',
    url: null,
  },
]

const community = [
  {
    title: 'AWS Community Day',
    year: '2025 & 2026',
    desc: 'Attended sessions on Serverless Architecture (Lambda, API Gateway), Amazon SageMaker for ML model deployment, and Cloud Security best practices — directly applied to Codesuu\'s AWS IAM configuration.',
  },
  {
    title: 'Multi-Cloud Workshop',
    year: 'Dec 2025',
    desc: 'Participated in a focused workshop on cloud integration, deployment strategies, and multi-platform infrastructure management across AWS and other cloud providers.',
  },
]

export default function Certifications() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="certifications" ref={ref}>
      <div className="container">
        <p className="section-label">Credentials</p>
        <h2 className="section-title">Certifications</h2>

        <div className={`certs-grid fade-in${visible ? ' visible' : ''}`}>
          {certs.map((c, i) => (
            <div className={`cert-card fade-in delay-${i + 1}${visible ? ' visible' : ''}`} key={c.title}>
              <div className="cert-issuer-badge">🏅 {c.issuer}</div>
              <div className="cert-title">{c.title}</div>
              <div className="cert-meta">Issued {c.date}</div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                >
                  View Badge
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="section-label" style={{ marginTop: 64 }}>Community</p>
        <div className={`community-grid fade-in delay-3${visible ? ' visible' : ''}`}>
          {community.map(c => (
            <div className="community-card" key={c.title}>
              <div className="community-card-title">
                {c.title}
                <span className="community-card-year">{c.year}</span>
              </div>
              <p className="community-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
