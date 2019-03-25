import { useEffect, useState } from 'react'

const Timer = ({ children, startDate, endDate }) => {
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  const pad = val => (val < 10 ? `0${val}` : val)
  const getTimeFromDistance = distance => {
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return { minutes, seconds }
  }

  useEffect(() => {
    const startTime = new Date(startDate).getTime()

    if (endDate) {
      const endTime = new Date(endDate).getTime()
      const distance = endTime - startTime
      const { minutes, seconds } = getTimeFromDistance(distance)
      setMinutes(pad(minutes))
      setSeconds(pad(seconds))
      return
    }

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = now - startTime
      const { minutes, seconds } = getTimeFromDistance(distance)
      setMinutes(pad(minutes))
      setSeconds(pad(seconds))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return !!minutes && !!seconds && children(minutes, seconds)
}

export default Timer
