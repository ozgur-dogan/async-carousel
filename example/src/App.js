import React, { Component } from "react";
import AsyncCarousel from "async-carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight,faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css';

const images = [
  "https://www.gstatic.com/webp/gallery/1.webp",
  "https://www.gstatic.com/webp/gallery/2.webp",
  "https://www.gstatic.com/webp/gallery/3.webp",
  "https://www.gstatic.com/webp/gallery/4.webp",
  "https://www.gstatic.com/webp/gallery/5.webp"
];

export default class extends Component {
  getContent(i) {
    const len = images.length;
    let poss = i % len;
    if (poss < 0) {
      poss += len;
    }
    const src = images[poss];
    return <img src={src} alt={i + "-" + poss} />;
  }

  getContentPromise(i) {
    return new Promise((resolve, reject) => {
      const len = images.length;
      let poss = i % len;
      if (poss < 0) {
        poss += len;
      }
      const src = images[poss];
      resolve(<img src={src} alt={i + "-" + poss} />);
    });
  }
  getPrevIcon(){
    return <div className="customIcon"><FontAwesomeIcon icon={faCaretSquareLeft} /></div>
  }
  getNextIcon(){
    return <div className="customIcon"><FontAwesomeIcon icon={faCaretSquareRight} /></div>
  }


  render() {
    return (
      <main>
        <section>
          <h2>With Promise</h2>
          <AsyncCarousel
            getContentPromise={this.getContentPromise}
            height={300}
            width={300}
          />
        </section>
        <section>
          <h2>With Sync Fn</h2>
          <AsyncCarousel
            getContent={this.getContent}
            height={300}
            width={300}
          />
        </section>
        <section>
          <h2>With Icons</h2>
          <AsyncCarousel
            prevIcon={this.getPrevIcon()}
            nextIcon={this.getNextIcon()}
            getContentPromise={this.getContentPromise}
            height={300}
            width={300}
          />
        </section>
      </main>
    );
  }
}
