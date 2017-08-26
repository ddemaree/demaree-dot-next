import Link from 'next/link'

export default () => (
  <nav className="site-nav">
    <Link href="/"><a>🏡 Home</a></Link>
    <Link href="/posts"><a>🏡 Posts</a></Link>

    <style jsx>{`

    nav {
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
  </nav>
);