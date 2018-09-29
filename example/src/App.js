import React, { Component } from 'react'

import OAudioPlayer from 'audio-player-react'
const mediaUrl = require('./assets//dahaoheshan.mp3');

export default class App extends Component {

  constructor(props){
    super(props);
    this.audioPlayerRef = React.createRef();  //this.audioPlayerRef.current;
  }
  state = {
    url: ''
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        url: mediaUrl
      })
    }, 2000);

    console.log( this.audioPlayerRef.current.duration );

    

  }

  onPlayingHandle() {
    console.log("父组件, 开始播放， onPlayingHandle ")
  }

  onPauseHandle(){
    console.log("父组件, 暂停播放， onPauseHandle ")
  }

  doPlay=()=>{
    console.log("控制播放或暂停");
    this.audioPlayerRef.current.audioPlayPause();
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
          ></OAudioPlayer>

          <button onClick={this.doPlay}> 播放或暂停播放 </button>
      </div>
    )
  }
}
