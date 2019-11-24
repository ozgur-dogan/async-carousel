import React, { Component } from 'react'

import AsyncCarousel from 'async-carousel'
const images = [
  "https://www.gstatic.com/webp/gallery/1.webp",
  "https://www.gstatic.com/webp/gallery/2.webp",
  "https://www.gstatic.com/webp/gallery/3.webp"
];

export default class extends Component {
  constructor(p) {
    super(p);
    this.state = {index:images.length * 100000}
  }
  render() {
    const { index } = this.state;

    const current = <img src={images[index % images.length]} alt="current"/>;
    const next = <img src={images[(index + 1) % images.length]} alt="next"/>;
    const prev = <img src={images[(index - 1) % images.length]} alt="prev"/>;

    return (
      <AsyncCarousel
        nextContent={next}
        previousContent={prev}
        currentContent={current}
        nextClicked={() => {
          this.setState(state => {
            return {index: state.index + 1}
          });
        }}
        prevClicked={() => {
          this.setState(state => {
            return {index: state.index - 1};
          });
        }}
        height={300}
        width={300}
      />
    );
  }
}