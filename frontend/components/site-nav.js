import Link from 'next/link'
import Router from 'next/router'

const NavLink = ({children, href, active, emoji, label}) => {
  const className = (!!active ? "active" : "inactive");

  return (
    <Link href={href}>
      <a className={`nav-link ${className}`} onMouseOver={
        (e) => { Router.prefetch(href) }
      }>
        <span className="nav-link__emoji">{emoji}</span>&nbsp;
        <span className="nav-link__label">{label}</span>
        <style jsx>{`
        a.nav-link {
          display: block;
          padding: 0.25em 0.5em;
          text-decoration: none;
          border-bottom: none;
          flex-grow: 1;
        }
        a.nav-link:hover {
          background-color: rebeccapurple;
        }
        a.nav-link span.nav-link__emoji {
          display: inline-block;
          margin-right: 8px;
          text-align: center;
          width: 20px;
        }
        a.nav-link.active .nav-link__label {
          font-weight: bold;
          color: #fff;
          border-bottom: 1px solid rebeccapurple;
        }
        `}</style>
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
    `}</style>
  </nav>
);