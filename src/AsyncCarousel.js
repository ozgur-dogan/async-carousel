import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./AsyncCarousel.scss";

class AsyncCarousel extends Component {
  static propTypes = {
    currentContent : PropTypes.
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
    const { height } = this.props;
    return (
      <div className="asyncCarousel" style={{ height: height || 100 }}>
        {previousContent && (
          <div className="previousContent" style={{left:(-100+left)+"%"}}>
            {previousContent}
          </div>
        )}
        {currentContent && (
          <div className="currentContent" style={{left:(0+left)+"%"}}>
            {currentContent}
          </div>
        )}
        {nextContent && (
          <div className="nextContent" style={{left:(100+left)+"%"}}>
            {nextContent}
          </div>
        )}
        {previousContent && (
          <div className="prevArrow" onClick={this.prevClicked.bind(this)}>
            {"<"}
          </div>
        )}
        {nextContent && (
          <div className="nextArrow" onClick={this.nextClicked.bind(this)}>
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
