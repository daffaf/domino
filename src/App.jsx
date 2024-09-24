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
      <div className='grid grid-cols-3 w-full gap-5'>
        {grid}
      </div>
    );
  }

  console.log(totalNumber)

  useEffect(() => {
    setDoubleNumber(countDoubleNumber(data))
  }, [data])
  return (
    <section className='p-3 w-full flex flex-row h-screen items-center justify-center'>
      <div className='space-y-5 flex flex-col w-1/2 h-fit justify-center  border p-3'>
        <div className='font-semibold text-3xl'>DOMINOES</div>
        <div className='p-3 bg-gray-100  rounded-md'>
          <p className='font-semibold'>Source</p>
          <p>{JSON.stringify(dominoes)}</p>
        </div>
        <div className='p-3 bg-gray-100 rounded-md'>
          <p className='font-semibold'>Double Number</p>
          <p>{doubleNumber}</p>
        </div>
        <div className='flex flex-row gap-3 justify-evenly w-full'>
          {
            data.map((domino) => {
              return (
                <div className='border border-black w-fit p-3 rounded-md'>
                  <p>{domino[0]}</p>

                  <p>-</p>
                  <p>{domino[1]}</p>
                </div>
                // <div className='border p-3'>
                //   {renderDots(domino[0])}
                //   <div className='border-b-2 w-full my-5 border-black'></div>
                //   {renderDots(domino[1])}
                // </div>
              )
            })
          }
        </div>
        <div className='flex flex-row gap-2'>
          {
            button.map((button) => {
              return (
                <button className='p-1 px-2 bg-blue-500 rounded-md text-white cursor-pointer' onClick={button.function}>{button.title}</button>
              )
            })
          }
        </div>
        <div className='w-1/2 space-y-3'>
          <input
            type='number'
            name='input-number'
            className='border rounded-md px-3 py-1 w-full'
            onChange={(event) => setTotalNumber(parseInt(event.target.value))}
            value={totalNumber}
          />
          <button
            className='p-1 px-2 bg-blue-500 rounded-md text-white'
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
