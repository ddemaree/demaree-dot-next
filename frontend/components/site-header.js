import Link from 'next/link'

export default () => (
  <div className="site-header">
    <h1>David Demaree</h1>
    <h2 data-thing="hide">Maker of interwebs and fine software</h2>
    <h3 data-thing="hide">New York City*, USA</h3>

    <nav>
    <Link href="/"><a>🏡 Home</a></Link>
    <Link href="/posts"><a>🏡 Posts</a></Link>
    </nav>

    <style jsx>{`
    .site-header {
      padding-right: 2em;
      --border-color: rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
      font-size: inherit;
      font-weight: normal;
      margin: 0;
    }
    h1 {
      font-weight: 600;
    }

    nav {
      margin-top: 2em;
      border-top: 1px solid var(--border-color);
    }
    nav a {
      display: block;
      padding: 0.5em 0;
      text-decoration: none;
      border-bottom: 1px solid var(--border-color);
    }
    nav a:hover {
      background-color: var(--border-color);
    }
    @media (max-width: 800px) {
      nav {
        display: none;
      }
    }
    `}</style>
  </div>
);