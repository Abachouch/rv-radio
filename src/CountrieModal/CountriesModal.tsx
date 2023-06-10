import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";





export default function ({ onSelectCountry , show , onCloseModal }: { onSelectCountry : Function , show : boolean  , onCloseModal : Function}) {

    const allCountries = useRef<Country[] >([])

    const [FilteredCountries, setFilteredCountries] = useState<Country[]>([])
    const [searchQuery , setSearchQuery] = useState('') ;

    const fetchCountries = async () => {
        const response =  await fetch('https://de1.api.radio-browser.info/json/countries')
        const  data = await  response.json()
        allCountries.current = data ;
       
        setFilteredCountries(data) ;
        return data
    }

    useEffect(() => {
        fetchCountries()
    }, [allCountries])

    return (
        <dialog   className= {`top-8 right-8 left-8 bottom-8 flex-col max-h-screen h-auto w-auto rounded-md ${ (show) ? 'flex' : 'none'}`  }  >

            <header className="py-4 flex flex-col justify-between  md:flex-row md:items-center">
                <span className="my-4 text-sm w-36">Select country</span>
                <input className=" border border-gray-200 px-4 py-1 rounded-sm italic text-base  w-full" type="search" placeholder="search countrie" onChange={(e)=> {
                    const search  = e.currentTarget.value  ;
                    setSearchQuery(search)
                    let filter = allCountries.current.filter((country) => 
                        country.name.toLowerCase().includes(search.toLowerCase())
                    )
                    setFilteredCountries(filter)
                }} value={searchQuery} />
                <button className="absolute top-3 right-3"  onClick={()=> {
                    onCloseModal()
                }}> <FiX/> </button>
            </header>
            <ul  className=  "overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                {
                    FilteredCountries.map(countrie => {
                        return (
                            <li className="bg-slate-100 rounded-sm gap-4 border border-gray-200 flex items-center py-2 px-4 hover:border-blue-500 cursor-pointer" key={countrie.iso_3166_1} onClick={()=> {
                                onSelectCountry(countrie)
                            }} >
                                <img
                                    src={`https://flagcdn.com/16x12/${countrie.iso_3166_1.toLocaleLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/32x24/${countrie.iso_3166_1.toLocaleLowerCase()}.png 2x,https://flagcdn.com/48x36/${countrie.iso_3166_1.toLocaleLowerCase()}.png 3x`}
                                    className="h-4" alt={countrie.iso_3166_1} />
                                <span className="text-sm flex-grow">{countrie.name}</span>
                                <span>{countrie.stationcount}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </dialog>
    )
}