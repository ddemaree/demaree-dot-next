import React from 'react'
import PageLayout from '../components/page-layout'
import MarkdownContent from '../components/markdown-content'
import { createClient } from 'contentful';

const contentful = createClient({
  space: process.env.CFUL_SPACE_ID,
  accessToken: process.env.CFUL_ACCESS_TOKEN
});

function simplifyCfulObject(item) {
  if(!item) return null;
  const { sys, fields } = item;
  const modules = typeof fields.modules !== 'undefined' ? fields.modules : [];
  const headingImage = fields.headingImage || null;

  return Object.assign({}, 
    fields,
    { 
      "_id": sys.id,
      modules: modules.map(simplifyCfulObject),
      headingImage: simplifyCfulObject(headingImage)
    }
  )
}

import marked from 'marked'
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  smartypants: true
});

const PageModule = ({ page, module }) => {
  const { title, body } = module;
  const modSlug = `pm-${page.slug}-${module._id}`

  return (
    <section className="module" id={modSlug}>
      <div className="module__inner">
        { module.showHeading ? <h2 className="module__heading">{title}</h2> : null }
        <MarkdownContent content={body} classNames={['module__content']} />
      </div>
    </section>
  )
}

export default class extends React.Component {
  static async getInitialProps({query}) {
    const { id } = query;

    return contentful.getEntries({
      content_type: 'page',
      'fields.slug': id,
      limit: 1,
      include: 2
    })
    .then(response => {
      const [ page ] = response.items;
      console.log(page);
      const _props = simplifyCfulObject(page);
      return _props;
    })
  }

  render() {
    const { title, slug, modules, headingImage } = this.props;

    const moduleTags = modules.map(m => <PageModule page={this.props} module={m} key={`pm-${m._id}`} />)

    let headingStyle = {};
    let layoutClassNames = [];
    if(headingImage) {
      headingStyle = {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.2)), url('${headingImage.file.url}?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 36%'
      }
      layoutClassNames.push('site--fullbleed')
    }

    return (
      <PageLayout section="about" className={layoutClassNames.join(' ')}>
        <div className={`page page--${slug}`}>
          <header className={`page__heading ${(headingImage) ? 'page__heading--image' : ''}`} style={headingStyle}>
            <h1>{title}</h1>
          </header>

          {moduleTags}
        </div>
        <style jsx>{`

        :global(.module__inner) {
          margin: 0 auto;
          max-width: 40em;
          padding: 0 1.25em;
        }  

        .page__heading {
          text-align: center;
          font-weight: 700;
          font-size: 2em;
          font-family: var(--display-fonts);
        }

        .page__heading--image {
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 160px;
          flex-direction: column;
          text-shadow: 0 0 20px #000;
        }

        .page__heading h1 {
          margin: 0;
          width: 100%;
        }

        .page__heading h1:after {
          content: '';
          display: block;
          border-bottom: 2px solid;
          width: 20%;
          margin: 1rem auto 0;
        }

        `}</style>
      </PageLayout>
    )
  }
}