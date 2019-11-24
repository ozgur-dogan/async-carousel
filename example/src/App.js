import React, { Component } from "react";

import AsyncCarousel from "async-carousel";
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
  render() {
    return (
      <div>
        <AsyncCarousel
          getContentPromise={this.getContentPromise}
          height={300}
          width={300}
        />
        <AsyncCarousel
          getContent={this.getContent}
          height={300}
          width={300}
        />
      </div>
    );
  }
}
