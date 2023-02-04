import { useState } from 'react'

const Test = () => {
  const [a, seta] = useState(0)
  const [b, setb] = useState(0)

  return (
    <div>
      <input
        type='number'
        value={a}
        onChange={(e) => {
          seta(e.target.value)
        }}
      />
      <input
        type='number'
        value={b}
        onChange={(e) => {
          setb(e.target.value)
        }}
      />
      <button
        onClick={() => {
          clean(Number(a), Number(b))
        }}
      >
        clean
      </button>
    </div>
  )
}

export default Test
