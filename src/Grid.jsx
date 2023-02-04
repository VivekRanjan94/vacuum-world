import React from 'react'
import Cell from './Cell'

const Grid = ({ grid, vacuumPosition }) => {
  return (
    <div className='grid'>
      {grid.map((cell, idx) => {
        return (
          <Cell
            vacuum={vacuumPosition.x === cell.x && vacuumPosition.y === cell.y}
            key={`grid-${idx}`}
            cell={cell}
          />
        )
      })}
    </div>
  )
}

export default Grid
