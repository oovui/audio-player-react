# audio-player-react

> just a simple audio player based React

[![NPM](https://img.shields.io/npm/v/audio-player-react.svg)](https://www.npmjs.com/package/audio-player-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @oovui/audio-player-react
```
## Preview

<img width="303" src="https://raw.githubusercontent.com/oovui/audio-player-react/master/preview.png"/>

## Simple Usage

> Just `url` props is Required

```jsx
import React, { Component } from 'react'

import OAudioPlayer from '@oovui/audio-player-react'

class App extends Component {
  render () {
    return (
      <OAudioPlayer 
        url = 'example.mp3'
        title = "你的样子"
        author = "罗大佑" />
    )
  }
}
```

## Advance Usage

```jsx
import React, { Component } from 'react'
import OAudioPlayer from '@oovui/audio-player-react'
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
```



## Props

| Name | Type | Description |
| ---- | ---- | ----------- |
| **ref**       | React.createRef() | get audio player  Instance, can do Dom
| **url**       | String | the audio player src(mp3), is `required`
| **title**     | String | the audio player title
| **subtitle**   | String | the audio player subtitle
| **pauseIcon**   | String | the audio player pause icon
| **playingIcon**   | String | the audio player playing icon
| **loop**   | Boolean | default `false`, other value: `true`
| **preload**   | String | default `metadata`, other value: `auto`、`none`
| **autoplay**   | Boolean | default `false`, other value: `auto`、`none`


## Events
- playing
- pause

## Methods
- audioPlay()
- audioPause()
- audioPlayPause()


## Bootstrapped with create-react-library：
https://github.com/transitive-bullshit/create-react-library

## License

MIT © [https://github.com/oovui/audio-player-react](https://github.com/https://github.com/oovui/audio-player-react)
