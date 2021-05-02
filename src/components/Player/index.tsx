import { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Reproduzindo agora" />
        <strong>Reproduzindo agora </strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      {episode && (
        <audio
          src={episode.url}
          autoPlay
          ref={audioRef}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
        />
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Faixa Anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Reproduzir" />
            ) : (
              <img src="/play.svg" alt="Reproduzir" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Próxima Faixa" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir Faixa" />
          </button>
        </div>
      </footer>
    </div>
  );
}
