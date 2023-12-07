import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [disabled, setDisabled] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [start, setStart] = useState('start')
  const [minutes, setMinutes] = useState<string>('15')
  const [seconds, setSeconds] = useState<string>('00')
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const isDisable = () => {
    return disabled
  }
  const startTimer = () => {  
    const parsedMinutes = parseInt(minutes, 10)
    const parsedSeconds = parseInt(seconds, 10)
    console.log(seconds)
    if(parsedMinutes > 99 && parsedSeconds > 60) {
      setDisabled(false)
      setStart('start')
      clearInterval(intervalId!)
      setIntervalId(null)
    } else if(parsedSeconds > 60 && parsedMinutes < 99) {
      setMinutes(`${parsedMinutes + 1}`) 
      setSeconds(`${parsedSeconds - 60}`)
    } else if(parsedMinutes === 0) {
      if(parsedSeconds > 10) {
        setSeconds(`${parsedSeconds - 1}`)
      } else if(parsedSeconds > 0) {
        setSeconds(`0${parsedSeconds - 1}`)
      } else if(parsedSeconds === 0) {
        setStart('start')
        setDisabled(false)
        setIsRunning(false)
        clearInterval(intervalId!)
        setIntervalId(null)
      }
    } else if(parsedMinutes > 0) {
      if(parsedMinutes > 10) {
        if(parsedSeconds > 10) {
          setSeconds(`${parsedSeconds - 1}`)
        } else if(parsedSeconds > 0) {
          setSeconds(`0${parsedSeconds - 1}`)
        } else if(parsedSeconds === 0) {
          setMinutes(`${parsedMinutes - 1}`)
          setSeconds('59')
        }
      } else if (parsedMinutes > 0) {
        if(parsedMinutes === 10 && parsedSeconds > 10) {
          setMinutes(`${parsedMinutes}`)
          setSeconds(`${parsedSeconds - 1}`)
        } else if (parsedMinutes === 10 && parsedSeconds > 0) {
          setMinutes(`${parsedMinutes}`)
          setSeconds(`0${parsedSeconds - 1}`)
        } else if(parsedSeconds > 10) {
          setMinutes(`0${parsedMinutes}`)
          setSeconds(`${parsedSeconds - 1}`)
        } else if(parsedSeconds > 0) {
          setMinutes(`0${parsedMinutes}`)
          setSeconds(`0${parsedSeconds - 1}`)
        } else if(parsedSeconds === 0 && parsedMinutes === 10) {
          setMinutes(`0${parsedMinutes - 1}`)
          setSeconds('59')
        } else if(parsedSeconds === 0) {
          setMinutes(`0${parsedMinutes - 1}`)
          setSeconds(`59`)
        }
      }
    }
  }
  useEffect(() => {
    clearInterval(intervalId!)
    if(isRunning) {
      setIntervalId(setInterval(startTimer, 1000))
    }
    return () => clearInterval(intervalId!)
  }, [minutes, seconds, isRunning])

  const handleClick = () => {
    if(start === 'start') {
      setStart('pause')
      setDisabled(true)
      setIsRunning(true)
    } else {
      setStart('start')
      setDisabled(false)
      setIsRunning(false)
      clearInterval(intervalId!)
      setIntervalId(null)
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="ring">
          <svg width="518" height="518" viewBox="0 0 518 518">
            <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
          </svg>
        </div>

        <div className="timer">
          <div className="time">
            <div className="minutes">
              <input type="text" value={minutes} disabled={isDisable()} onChange={(e) => { 
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                    setMinutes(value)
                  }
              }
            }/>
            </div>
            <div className="colon">:</div>
            <div className="seconds">
              <input type="text" value={seconds} disabled={isDisable()} onChange={(e) => { 
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                    setSeconds(value)
                  }
              }
            }/>
            </div>
          </div>
          <button className="start" onClick={handleClick}>{start}</button>
          <button className="settings">
            <img src="images/gear.svg" alt="Settings" />
          </button>
        </div>
      </div>
    </>
  )
}

export default App
