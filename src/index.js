import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight,faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import styles from "./style.css";

class AsyncCarousel extends React.Component {
  static propTypes = {
    getContent: PropTypes.func,
    getContentPromise: PropTypes.func,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    nextIcon: PropTypes.element,
    prevIcon: PropTypes.element
  };
  constructor(props) {
    super(props);
    this.state = { left: 0, pos: 0, contents: {} };
  }
  componentDidMount() {
    this.getContent.bind(this)();
  }
  getContent() {
    if (this.props.getContent) {
      return this.getContentSync.bind(this)();
    } else if (this.props.getContentPromise) {
      return this.getContentAsync.bind(this)();
    }
  }
  getContentAsync() {
    const { getContentPromise } = this.props;
    const { contents, pos } = this.state;
    for (let i = -1; i <= 1; i++) {
      const poss = pos + i;
      if (!contents[poss]) {
        getContentPromise(poss).then(content => {
          this.setState(state => {
            state.contents[poss] = content;
            return { contents: state.contents };
          });
        });
      }
    }
  }

  getContentSync() {
    const { getContent } = this.props;
    const { contents, pos } = this.state;
    for (let i = -1; i <= 1; i++) {
      const poss = pos + i;
      if (!contents[poss]) {
        const content = getContent(poss);
        this.setState(state => {
          state.contents[poss] = content;
          return { contents: state.contents };
        });
      }
    }
  }
  nextClicked() {
    const { left, pos } = this.state;
    let i = 0;
    this.animation = setInterval(() => {
      i++;
      if (i >= 100) {
        clearInterval(this.animation);
        this.setState(
          {
            left: left - 100,
            pos: pos + 1
          },
          () => {
            this.getContent.bind(this)();
          }
        );
      } else {
        this.setState({ left: left - i });
      }
    }, 10);
  }
  prevClicked() {
    const { left, pos } = this.state;
    let i = 0;
    this.animation = setInterval(() => {
      i++;
      if (i >= 100) {
        clearInterval(this.animation);
        this.setState(
          {
            left: left + 100,
            pos: pos - 1
          },
          () => {
            this.getContent.bind(this)();
          }
        );
      } else {
        this.setState({ left: left + i });
      }
    }, 10);
  }
  getNextIcon() {
    const { nextIcon } = this.props;
    return (
      <div className={styles.nextArrow} onClick={this.nextClicked.bind(this)}>
        {this.props.nextIcon || <div class={styles.navIcon}><FontAwesomeIcon icon={faAngleDoubleRight}/></div>}
      </div>
    );
  }
  getPrevIcon() {
    return (
      <div className={styles.prevArrow} onClick={this.prevClicked.bind(this)}>
        {this.props.prevIcon || <div class={styles.navIcon}><FontAwesomeIcon icon={faAngleDoubleLeft}/></div>}
      </div>
    );
  }
  render() {
    const { pos, contents, left } = this.state;
    const { height, width } = this.props;

    let items = [];

    for (let i = -1; i <= 1; i++) {
      const poss = pos + i;
      let content = contents[poss];
      if (content) {
        items.push(
          <div
            className={styles.content}
            style={{
              left: left + poss * 100 + "%"
            }}
            id={`content-${poss}`}
            key={`content-${poss}`}
          >
            {content}
          </div>
        );
      }
    }

    return (
      <div
        className={styles.asyncCarousel}
        style={{ height: height, width: width }}
      >
        <div className={styles.contents}>{items}</div>

        {contents[pos - 1] && this.getPrevIcon.bind(this)()}
        {contents[pos + 1] && this.getNextIcon.bind(this)()}
      </div>
    );
  }
}

export default AsyncCarousel;
