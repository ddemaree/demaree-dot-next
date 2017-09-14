import marked from 'marked'
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  smartypants: true
});

export default ({ content, classNames = [] }) => {
  const html_content = marked(content);

  const _classNames = ['md-content', ...classNames]

  return (
    <div className={_classNames.join(' ')} dangerouslySetInnerHTML={{__html: html_content}} />
  )
}