import React from 'react'

export default class Home extends React.Component {

  componentDidMount() {
    const { body } = document;
    body.classList.add('app--home');
  }

  componentWillUnmount() {
    const { body } = document;
    document.body.classList.remove('app--home');
  }

  render() {
    return (
      <div className="home" ref={(elem) => { this.elem = elem; } }>
        <div className="home-text slide" ref={(el) => { this.text = el; }}>
          <div>
            <h1>Hi, I'm David</h1>
            <p>This is my web site.</p>
          </div>
        </div>

        <style jsx>{`
        .home {
        }
        .home-text {
          background-color: #f0f;
          background-image: linear-gradient(0deg, #f0f, #ffcf00);
          background-attachment: fixed;
          background-position: left bottom;
          background-size: 100% 100%;
          height: var(--window-height);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-align: center;
          font-size: 2em;
        }
        .home-text h1 {
          font-size: 2em;
          font-weight: bold;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fff;
          color: transparent;
          margin: 0;
          line-height: 1;
        }
        .home-text h1:after {
          display: block;
          border-bottom: 4px solid white;
          content: '';
          margin: 20px 1em;
        }
        .home-text p {
          margin: 0;
          font-style: italic;
        }
        `}</style>
      </div>
    )
  }
}