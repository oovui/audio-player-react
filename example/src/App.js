import React, { Component } from 'react'

import OAudioPlayer from 'audio-player-react'
const mediaUrl = require('./assets/nideyangzi.mp3');
const anthorMediaUrl = require('./assets/sound.mp3');

export default class App extends Component {

  constructor(props){
    super(props);
    this.audioPlayerRef = React.createRef();  
  }
  state = {
    url: ''
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        url: mediaUrl
      })
    }, 800);
  }

  onPlayingHandle() {
    console.log("onPlayingHandle：audio start play")
  }

  onPauseHandle(){
    console.log("onPauseHandle：audio pause")
  }

  doPlay=()=>{
    this.audioPlayerRef.current.audioPlay();
  }

  doPause=()=>{
    this.audioPlayerRef.current.audioPause();
  }

  doPlayAndPause=()=>{
    this.audioPlayerRef.current.audioPlayPause();
  }

  togglePlay=()=>{
    this.setState({
      url: anthorMediaUrl
    },function(){
      this.doPlay();
    })
  }


  render() {
    const { url } = this.state;
    return (
      <div style={{ marginTop: '50px' }}>
        <OAudioPlayer
          ref={ this.audioPlayerRef }
          url={url}
          title="你的样子"
          subtitle="罗大佑"
          onPlaying={this.onPlayingHandle.bind(this)}
          onPause={this.onPauseHandle.bind(this)}
          />
          <button onClick={this.doPlay}> 播放 </button>
          <button onClick={this.doPause}> 暂停 </button>
          <button onClick={this.doPlayAndPause}> 播放和暂停 </button>
          <button onClick={this.togglePlay }> 切歌 </button>
      </div>
    )
  }
}
