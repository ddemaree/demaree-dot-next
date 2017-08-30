import React from 'react'
import PageLayout from 'components/page-layout'

export default class Home extends React.Component {

  render() {
    return (
      <PageLayout section="home">
        <div className="home">
          <div className="home-image" />
          <div className="home-text">
            <p>Designers like to put big text on their home pages. Perhaps a quotation. Sometimes a slogan.</p>
          </div>
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
        .home {
          background-image: url('/static/images/chicago.jpg');
          background-size: cover;
          background-position: center 30%;
          min-height: 100vh;
        }
        .home-text {
          {/* position: fixed;
          left: 240px;
          top: 0;
          bottom: 0;
          width: calc(100% - 240px); */}
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