import Link from 'next/link'
import Router from 'next/router'

const NavLink = ({children, href, active, emoji, label}) => {
  const className = (!!active ? "active" : "inactive");

  return (
    <Link href={href}>
      <a className={`nav-link ${className}`} onMouseOver={
        (e) => { Router.prefetch(href) }
      }>
        <div>
          <span className="nav-link__emoji">{emoji}</span>&nbsp;
          <span className="nav-link__label">{label}</span>
        </div>
      </a>
    </Link>
  );
}

export default ({section}) => (
  <nav className="site-nav">
    <NavLink href="/" active={(section == "home")} emoji="🏡" label="Home" />
    <NavLink href="/posts" active={(section == "posts")} emoji="🎉" label="Posts" />
    <NavLink href="/photos" active={(section == "photos")} emoji="📷" label="Photos" />
    <NavLink href="/about" active={(section == "about")} emoji="👨‍🎤" label="About" />
    <NavLink href="/places" active={(section == "places")} emoji="🗺" label="Places" />
  </nav>
);