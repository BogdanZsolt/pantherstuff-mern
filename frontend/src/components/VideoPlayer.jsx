import { useEffect, useRef, useState } from 'react';
import SliderRange from './SliderRange.jsx';
import ReactPlayer from 'react-player';
import { Button } from 'react-bootstrap';
import { MdPause, MdOutlinePlayArrow } from 'react-icons/md';

import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { GoMute, GoUnmute } from 'react-icons/go';
import { CgMinimize, CgMaximize } from 'react-icons/cg';
import { convertSecondstoTime } from '../utils/converter.js';

const VideoPlayer = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.maxTouchPoints > 0
      );
    };

    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeOutRef = useRef(null);

  const playAndPauseHandler = () => {
    setPlaying(!playing);
  };

  const toggleMuteHandler = () => {
    setMuted(!muted);
  };

  const seekChangeHandler = (e) => {
    setPlayed(e.target.value * 0.01);
    setSeeking(true);
  };

  // const seekMouseUpHandler = () => {
  //   setSeeking(false);
  //   playerRef.current?.seekTo(played);
  // };

  const rewindHandler = () => {
    playerRef.current?.seekTo(
      playerRef?.current?.getCurrentTime() - 10,
      'seconds'
    );
  };

  const forwardHandler = () => {
    playerRef.current?.seekTo(
      playerRef?.current?.getCurrentTime() + 10,
      'seconds'
    );
  };

  const progressHandler = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  // const playedHandler = (e) => {
  //   let value = e.target.value * 0.01;
  //   console.log(value);
  //   setPlayed(value);
  // };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value * 0.01);
  };

  const fullScreenHandler = () => {
    if (!isFullScreen) {
      playerContainerRef?.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  };

  const mouseMoveHandler = () => {
    setShowControls(true);
    clearTimeout(controlsTimeOutRef.current);
    controlsTimeOutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <div
      ref={playerContainerRef}
      className={`video-player-container ${isFullScreen ? 'fullscr' : ''}`}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className="video-player"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={progressHandler}
        controls={isTouchDevice}
      />
      {showControls && !isTouchDevice && (
        <div
          className="video-player-controls"
          style={{
            '--bs-text-opacity': showControls ? '1' : '0',
          }}
        >
          <SliderRange
            value={100 * played}
            min={0}
            max={100}
            step={1}
            onChange={seekChangeHandler}
          />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center ms-2">
              <Button
                variant="secondary"
                size="md"
                onClick={playAndPauseHandler}
              >
                {playing ? <MdPause className="" /> : <MdOutlinePlayArrow />}
              </Button>
              <Button variant="secondary" size="md" onClick={rewindHandler}>
                {<BsArrowCounterclockwise />}
              </Button>
              <Button variant="secondary" size="md" onClick={forwardHandler}>
                {<BsArrowClockwise />}
              </Button>
              <Button variant="secondary" size="md" onClick={toggleMuteHandler}>
                {muted ? <GoMute className="" /> : <GoUnmute />}
              </Button>
              <SliderRange
                value={volume * 100}
                max={100}
                min={0}
                step={1}
                onChange={volumeChangeHandler}
                style={{ width: '100px' }}
              />
            </div>
            <div className="d-flex align-items-center ms-2">
              <div className="text-primary me-1">
                {convertSecondstoTime(
                  played * playerRef?.current?.getDuration() || 0
                )}
                /{convertSecondstoTime(playerRef?.current?.getDuration() || 0)}
              </div>
              <Button variant="secondary" size="md" onClick={fullScreenHandler}>
                {isFullScreen ? <CgMinimize /> : <CgMaximize className="" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
