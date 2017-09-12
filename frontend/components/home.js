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
  }

  componentWillUnmount() {
    const { body } = document;
    document.body.classList.remove('body-home');
    window.removeEventListener('resize', this.setElementHeight.bind(this));
  }

  setElementHeight(event) {
    if(!this.elem) {
      console.log("Lost reference to this.elem in Home")
      return false;
    }

    console.log("Setting element height")

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
        <div className="home-text slide" ref={(el) => { this.text = el; }}>
          <div>Hi.</div>
          <div>What the hell, dude?</div>
        </div>

        <style jsx>{`
        .home {
          background-color: #f0f;
          background-image: linear-gradient(0deg, #f0f, #ffcf00);
        }
        .home-text {
          text-shadow: 0 0 60px rgba(0,0,0,0.4);
          color: #fff;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .home-text p {
          margin: 0;
        }
        `}</style>
      </div>
    )
  }
}