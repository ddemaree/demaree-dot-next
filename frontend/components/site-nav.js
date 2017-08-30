import Link from 'next/link'

const NavLink = ({children, href, active, emoji, label}) => {
  const className = (!!active ? "active" : "inactive");

  return (
    <Link href={href}>
      <a className={`nav-link ${className}`}>
        {emoji}&nbsp;
        <span>{label}</span>
      </a>
    </Link>
  );
}

export default ({section}) => (
  <nav className="site-nav">
    <NavLink href="/" active={(section == "home")} emoji="🏡" label="Home" />
    <NavLink href="/posts" active={(section == "posts")} emoji="🎉" label="Posts" />

    <style jsx>{`

    nav {
      display: flex;
      flex-direction: column;
      padding: 0;
      color: #ccc;
    }
    nav :global(a) {
      display: block;
      padding: 0.25em 0.5em;
      text-decoration: none;
      border-bottom: 1px solid var(--border-color);
    }
    nav :global(a:hover) {
      background-color: rebeccapurple;
    }
    nav :global(a.active span) {
      font-weight: bold;
      color: #fff;
      border-bottom: 1px solid rebeccapurple;
    }
    
    `}</style>
  </nav>
);