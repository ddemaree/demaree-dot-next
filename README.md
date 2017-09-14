# This is my web site (really)

## "Pages"

Like all [Next.js](https://github.com/zeit/nextjs) apps, the central element of this site are its "pages". As in PHP, each page represents a single HTTP endpoint, and has all the stuff needed to handle requests for that endpoint.

### `/index.js`

The site home page. Right now, it renders a collection of blog posts, but in the future that may change.

### `/posts/index.js`

Long term home for posts and post archives. Right now basically identical to the home page.

### `/posts/show.js`

Single post view.

## Some notes on CSS

I'm using `styled-jsx` to attach and scope CSS to my components and pages, in part because it's bundled with Next and using it is the path of least resistance. (Another benefit is that I get hot reloading for CSS changes, which is quite _hot_.)

The `PageLayout` component is responsible for document-level markup and CSS. There, you'll find a global stylesheet that implements an underlying layout based on CSS Grid, custom properties (aka native CSS variables), and the `calc()` function. No CSS preprocessors were harmed in the making of this web site.