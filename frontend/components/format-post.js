import moment from 'moment'
import marked from 'marked'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  smartypants: true
});

export default (item) => {
  const { date, title, body, slug, postFormat, linkUrl, tags } = item.fields;
  const { id, createdAt, updatedAt } = item.sys;

  let body_html;
  if(body) body_html = marked(body);

  return {
    id,
    createdAt,
    updatedAt,
    date,
    title,
    body,
    body_html,
    slug,
    postFormat,
    linkUrl,
    tags
  }
}