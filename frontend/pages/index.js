import React from 'react'
import PageLayout from 'components/page-layout'

export default class Home extends React.Component {

  // componentWillMount() {
  //   if(window && window.document) {
  //     const { document } = window;
  //     const [ body ] = document.getElementsByTagName('body')
  //     console.log(body)
  //   }
  // }

  // componentDidMount() {
  //   if(window && window.document) {
  //     const { document } = window;
  //     const [ body ] = document.getElementsByTagName('body')
  //     console.log(body) 
  //   }
  // }

  render() {
    return (
      <PageLayout section="home">
        <div className="home-image" />
        <div className="home-text">
          <p>Designers like to put big text on their home pages. Perhaps a quotation. Sometimes a slogan.</p>
        </div>
        <style jsx global>{`
        .site-header {
          /* background-color: #f0f; */
        }
        .container {
          background: #000;
        }
        `}</style>
        <style jsx>{`
        .home-image {
          background-image: url('/static/images/subway.jpg');
          background-size: cover;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          z-index: 0;
        }
        .home-text {
          position: fixed;
          left: 240px;
          top: 0;
          bottom: 0;
          width: calc(100% - 240px);
          font-size: 2em;
          color: #fff;
          text-shadow: 0 0 10px #000;
        }
        .home-text p {
        }
        `}</style>
      </PageLayout>
    );
  }

}