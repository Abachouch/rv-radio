import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";


export default function ({ onSelectTag , show , onCloseModal }: { onSelectTag : Function , show : boolean  , onCloseModal : Function}) {

    const allTags = useRef<Tag[] >([])

    const [FilteredTags, setFilteredTags] = useState<Tag[]>([])
    const [searchQuery , setSearchQuery] = useState('') ;

    const fetchTags = async () => {
        const response =  await fetch('https://de1.api.radio-browser.info/json/tags?limit=100')
        const  data = await  response.json()
        allTags.current = data ;
       
        setFilteredTags(data) ;
        return data
    }

    useEffect(() => {
        fetchTags()
    }, [allTags])

    return (
        <dialog   className= {`top-8 right-8 left-8 bottom-8 flex-col max-h-screen h-auto w-auto rounded-md ${ (show) ? 'flex' : 'none'}`  }  >

            <header className="py-4 flex flex-col justify-between  md:flex-row md:items-center">
                <span className="my-4 text-sm w-36">Select Tag</span>
                <input className=" border border-gray-200 px-4 py-1 rounded-sm italic text-base  w-full" type="search" placeholder="search tag" onChange={(e)=> {
                    const search  = e.currentTarget.value  ;
                    setSearchQuery(search)
                    let filter = allTags.current.filter((Tag) => 
                        Tag.name.toLowerCase().includes(search.toLowerCase())
                    )
                    setFilteredTags(filter)
                }} value={searchQuery} />
                <button className="absolute top-3 right-3"  onClick={()=> {
                    onCloseModal()
                }}> <FiX/> </button>
            </header>
            <ul  className=  "overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                {
                    FilteredTags.map((Tag , index) => {
                        return (
                            <li className="bg-slate-100 rounded-sm gap-4 border border-gray-200 flex items-center py-2 px-4 hover:border-blue-500 cursor-pointer" key={index} onClick={()=> {
                                onSelectTag(Tag)
                            }} >
                                <span className="text-sm flex-grow">{Tag.name}</span>
                                <span>{Tag.stationcount}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </dialog>
    )
}