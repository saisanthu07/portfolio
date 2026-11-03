import { useFadeIn } from '../hooks/useFadeIn'

const categories = [
  {
    icon: '⚡',
    name: 'Languages',
    color: '#ff9f0a', // iOS Orange
    span: 'normal',
    skills: ['JavaScript', 'Java', 'SQL'],
  },
  {
    icon: '🧩',
    name: 'Frameworks & Libraries',
    color: '#64d2ff', // iOS Teal
    span: 'wide',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Socket.io', 'WebRTC', 'Zod'],
  },
  {
    icon: '🤖',
    name: 'AI & LLM Integration',
    color: '#bf5af2', // iOS Purple
    span: 'wide',
    skills: ['LLM Integration', 'Claude Code', 'Cursor', 'Antigravity', 'Kiro', 'NVIDIA NIM (LLaMA 3.1)'],
  },
  {
    icon: '☁️',
    name: 'Cloud & Deployment',
    color: '#ff9f0a', // iOS Orange
    span: 'wide',
    skills: ['AWS (EC2, S3, Lambda, IAM, CloudWatch)', 'Firebase (Cloud Functions v2, Auth)', 'Vercel', 'Render'],
  },
  {
    icon: '🗄️',
    name: 'Databases',
    color: '#30d158', // iOS Green
    span: 'normal',
    skills: ['MongoDB (NoSQL)', 'Firebase Firestore', 'MySQL'],
  },
  {
    icon: '🛠️',
    name: 'Tools & CI/CD',
    color: '#0a84ff', // iOS Blue
    span: 'normal',
    skills: ['GitHub', 'GitHub Actions', 'Postman', 'Git'],
  },
  {
    icon: '🔐',
    name: 'Core Concepts & Architecture',
    color: '#ff375f', // iOS Pink/Red
    span: 'full',
    skills: ['REST APIs', 'OAuth 2.0', 'JWT', 'Role-Based Access Control (RBAC)'],
  },
]

export default function Skills() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <p className="section-label">Technical Skills</p>
        <h2 className="section-title">What I work with</h2>

        <div className="skills-bento">
          {categories.map((cat, i) => (
            <div
              className={`skill-card skill-card--${cat.span} fade-in delay-${Math.min(i + 1, 5)}${visible ? ' visible' : ''}`}
              key={cat.name}
              style={{ '--cat-color': cat.color }}
              onMouseMove={e => {
                const el = e.currentTarget
                const rect = el.getBoundingClientRect()
                el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
                el.style.setProperty('--my', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="skill-card__spotlight" aria-hidden="true" />
              <div className="skill-card__header">
                <span
                  className="skill-card__icon"
                  style={{ background: `${cat.color}15`, borderColor: `${cat.color}35` }}
                >
                  {cat.icon}
                </span>
                <span className="skill-card__name">{cat.name}</span>
              </div>
              <div className="skill-card__tags">
                {cat.skills.map(skill => (
                  <span
                    className="skill-pill"
                    key={skill}
                    style={{ '--pill-color': cat.color }}
                  >
                    {skill}
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
