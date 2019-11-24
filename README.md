# async-carousel
## Async Carousel for React
React Carousel implementation with async content load.
It is useful to create infinite content carousel.
Any React content can be content
It fetches next and prev elements only. When next or prev element shown, the one after that fetched asyncronously.
It also support Promises.

[![NPM](https://img.shields.io/npm/v/async-carousel.svg)](https://www.npmjs.com/package/async-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
```bash
npm install --save async-carousel
```
## Usage
### with sync function
  <AsyncCarousel
    getContentPromise={this.getContentPromise}
    height={300}
    width={300}
  />

  getContent(i) {
    const len = images.length;
    let poss = i % len;
    if (poss < 0) {
      poss += len;
    }
    const src = images[poss];
    return <img src={src} alt={i + "-" + poss} />;
  }

### with promise
  <AsyncCarousel
    getContent={this.getContent}
    height={300}
    width={300}
  />
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

## License
MIT © [ozgur-dogan](https://github.com/ozgur-dogan)
