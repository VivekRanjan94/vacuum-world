import { useState } from 'react'
import { ITERATION_INTERVAL } from './constants'
import { Stack } from './stack'
import { withinBounds, neighbors, idx } from './utils'

const useDFS = (initialVacuumPosition, clean, grid, setVacuumPosition) => {
  const [dfsInterval, setDfsInterval] = useState()
  const [s, setS] = useState(new Stack())

  const iterate = () => {
    if (s.size() === 0) {
      return stop()
    }

    const p = s.pop()
    grid[idx(p.x, p.y)].visited = true
    grid[idx(p.x, p.y)].current = false
    setVacuumPosition({ x: p.x, y: p.y })

    if (grid[idx(p.x, p.y)].dirty) {
      clean(p.x, p.y)
    }

    neighbors(p.x, p.y).forEach(({ x, y }) => {
      if (withinBounds(x, y) && !grid[idx(x, y)].visited) {
        grid[idx(x, y)].current = true
        s.push({ x, y })
      }
    })
  }

  const dfs = () => {
    s.push(initialVacuumPosition)
    const i = setInterval(iterate, ITERATION_INTERVAL)
    setDfsInterval(i)
  }

  function start() {
    const i = setInterval(iterate, ITERATION_INTERVAL)
    setDfsInterval(i)
  }

  function stop() {
    clearInterval(dfsInterval)
    setDfsInterval(null)
  }

  const reset = () => {
    stop()
    setS(new Stack())
  }

  return { dfs, stop, start, reset }
}

export default useDFS
