import { useState } from 'react'
import Grid from './Grid'
import useBFS from './util/useBFS'
import useDFS from './util/useDFS'
import { Cell, generateGrid, randomVacuumPosition } from './util/utils'

const initialGrid = generateGrid()
const initialVacuumPosition = randomVacuumPosition(initialGrid)

const App = () => {
  const [grid, setGrid] = useState(initialGrid)
  const [gridCopy, setGridCopy] = useState(initialGrid)
  const [vacuumPosition, setVacuumPosition] = useState(initialVacuumPosition)
  const { bfs, reset: bfsReset } = useBFS(
    vacuumPosition,
    clean,
    grid,
    setVacuumPosition
  )
  const { dfs, reset: dfsReset } = useDFS(
    vacuumPosition,
    clean,
    grid,
    setVacuumPosition
  )

  function clean(x, y) {
    setGrid((grid) => {
      return grid.map((cell) => {
        if (cell.x === x && cell.y === y) {
          return new Cell({
            x,
            y,
            dirty: false,
            wall: cell.wall,
            visited: cell.visited,
          })
        }
        return cell
      })
    })
  }

  const randomize = () => {
    const g = generateGrid()

    setGrid([...g])
    setGridCopy([...g])
    setVacuumPosition(randomVacuumPosition(g))
  }

  const reset = () => {
    bfsReset()
    dfsReset()
    setGrid(
      gridCopy.map((cell) => {
        return { ...cell, visited: cell.wall }
      })
    )
    setVacuumPosition(initialVacuumPosition)
  }

  return (
    <div className='app'>
      <Grid grid={grid} vacuumPosition={vacuumPosition} />
      <button
        onClick={() => {
          randomize()
        }}
      >
        Randomize
      </button>
      <button
        onClick={() => {
          reset()
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          bfs()
        }}
      >
        BFS
      </button>
      <button
        onClick={() => {
          dfs()
        }}
      >
        DFS
      </button>
    </div>
  )
}

export default App
