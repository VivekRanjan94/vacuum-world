const Cell = ({ cell, vacuum }) => {
  return (
    <div
      className={`cell${vacuum ? ' vacuum' : ''}${cell.wall ? ' wall' : ''}${
        !cell.wall && cell.visited ? ' visited' : ''
      }${!cell.wall && cell.current ? ' current' : ''}`}
    >
      {!cell.wall && cell.dirty && <div className='dot'></div>}
    </div>
  )
}

export default Cell
