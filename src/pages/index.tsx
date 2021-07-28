import Head from 'next/head';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from '../styles/pages/Home.module.scss';

interface HomeProps {
  hours: number;
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export default function Home({}: HomeProps) {
  let countdownTimeout: NodeJS.Timeout;


  const [time, setTime] = useState(90 * 60);
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60 % 60);
  const seconds = time % 60;

  const [hoursLeft, hoursRight] = String(hours).padStart(2, '0').split('');
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  } 

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(90 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      new Audio('/notification.mp3').play();
      new Notification('Tempo encerrado! 🚀');
      toast('Acabou o seu tempo', {
        icon: '🕐',
      });
    }
  }, [isActive, time])

  return (
    <>
      <Head>
        <title>Temporizer | Home</title>
      </Head>
      <section className={styles.container} >
        <div className={styles.countdownContainer} >
          <div>
            <span>{hoursLeft}</span>
            <span>{hoursRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>  
          <span>:</span>
          <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
          </div>
        </div>
        { hasFinished ? (
          <button
            type="button"
            onClick={resetCountdown}
          >
            Tempo encerrado
          </button>  
        ) : (
          <>
          {isActive ? (
            <button
              type="button"
              onClick={resetCountdown}
            >
              Encerrar temporizer
            </button>
          ) : (
            <button
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Clique para começar
            </button>
            )}
            </>
        ) }
        
      </section>
    </>
  )
}
