import  { useEffect, useRef, useState } from "react";
import { RadioStation } from "../types/Station";
import { FiCopy , FiPause, FiPlay, FiVolume2 } from "react-icons/fi";



export default function (currentStation: RadioStation) {

    const audiPlayer = useRef<HTMLAudioElement>(document.createElement('audio'))
    const [isPlaying , setIsPlaying] = useState(false)
    const [volume , setVolume] = useState(0.5)

    useEffect(()=> {

        if(audiPlayer.current)

        if(currentStation.url !== ''){
            setIsPlaying(true)
            audiPlayer.current.src = currentStation.url ;
            audiPlayer.current.play() ;
        }
        return ()=> {
            audiPlayer.current.src = ''
        }

    } , [currentStation])

    currentStation
    return (currentStation.url) ? (
        <div className="flex md:flex-col flex-row gap-4 p-6">
            <audio id="audioPlayer" src= {currentStation.url}></audio>
            <img id="icon" className="w-32 h-32 object-contain m-auto" src={currentStation.favicon} alt="station data" onError={(e) => {
                e.currentTarget.src = "./public/default_favicon.webp"
            }} />
            <div className="flex-grow md:flex-grow-0">
                <h2 className="text-white font-bold text-lg mt-6 break-all"> {currentStation.name} Hit Radio </h2>

                <div className="bg-slate-800 p-2 m-2 flex items-center max-w-fit gap-x-4 rounded-md">

                    <div className="group flex items-center">
                        <button className="mx-2 text-white"> <FiVolume2 /></button>
                        <input className=" w-0 opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all " type="range" step={0.01} min={0} max={1} value={volume} onChange={(e)=>{
                            const vol = parseFloat(e.currentTarget.value)  ;
                            setVolume(vol)
                            audiPlayer.current.volume = vol
                        } }/>
                    </div>
                    
                    
                    
                     
                    <button className="mx-2 text-white" onClick={()=> {
                        setIsPlaying( !isPlaying)
                        if(isPlaying){
                            audiPlayer.current.pause() ;
                        }
                        else{
                            audiPlayer.current.play()
                        }
                    }} > { (isPlaying)? <FiPause /> : <FiPlay />   }  </button>

                    <button className="mx-2 text-white" title="copy stream url" onClick={
                        ()=> {
                            navigator.clipboard.writeText(currentStation.url)
                        }
                    }> <FiCopy /> </button>
                </div>

                <p className="text-gray-500 font-lign text-sm mt-1  break-all" > {currentStation.tags.split(',').slice(0 , 3).join(', ')} </p>
                <div className="text-gray-500 font-lign text-sm mt-1 flex items-center gap-x-2" >
                    <img
                        src={`https://flagcdn.com/h20/${currentStation.countrycode.toLocaleLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/h40/${currentStation.countrycode.toLocaleLowerCase()}.png 2x,https://flagcdn.com/h60/${currentStation.countrycode.toLocaleLowerCase()}.png 3x`}
                        className="h-3"
                        alt={currentStation.country} />
                    <span className="break-words">
                        {currentStation.country}

                    </span>
                </div>
                <a className="text-gray-500 font-light text-sm underline" href={currentStation.homePage} > home page </a>


            </div>

        </div>

    ) : (
        <div className="text-white flex flex-col items-center justify-center  text-center">
            <h1 className="text-4xl font-bold py-4">Just un other web radio</h1>
            <p className="py-4 ">built using react + vite and tailwind by <a className="underline" href="https://abachouch.github.io/">Abachouch Youssouf</a></p>
            <p>api is provided for free by
                <a className="px-2 underline" href="https://www.radio-browser.info/"> Radio-browser</a>
            </p>
        </div>
    )


}