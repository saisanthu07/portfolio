import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <span> SANTHU🤍</span>
          </div>
          <div className="footer-copy">
            Built with React + Node.js ·{' '}
            Made with <span className="footer-heart">♥</span> by Sai Santhosh
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <div className="grid-bg" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
