import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';

export const SongElement = ({
  song: { title, artist, id, downloadLink, thumbnail },
}) => {
  const { updateStreams, updateDownloads } = useContext(GlobalContext);
  const [playing, setPlaying] = useState(false);
  const [clicked, setClicked] = useState(false);

  const songPlaying = (e) => {
    const icon = e.target.nextElementSibling;

    icon.classList.remove('fa-spinner');
    icon.classList.add('fa-pause');
    icon.classList.remove('fa-play');
    disableOtherBtns(e.target.id);
  };

  const toggleSongControl = (e, src) => {
    const audio = e.target.previousElementSibling;
    const icon = e.target;

    if (!clicked) {
      // to avoid reloading song when paused and played again
      audio.src = downloadLink;
      setClicked(true);
      updateStreams(id);
    }

    if (!playing) {
      audio.play();
      setPlaying(true);
      icon.classList.remove('fa-play');
      icon.classList.add('fa-spinner');
    } else {
      audio.pause();
      setPlaying(false);
      icon.classList.add('fa-play');
      icon.classList.remove('fa-pause');
      icon.classList.remove('fa-spinner');
      undoDisabledBtns();
    }
  };

  const disableOtherBtns = (id) => {
    const allIcons = document.querySelectorAll('.song-control');

    allIcons.forEach((icon) => {
      if (icon.id !== id) {
        icon.classList.add('disabled');
      }
    });
  };

  const undoDisabledBtns = () => {
    const allIcons = document.querySelectorAll('.song-control');

    allIcons.forEach((icon) => {
      icon.classList.remove('disabled');
    });
  };

  return (
    <li className='song-container'>
      <div className='post-thumbnail'>
        <img src={thumbnail} alt={`${title} img`} className='img'></img>
      </div>
      <div className='song-title'>
        <h3>
          <a href={`/song?song_id=${id}&artist=${artist}`}>
            {title} - {artist}
          </a>
        </h3>
      </div>
      <div className='song-info'>
        <div className='play-song'>
          <audio
            controls={false}
            title='Listen Online'
            onPlaying={songPlaying}
            id={id}
            src=''
          ></audio>
          <i className='fas fa-play' onClick={toggleSongControl}></i>
        </div>
        <div className='download-song' onClick={() => updateDownloads(id)}>
          <a href={downloadLink}>
            <i className='fas fa-download'></i>
          </a>
        </div>
      </div>
    </li>
  );
};
