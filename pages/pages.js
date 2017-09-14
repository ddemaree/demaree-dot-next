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
      const _props = simplifyCfulObject(page);
      console.log(_props)
      return _props;
    })
  }

  render() {
    const { title, slug, modules, headingImage } = this.props;

    const moduleTags = modules.map(m => <PageModule page={this.props} module={m} key={`pm-${m._id}`} />)

    let headingStyle = {};
    if(headingImage) {
      headingStyle = {
        backgroundImage: `url('${headingImage.file.url}?fit=crop&w=1600&h=1200')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
      }
    }

    return (
      <PageLayout section="about">
        <div className={`page page--${slug}`}>
          <header className={`page__heading ${headingImage ? 'page__heading--image' : ''}`} style={headingStyle}>
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
          font-family: 'halyard-display';
          font-weight: bold;
          font-size: 2em;
        }

        .page__heading--image {
          color: #fff;
          margin-top: -1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 160px;
        }

        .page__heading h1 {
          margin: 0;
        }

        `}</style>
      </PageLayout>
    )
  }
}