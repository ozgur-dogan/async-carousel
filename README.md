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

Lets say we have list of image src within an array called _images_

### with promise

```javascript
<AsyncCarousel
  getContentPromise={this.getContentPromise}
  height={300}
  width={300}
/>
```

```javascript
function getContentPromise(i) {
  return new Promise((resolve, reject) => {
    // Get modulo of images length (positive and negative indexes are possible)
    const len = images.length;
    let poss = i % len;
    if (poss < 0) {
      poss += len;
    }
    // get image src
    const src = images[poss];
    // create and return image component with resolve
    resolve(<img src={src} alt={i + "-" + poss} />);
  });
}
```

### with sync function

```javascript
<AsyncCarousel getContent={this.getContent} height={300} width={300} />
```

```javascript
function getContent(i) {
  // Get modulo of images length (positive and negative indexes are possible)
  const len = images.length;
  let poss = i % len;
  if (poss < 0) {
    poss += len;
  }
  // Get image src
  const src = images[poss];
  // create and return image component
  return <img src={src} alt={i + "-" + poss} />;
}
```

### with custom icons

```javascript
<AsyncCarousel
  prevIcon={this.getPrevIcon()}
  nextIcon={this.getNextIcon()}
  getContentPromise={this.getContentPromise}
  height={300}
  width={300}
/>
```

```javascript
getPrevIcon(){
  return <div className="customIcon"><FontAwesomeIcon icon={faCaretSquareLeft} /></div>
}
getNextIcon(){
  return <div className="customIcon"><FontAwesomeIcon icon={faCaretSquareRight} /></div>
}
```

## Parameters
| Prop              | Required | Type          | Description                                        |
| ------------------| -------- | ------------- | -------------------------------------------------- |
| Height            | True     | Number or "%" | Width of the Carousel                              |
| Width             | True     | Number or "%" | Height of the Carousel                             |
| getContent        | False    | Fn (index)    | Function to get React element on index             |
| getContentPromise | False    | Fn (index)    | Function to get React element on index (Promise)   |
| prevIcon          | False    | React Element | custom icon for prev button                        |
| nextIcon          | False    | React Element | custom icon for next button                        |
* getContent or getContentPromise should be supplied

## License

MIT © [ozgur-dogan](https://github.com/ozgur-dogan)
