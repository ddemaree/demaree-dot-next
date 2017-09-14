import Link from 'next/link'
import Router from 'next/router'

const NavLink = ({children, href, active, emoji, label}) => {
  const className = (!!active ? "active" : "inactive");

  return (
    <Link href={href}>
      <a className={`navitem nav-link navitem--${className}`} onMouseOver={
        (e) => { Router.prefetch(href) }
      }>
        <span className="emoji">{emoji}</span>
        <span className="label">{label}</span>
      </a>
    </Link>
  );
}

export default ({section}) => (
  <nav className="sitenav">
    <NavLink href={{pathname: "/pages", query: {id: 'about'}}} active={(section == "about")} emoji="👨‍🎤" label="About" />
    <NavLink href="/posts" active={(section == "posts")} emoji="🎉" label="Posts" />
    <NavLink href="/photos" active={(section == "photos")} emoji="📷" label="Photos" />
    <NavLink href="/places" active={(section == "places")} emoji="🗺" label="Places" />
  </nav>
);