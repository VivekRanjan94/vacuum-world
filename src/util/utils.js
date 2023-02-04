import { GRID_SIZE } from './constants'

export const withinBounds = (x, y) => {
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    return true
  }
  return false
}

export const neighbors = (x, y) => {
  return [
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y - 1 },
    { x: x, y: y + 1 },
  ]
}

export const generateArray = (value, size = GRID_SIZE) => {
  return Array.apply(null, Array(size * size)).map((_, idx) => {
    return value
  })
}

export const generateGrid = () => {
  return generateArray().map((_, idx) => {
    const isWall = boolRandom()
    return new Cell({
      x: idx % GRID_SIZE,
      y: parseInt(idx / GRID_SIZE),
      dirty: boolRandom(),
      wall: isWall,
      visited: isWall,
    })
  })
}

export class Cell {
  constructor({ x, y, dirty = false, wall = false, visited }) {
    this.x = x
    this.y = y
    this.dirty = dirty
    this.wall = wall
    this.visited = visited
    this.current = false
  }
}

export const idx = (x, y) => {
  return GRID_SIZE * y + x
}

export const random = (min = 1, max = GRID_SIZE - 1) => {
  return Math.floor(Math.random() * max + min)
}

export const boolRandom = () => {
  return Math.random() > 0.5
}

const randomPosition = () => {
  return { x: random(), y: random() }
}

export const randomVacuumPosition = (grid) => {
  let p = randomPosition()
  while (grid[idx(p.x, p.y)].wall) {
    p = randomPosition()
  }

  return p
}
