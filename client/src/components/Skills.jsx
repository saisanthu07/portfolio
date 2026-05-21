import { useFadeIn } from '../hooks/useFadeIn'

const categories = [
  {
    icon: '⚡',
    name: 'Languages',
    skills: ['JavaScript (ES2022+)', 'Python', 'SQL', 'JAVA'],
  },
  {
    icon: '🧩',
    name: 'Frameworks & Libraries',
    skills: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'WebSockets'],
  },
  {
    icon: '🤖',
    name: 'AI',
    skills: ['AI API Integration'],
  },
  {
    icon: '🗄️',
    name: 'Databases',
    skills: ['MongoDB (NoSQL)', 'MySQL', 'MongoDB Atlas'],
  },
  {
    icon: '☁️',
    name: 'Cloud (AWS)',
    skills: ['EC2', 'S3', 'CloudFront', 'Lambda', 'IAM', 'CloudWatch', 'Route 53'],
  },
  {
    icon: '🔐',
    name: 'Auth & Security',
    skills: ['Clerk Auth', 'JWT', 'bcrypt', 'CORS', 'HTTPS', 'Role-Based Access Control'],
  },
  {
    icon: '🛠️',
    name: 'Tools',
    skills: ['Git & GitHub', 'GitHub Actions','Vercel', 'Render', 'Postman', 'Cloudinary'],
  },
]

export default function Skills() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <p className="section-label">Technical Skills</p>
        <h2 className="section-title">What I work with</h2>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <div
              className={`skill-category fade-in delay-${Math.min(i + 1, 5)}${visible ? ' visible' : ''}`}
              key={cat.name}
            >
              <div className="skill-category-header">
                <div className="skill-category-icon">{cat.icon}</div>
                <div className="skill-category-name">{cat.name}</div>
              </div>
              <div className="skill-tags">
                {cat.skills.map(s => (
                  <span className="skill-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
