import { useEffect, useState } from 'react'
import './globals.css'
import { countDoubleNumber, flipDomino, removeDup, removeDataByTotal, sort, sortDesc } from './utils'

function App() {
  const dominoes = [
    [6, 1], [4, 3], [5, 1], [3, 4], [1, 1], [3, 4], [1, 2]
  ]

  const [data, setData] = useState([...dominoes])
  const [doubleNumber, setDoubleNumber] = useState(0)
  const [totalNumber, setTotalNumber] = useState(0)
  const [isFalse, setIsFalse] = useState(false)
  const button = [
    { title: "Sort(ASC)", function: () => setData(sort([...data])) },
    { title: "Sort(DESC)", function: () => setData(sortDesc([...data])) },
    { title: "Flip", function: () => setData(flipDomino([...data])) },
    { title: "Remove Dup", function: () => setData(removeDup([...data])) },
    { title: "Reset", function: () => { setData([...dominoes]) } },
  ]

  const handleHiddenBtn = () => {
    setIsFalse(!isFalse)
  }
  const removeByTotal = () => {
    const result = removeDataByTotal([...data], totalNumber)
    setData(result)
  }
  /* 
  1. first pakek layout manual array
  2. loop dengan 9 (karena butuh grid 3x3) untuk batasi bg transparant
  3. kasih kondisi jika i sesuai dengan layout terus kasih bg sisanya transparant
  4. dah tinggal render
  */
  const renderDots = (value) => {
    const dotsLayout = {
      1: [5],
      2: [4, 6],
      3: [2, 5, 8],
      4: [1, 3, 7, 9],
      5: [1, 3, 5, 7, 9],
      6: [1, 3, 4, 6, 7, 9]
    }
    const dots = dotsLayout[value]
    const grid = []

    for (let i = 1; i <= 9; i++) {
      grid.push(
        <div key={i} className={`w-2 h-2 ${dots.includes(i) ? 'bg-blue-500' : 'bg-transparent'} rounded-full`}></div>
      )
    }
    return (
      <div className='grid w-full grid-cols-3 gap-5'>
        {grid}
      </div>
    );
  }

  console.log(totalNumber)

  useEffect(() => {
    setDoubleNumber(countDoubleNumber(data))
  }, [data])
  return (
    <section className='flex flex-row items-center justify-center w-full h-screen p-3'>
      <div className='flex flex-col justify-center w-1/2 p-3 space-y-5 border h-fit'>
        <div className='text-3xl font-semibold'>DOMINOES</div>
        <div className='gap-3 p-2 border rounded-md w-28' onClick={handleHiddenBtn}>
          <div className={` flex flex-row items-center gap-3 px-3 border rounded-full cursor-pointer`}>
            <div className={`w-5 h-5 bg-blue-500 rounded-full ${isFalse ? 'translate-x-12 duration-200' : 'translate-x-0 duration-200'}`} ></div>
            <p className={`text-sm ${isFalse ? '-translate-x-7 duration-200' : 'translate-x-2 duration-200'}`}>{isFalse ? 'Card' : 'Text'}</p>
          </div>
        </div>
        <div className='p-3 bg-gray-100 rounded-md'>
          <p className='font-semibold'>Source</p>
          <p>{JSON.stringify(dominoes)}</p>
        </div>
        <div className='p-3 bg-gray-100 rounded-md'>
          <p className='font-semibold'>Double Number</p>
          <p>{doubleNumber}</p>
        </div>
        <div className='flex flex-row w-full gap-3 justify-evenly'>
          {
            data.map((domino) => {

              return (
                <div className='p-3 border border-black rounded-md w-fit'>
                  {isFalse ? renderDots(domino[0]) : domino[0]}
                  <div className='w-full my-5 border-b-2 border-black'></div>
                  <p>{isFalse ? renderDots(domino[1]) : domino[1]}</p>
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-row gap-2'>
          {
            button.map((button) => {
              return (
                <button className='p-1 px-2 text-white bg-blue-500 rounded-md cursor-pointer' onClick={button.function}>{button.title}</button>
              )
            })
          }
        </div>
        <div className='w-1/2 space-y-3'>
          <input
            type='number'
            name='input-number'
            className='w-full px-3 py-1 border rounded-md'
            onChange={(event) => setTotalNumber(parseInt(event.target.value))}
            value={totalNumber}
          />
          <button
            className='p-1 px-2 text-white bg-blue-500 rounded-md'
            onClick={removeByTotal}
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  )
}

export default App
