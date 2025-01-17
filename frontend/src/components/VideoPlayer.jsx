import { useRef, useState } from 'react';
import SliderRange from './SliderRange.jsx';
import ReactPlayer from 'react-player';
import { Button } from 'react-bootstrap';
import {
  MdPause,
  MdOutlinePlayArrow,
  MdOutlineFastRewind,
  MdOutlineFastForward,
} from 'react-icons/md';
import { GoMute, GoUnmute } from 'react-icons/go';

const VideoPlayer = ({ width = '100%', height = '100%', url }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeOutRef = useRef(null);

  const playAndPauseHandler = () => {
    setPlaying(!playing);
  };

  const toggleMuteHandler = () => {
    setMuted(!muted);
  };

  const rewindHandler = () => {};

  const forwardHandler = () => {};

  const progressHandler = () => {};

  const playedHandler = (e) => {
    let value = e.target.value * 0.01;
    console.log(value);
    setPlayed(value);
  };

  return (
    <div
      ref={playerContainerRef}
      className={`position-relative bg-primary rounded-3 overflow-hidden shadow ${
        isFullScreen && 'vw-100 vh-100'
      }`}
      style={{
        transition: 'all 0.3s easy-in-out',
        width,
        height,
      }}
    >
      <ReactPlayer
        ref={playerRef}
        className={`position-absolute top-0 left-0`}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={progressHandler}
      />
      {showControls && (
        <div
          className={`position-absolute bottom-0 left-0 right-0 bg-dark p-4 bg-opacity-75 w-100`}
          style={{
            transition: 'opacity 0.3s',
            '--bs-text-opacity': showControls ? '1' : '0',
          }}
        >
          <SliderRange
            value={100 * played}
            min={0}
            max={100}
            step={0.1}
            onChange={playedHandler}
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
                {<MdOutlineFastRewind />}
              </Button>
              <Button variant="secondary" size="md" onClick={forwardHandler}>
                {<MdOutlineFastForward />}
              </Button>
              <Button variant="secondary" size="md" onClick={toggleMuteHandler}>
                {muted ? <GoMute className="" /> : <GoUnmute />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
