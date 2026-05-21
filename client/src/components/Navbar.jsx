import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact', cta: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <a className="navbar-logo" href="#hero" onClick={e => handleNav(e, '#hero')}>
            <span>SANTHU🤍</span>
          </a>

          <ul className="navbar-links">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={l.cta ? 'navbar-cta' : ''}
                  onClick={e => handleNav(e, l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-menu${open ? ' open' : ''}`}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={e => handleNav(e, l.href)}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
