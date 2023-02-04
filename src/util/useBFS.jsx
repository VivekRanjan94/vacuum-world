import { useState } from 'react'
import { ITERATION_INTERVAL } from './constants'
import { Queue } from './queue'
import { withinBounds, neighbors, idx } from './utils'

const useBFS = (initialVacuumPosition, clean, grid, setVacuumPosition) => {
  const [bfsInterval, setBfsInterval] = useState()
  const [q, setQ] = useState(new Queue())

  const iterate = () => {
    if (q.size() === 0) {
      return stop()
    }

    const p = q.dequeue()
    grid[idx(p.x, p.y)].visited = true
    grid[idx(p.x, p.y)].current = false
    setVacuumPosition({ x: p.x, y: p.y })

    if (grid[idx(p.x, p.y)].dirty) {
      clean(p.x, p.y)
    }

    neighbors(p.x, p.y).forEach(({ x, y }) => {
      if (withinBounds(x, y) && !grid[idx(x, y)].visited) {
        grid[idx(x, y)].current = true
        q.enqueue({ x, y })
      }
    })
  }

  const bfs = () => {
    q.enqueue(initialVacuumPosition)
    const i = setInterval(iterate, ITERATION_INTERVAL)
    setBfsInterval(i)
  }

  function start() {
    const i = setInterval(iterate, ITERATION_INTERVAL)
    setBfsInterval(i)
  }

  function stop() {
    clearInterval(bfsInterval)
    setBfsInterval(null)
  }

  const reset = () => {
    stop()
    setQ(new Queue())
  }

  return { bfs, stop, start, reset }
}

export default useBFS
