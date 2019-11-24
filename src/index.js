import React from "react";
import PropTypes from "prop-types";
import styles from "./style.css";

class AsyncCarousel extends React.Component {
  static propTypes = {
    currentContent: PropTypes.element.isRequired,
    previousContent: PropTypes.element,
    nextContent: PropTypes.element,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { left: 0 };
  }
  componentDidMount() {
    this.updateState.bind(this)();
  }
  updateState() {
    console.log("updateState");
    const { previousContent, currentContent, nextContent } = this.props;
    this.setState({
      previousContent: previousContent,
      currentContent: currentContent,
      nextContent: nextContent,
      left: 0
    });
  }
  nextClicked() {
    this.props.nextClicked();
    let i = 0;
    this.animation = setInterval(() => {
      if (i >= 100) {
        clearInterval(this.animation);
        this.setState({
          currentContent: this.state.nextContent,
          left:-100
        });
        setTimeout(()=>this.updateState.bind(this)(),50);
      } else {
        this.setState({ left: -1 * i++ });
      }
    }, 10);
  }
  prevClicked() {
    this.props.prevClicked();
    let i = 0;
    this.animation = setInterval(() => {
      if (i >= 100) {
        clearInterval(this.animation);
        this.setState({
          currentContent: this.state.previousContent,
          left:100
        });
        setTimeout(()=>this.updateState.bind(this)(),50);
      } else {
        this.setState({ left: i++ });
      }
    }, 10);
  }
  render() {
    const { previousContent, currentContent, nextContent, left } = this.state;
    const { height, width } = this.props;
    return (
      <div
        className={styles.asyncCarousel}
        style={{ height: height, width: width }}
      >
        {previousContent && (
          <div
            className={styles.previousContent}
            style={{ height: height, width: width, left: -100 + left + "%" }}
          >
            {previousContent}
          </div>
        )}
        {currentContent && (
          <div
            className={styles.currentContent}
            style={{ height: height, width: width, left: left + "%" }}
          >
            {currentContent}
          </div>
        )}
        {nextContent && (
          <div
            className={styles.nextContent}
            style={{ height: height, width: width, left: 100 + left + "%" }}
          >
            {nextContent}
          </div>
        )}
        {previousContent && (
          <div
            className={styles.prevArrow}
            onClick={this.prevClicked.bind(this)}
          >
            {"<"}
          </div>
        )}
        {nextContent && (
          <div
            className={styles.nextArrow}
            onClick={this.nextClicked.bind(this)}
          >
            {">"}
          </div>
        )}
      </div>
    );
  }
}

export default AsyncCarousel;
