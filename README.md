# audio-player-react

> just a simple audio player similar to wechat audio player

[![NPM](https://img.shields.io/npm/v/audio-player-react.svg)](https://www.npmjs.com/package/audio-player-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save audio-player-react
```
## Preview

<img width="303" src="https://raw.githubusercontent.com/oovui/audio-player-react/master/preview.png"/>

## Usage

```jsx
import React, { Component } from 'react'

import Player from 'audio-player-react'

class Example extends Component {
  render () {
    return (
      <Player 
        url = 'example.mp3'
        title = "你的样子"
        author = "罗大佑" />
    )
  }
}
```

## Props
- ref: get audio player  Instance, can do Dom
- url: the audio player src(mp3), is required
- title: the audio player title
- subtitle: the audio player subtitle
- pauseIcon: the audio player pause icon
- playingIcon: the audio player playing icon

## Events
- playing
- pause

## Methods
- doPlay()
- doPause()
- doPlayPause()


## Bootstrapped with create-react-library.：
https://github.com/transitive-bullshit/create-react-library

## License

MIT © [https://github.com/oovui/audio-player-react](https://github.com/https://github.com/oovui/audio-player-react)
