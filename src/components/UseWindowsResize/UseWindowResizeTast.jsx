import React from 'react'
import UseWindowResize from './UseWindowResize'
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const UseWindowResizeTast = () => {
    const { width, height } = UseWindowResize();
    
    return (
        <div className='w-screen h-screen flex justify-center items-center' >
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-auto mt-10">
            <p className="text-white text-xl mb-4 font-semibold">
                Width: <span className="font-bold text-yellow-300">{width}px</span>
            </p>
            <p className="text-white text-xl mb-6 font-semibold">
                Height: <span className="font-bold text-yellow-300">{height}px</span>
            </p>
            <div className="flex justify-center space-x-6 mb-6">
                <a href="https://github.com/developer-khadim" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transform hover:scale-125 transition-all duration-300">
                    <FaGithub size={30} className="filter drop-shadow-lg cursor-pointer " />
                </a>
                <a href="https://www.linkedin.com/in/khadim-ali12/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transform hover:scale-125 transition-all duration-300">
                    <FaLinkedin size={30} className="filter drop-shadow-lg cursor-pointer " />
                </a>
            </div> 
            <p className=" pointer-events-none  text-center text-white text-lg font-medium italic">
                Please like and follow on GitHub & LinkedIn.
            </p>
        </div>
        </div>
    )
}

export default UseWindowResizeTast