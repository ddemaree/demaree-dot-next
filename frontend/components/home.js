import React from 'react'

export default class Home extends React.Component {

  componentDidMount() {
    const { body } = document;
    body.classList.add('body-home');

    // Only show/load image after initial page load when React mounts
    this.elem.classList.add('show-image');
    setTimeout(()=>{
      this.img.classList.add('show');
      setTimeout(() => {
        this.text.classList.add('show');
      }, 2000);
    }, 1000);

    this.setElementHeight();
    window.addEventListener('resize', this.setElementHeight.bind(this));
    // window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount() {
    document.body.classList.remove('body-home');
    window.removeEventListener('resize', this.setElementHeight.bind(this));
    // window.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll(event) {
    event.preventDefault();

    const THRESHOLD = 30;
    const absDelta = Math.abs(event.deltaY);

    if(absDelta > THRESHOLD) {
      console.log(`OVER - ${absDelta}`);
    }
  }

  setElementHeight(event) {
    if(!this.elem) {
      console.log("Lost reference to this.elem in Home")
      return false;
    }

    const [ header ] = document.getElementsByClassName('site-header');
    let newHeight;

    if(window.innerWidth <= 700){
      newHeight = Math.ceil(window.innerHeight - header.offsetHeight);
    } else {
      newHeight = window.innerHeight;
    }
    this.elem.style.minHeight = `${newHeight}px`;
  }

  render() {
    return (
      <div className="home" ref={(elem) => { this.elem = elem; } }>
        <div className="home-img" ref={(el) => { this.img = el; }} />
        <div className="home-text slide" ref={(el) => { this.text = el; }}>
          <p>Some designers like to put big text on their home pages. Perhaps a quotation. Sometimes a slogan. WTF is up with that?</p>
        </div>

        <style jsx>{`
        .home {
          background-color: #f0f;
          background-image: linear-gradient(0deg, #f0f, #ffcf00);
        }
        .slide, .home-text {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .home-img {
          background-image: url('/static/images/chicago.jpg');
          background-size: cover;
          background-position: center 30%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          z-index: 1;
          opacity: 0;
          transition: opacity 5000ms;
        }
        .home-img.show {
          opacity: 0.4;
        }
        .home-text {
          position: relative;
          z-index: 10;
          font-weight: 600;
          text-transform: uppercase;
          padding: 1em;
          line-height: 1.75;
          letter-spacing: 0.1em;
          font-size: 2.0em;
          color: #fff;
          text-shadow: 0 0 60px rgba(0,0,0,0.4);
          text-align: center;
          {/* opacity: 0; */}
        }
        .home-text.show {
          opacity: 1;
          transition: opacity 5000ms;
        }
        .home-text p {
          margin: 0;
        }
        `}</style>
      </div>
    )
  }
}