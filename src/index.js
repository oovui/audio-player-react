import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.scss';
import Util from './Util.js';

// 返回image 对象<img src="">
import dPauseIcon from './images/pause.png';
import dPlayIcon from './images/playing.gif';
import { ECANCELED } from 'constants';


export default class OAudioPlayer extends Component {

  constructor(props) {
    super(props);
    this.audioPlayerRef = React.createRef();  //this.audioPlayerRef.current;
    this.progressBarDetailRef = React.createRef();
  }

  static defaultProps = {
    onPlaying: () => { },
    onPause: () => { },
    loop: false,
    preload:'metadata',
    pauseIcon: dPauseIcon.src,
    playingIcon: dPlayIcon.src,
  }

  static propTypes = {
    autoplay: PropTypes.bool, // 是否自动播放
    loop: PropTypes.bool,     // 是否循环播放
    muted: PropTypes.bool,    // 是否静音，默认为false，表示有声音

    // autoplay 属性优先于 preload 假如用户想自动播放视频，那么很明显浏览器需要下载视频。
    preload: PropTypes.string, // 加载方式 none 不缓存，metadata 获取元数据 (例如音频长度) auto 预加载
    volume: PropTypes.string,  //音频播放的音量。值从0.0 (无声) 到 1.0 (最大声).
    url: PropTypes.string,     //src属性，可用source标签替代

    title: PropTypes.string,
    subtitle: PropTypes.string,
    pauseIcon:PropTypes.string,
    playingIcon:PropTypes.string,
    // 事件
    onPlaying: PropTypes.func,  // 在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始）
    onPause: PropTypes.func     // 当音频/视频已暂停时
    
  }

  state = {
    currentTime:"00:00",
    duration:"00:00",
    currentTimeNum:0,
    durationNum:1, // 0 不能为除数，故设为1
    bufferedPercent:0,
    playSrc: dPauseIcon.src
  }

  componentDidMount() {
    console.log("componentDidMount:duration:"+ this.audioPlayerRef.current.duration);

    /******* TODO，进度条拖动
    dragPoint.addEventListener('touchstart', (e) => this.dragStart(e), false);
    dragPoint.addEventListener('touchmove', (e) => this.dragMove(e), false);
    dragPoint.addEventListener('touchend', (e) => this.dragEnd(e), false);
    //拖动开始时，可以暂停播放。拖动时计算currentTime。拖动结束继续播放,注意暂停和继续播放时间不能太短，否则报错
    */

  }


  // 播放或暂停
  audioPlayPause = () => {
    const self = this.audioPlayerRef.current;
    console.log("duration:" + self.duration);
    if (self.paused) {
      console.log("play()");
      self.play();
    } else {
      console.log("pause()");
      self.pause();
    }
  }

  // 播放
  audioPlay(){
    const self = this.audioPlayerRef.current;
    self.play();
  }

  // 暂停
  audioPause(){
    const self = this.audioPlayerRef.current;
    self.pause();
  }

  // 音频可以播放时，此时可以获取到视频的时长
  canplayHandle = ()=>{
    this.setState({
      durationNum:this.audioPlayerRef.current.duration,
      duration: Util.timeFormat(this.audioPlayerRef.current.duration)
    })
  }

  // currentTime 当前播放位置（以秒计）变化时触发
  timeUpdateHandle = ()=>{
    let audioPlayer = this.audioPlayerRef.current;
    let ct = audioPlayer.currentTime;
    let dt = audioPlayer.duration;
    if(ct<=dt){
      this.setState({
        currentTimeNum: ct,
        currentTime: Util.timeFormat(ct)
      })
    }

    // 动态
    if(audioPlayer.paused){
      this.setState({
        playSrc:this.props.pauseIcon
      })
    }else{
      this.setState({
        playSrc:this.props.playingIcon
      })
    }
    
  }

  progressBarClickHandle = (e)=>{
    const ev = e.nativeEvent;
    const offset = ev.layerX || ev.offsetX;
    const progressBarDetail = this.progressBarDetailRef.current;
    const barWidth = progressBarDetail.offsetWidth;
    let curTime = offset/barWidth * this.state.durationNum;
    this.setState({
      currentTimeNum: curTime,
      currentTime: Util.timeFormat(curTime)
    })
    // 设置当前播放时间
    this.audioPlayerRef.current.currentTime  = curTime;

  }

  render() {
    const {
      url, title, subtitle, loop, onPlaying, onPause,preload,
    } = this.props
    const {
       duration,currentTime,durationNum,currentTimeNum,bufferedPercent,playSrc
    } = this.state;
    return (
      <div className="audio-player-wrap">
        <audio className="wx-audio-content"
          ref={this.audioPlayerRef}
          preload = {preload}
          onPlaying={onPlaying}
          onPause={onPause}
          onCanPlay = { this.canplayHandle }
          onTimeUpdate = { this.timeUpdateHandle}
          src={url}
          loop = {loop}>
          
        </audio>
        <div className="player-body">
          <div className="body-left">
            <img onClick={this.audioPlayPause} className="wx-audio-state" src={ playSrc } />
          </div>
          <div className="body-right">
            <p className="audio-title">{title}</p>
            <p className="audio-subtitle">{subtitle}</p>
            <div className="audio-progress-bar-wrap">
              <div className="progress-bar-detail"
                 onClick={this.progressBarClickHandle }
                 ref={this.progressBarDetailRef}>
                 {/* progress-bar-buffer: 缓冲进度条，progress-bar-current 播放进度条，progress-bar-loading 加载进度条 */}
                <div className="progress-bar-buffer" style={{ width: bufferedPercent + '%' }}></div>
                <div className="progress-bar-current" style={{ width: `calc((${currentTimeNum}/${durationNum})*100%)` }}></div>
                <span className="progress-bar-loading">
                  <span className="loading-line"></span>
                </span>
              </div>
              <div className="progress-bar-drag-point" style={{left: `calc((${currentTimeNum}/${durationNum})*100%)` }}></div>
            </div>
            <div className="audio-time-and-controls">
              <span className="current-time">{ currentTime }</span>
              <span className="duration-time">{ duration }</span>
            </div>
          </div>
        </div>
        <div className="player-list">
          {/* 暂未实现 */}
        </div>
      </div>
    )
  }
}
