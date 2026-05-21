import { useFadeIn } from '../hooks/useFadeIn'

const stats = [
  { number: '1+', label: 'Production Apps' },
  { number: '5+', label: 'AWS Certifications' },
  { number: '4', label: 'Months — Codesuu' },
  { number: '10+', label: 'Concurrent Rooms' },
]

export default function About() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <p className="section-label">About Me</p>
        <div className="about-grid">
          <div className={`about-text fade-in${visible ? ' visible' : ''}`}>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Building things that<br />actually ship.
            </h2>
            <p>
              I'm a <strong>Computer Science (AI)</strong> student at Parul University,
              Vadodara, graduating May 2027. I specialize in the MERN stack and have
              hands-on cloud deployment experience with <strong>AWS EC2, S3, CloudFront,
              and Lambda</strong>.
            </p>
            <p>
              My approach is simple: I care about the <strong>full journey</strong> — from
              designing architecture to debugging production CORS errors at 2am. I've
              shipped <strong>Codesuu</strong>, a real-time collaborative coding platform.
            </p>
            <p>
              Currently seeking a <strong>full-stack or backend developer role</strong> where
              I can contribute to scalable systems and grow alongside a strong engineering team.
            </p>
          </div>

          <div className={`about-stats fade-in delay-2${visible ? ' visible' : ''}`}>
            {stats.map(s => (
              <div className="stat-card" key={s.label}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
