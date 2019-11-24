import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

class AsyncCarousel extends React.Component {
  static propTypes = {
    currentContent : PropTypes.element,
    previousContent : PropTypes.element,
    nextContent : PropTypes.element
  }
  constructor(props) {
    super(props);
    this.state = {left:0};
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
      left:0
    });
  }

  render() {
    const { previousContent, currentContent, nextContent,left } = this.state;
    const { height, width } = this.props;
    return (
      <div className={styles.asyncCarousel} style={{ height: height || 200 ,width:width || 300}}>
        {previousContent && (
          <div className={styles.previousContent} style={{left:(-100+left)+"%"}}>
            {previousContent}
          </div>
        )}
        {currentContent && (
          <div className={styles.currentContent} style={{left:(0+left)+"%"}}>
            {currentContent}
          </div>
        )}
        {nextContent && (
          <div className={styles.nextContent} style={{left:(100+left)+"%"}}>
            {nextContent}
          </div>
        )}
        {previousContent && (
          <div className={styles.prevArrow} onClick={this.prevClicked.bind(this)}>
            {"<"}
          </div>
        )}
        {nextContent && (
          <div className={styles.nextArrow} onClick={this.nextClicked.bind(this)}>
            {">"}
          </div>
        )}
      </div>
    );
  }

  nextClicked() {
    this.props.nextClicked();
    let i = 0;
    this.animation = setInterval(()=>{
      if(i >= 100){
        clearInterval(this.animation );
        this.updateState.bind(this)();
      }else{
        this.setState({left:-1*i++});
      }
    },10);
  }
  prevClicked() {
    this.props.prevClicked();
    let i = 0;
    this.animation = setInterval(()=>{
      if(i >= 100){
        clearInterval(this.animation );
        this.updateState.bind(this)();
      }else{
        this.setState({left:i++});
      }
    },10);
  }
}

export default AsyncCarousel;
