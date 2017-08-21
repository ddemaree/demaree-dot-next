import Link from 'next/link'

export default () => (
  <div className="site-header">
    <h1>David Demaree</h1>
    <h2>Maker of interwebs and fine software</h2>
    <h3>New York City*, USA</h3>

    <nav>
    <Link href="/"><a>🏡 Home</a></Link>
    </nav>

    <style jsx>{`
    h1, h2, h3 {
      font-size: inherit;
      font-weight: normal;
      margin: 0;
    }
    h1 {
      font-weight: 600;
    }
    `}</style>
  </div>
);