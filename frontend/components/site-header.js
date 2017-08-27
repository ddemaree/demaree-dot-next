import Link from 'next/link'

export default () => (
  <div className="site-header">
    <h1>David Demaree</h1>
    <h2 data-thing="hide">Maker of interwebs and fine software</h2>

    <style jsx>{`
    .site-header {
      padding-bottom: 1em;
      padding-top: 2em;
      --border-color: rgba(0,0,0,0.1);
      border-bottom: 2px solid #000;
    }
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