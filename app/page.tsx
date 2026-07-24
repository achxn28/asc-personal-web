const projects = [
  {
    name: "Study Hall",
    subject: "Product Thinking",
    summary:
      "Clear interfaces for messy workflows, with a bias toward calm tools that people can return to every day.",
  },
  {
    name: "Lab Notes",
    subject: "Software Craft",
    summary:
      "Small, sturdy web systems built with readable code, practical defaults, and room for future ideas.",
  },
  {
    name: "Show & Tell",
    subject: "Creative Systems",
    summary:
      "Visual experiments, prototypes, and sketches that turn abstract concepts into things people can use.",
  },
];

const schedule = [
  "Discovery calls",
  "Prototype reviews",
  "Design systems",
  "Launch planning",
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Andrew Chin home">
          <span className="brand-mark" aria-hidden="true">
            AC
          </span>
          <span>Andrew Chin</span>
        </a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#notes">Notes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="classroom-board">
          <div className="board-rail" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="board-content">
            <p className="eyebrow">Open studio hours</p>
            <h1 id="hero-title">Design-minded builder for useful web things.</h1>
            <p className="hero-copy">
              I turn early ideas into thoughtful digital products, balancing
              sharp engineering with a classroom-style habit of making the
              complex feel teachable.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                View work
              </a>
              <a className="button secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <aside className="side-panel" aria-label="Current focus">
          <p className="panel-label">This semester</p>
          <h2>Building practical, polished products.</h2>
          <ul>
            {schedule.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section-grid" id="work" aria-labelledby="work-title">
        <div>
          <p className="eyebrow">Recent work</p>
          <h2 id="work-title">A few things on the board.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div>
                <p>{project.subject}</p>
                <h3>{project.name}</h3>
              </div>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-band" id="notes" aria-labelledby="notes-title">
        <div className="notes-copy">
          <p className="eyebrow">Notes</p>
          <h2 id="notes-title">What I care about.</h2>
        </div>
        <div className="note-columns">
          <p>
            Interfaces should respect attention. Good software gives people a
            clear next move without making them feel rushed.
          </p>
          <p>
            Process should create clarity. I like working in short loops:
            sketch, build, test, explain, refine.
          </p>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Have an idea worth putting on the board?</h2>
        </div>
        <a className="button primary" href="mailto:hello@andrewchin.dev">
          Start a conversation
        </a>
      </footer>
    </main>
  );
}
