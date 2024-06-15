import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DashBoard from './Components/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      {/* Fixed Header */}
      <div
        style={{ backgroundColor: '#222831' }}
        className="fixed top-0 left-0 w-full bg-blue-400 flex justify-between items-center px-10 py-2 text-3xl z-10">
        <div className="text-white">
          <h1>Week 3</h1>
        </div>
        <button>
          <div>
            <span className="material-symbols-outlined text-4xl">
              account_circle
            </span>
          </div>
        </button>
      </div>

      <div className="flex">
        <div
          style={{ backgroundColor: '#222831' }}
          className="fixed top-0 text-white w-64 h-screen overflow-y-auto mt-14"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold">Sidebar</h2>
            <ul className="mt-6">
              <li className="py-2"><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li className="py-2"><a href="#" className="text-gray-300 hover:text-white">Find Recipe</a></li>
              <li className="py-2"><a href="#" className="text-gray-300 hover:text-white">By Letter</a></li>
              <li className="py-2"><a href="#" className="text-gray-300 hover:text-white">By ingredients</a></li>
            </ul>
          </div>
        </div>


        <div className="flex-1 ml-64 p-10 pl-20 mt-10">
          <DashBoard />
        </div>
      </div>
    </div>
  )
}

export default App
