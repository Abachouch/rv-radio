import React, { useEffect, useState }  from "react";

import {FiPlay} from 'react-icons/fi'

import { RadioStation } from "../types/Station";

export default function(playingNow:RadioStation){

   const [play , setPlay] = useState(false) ;

    useEffect(()=> {


     
    } , [])


    return (
        <div className="h-16  col-span-2 flex items-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-8">
            <button className="mr-6"> <FiPlay></FiPlay> </button>
            <input type="range" min={0} max={100} className="grow "/>
        </div>
    )
}