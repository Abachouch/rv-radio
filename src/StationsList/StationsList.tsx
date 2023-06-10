import  { useEffect, useState } from "react";
import { RadioStation } from "../types/Station";
import { ListSearchQuery } from "../types/ListSearchQuery";

export default function ({ onSelectStation   , listQuery }: { onSelectStation: Function  ,listQuery : ListSearchQuery  }) {

    const [stations, setStations] = useState([])
    const [selectedIndex , setSelectedIndex] = useState(0)

    const fetchStations = () => {
        let apiUrl = '' ; 

        switch(listQuery.type){
            case 'country' : 
            apiUrl = `http://de1.api.radio-browser.info/json/stations/bycountrycodeexact/${ encodeURIComponent(listQuery.query || '') }` ;
            break ;
            case 'tag' :
            
            apiUrl = `http://de1.api.radio-browser.info/json/stations/bytagexact/${ encodeURIComponent(listQuery.query || '')}`;
            
            break ;
            case 'trending' :
                apiUrl = `http://de1.api.radio-browser.info/json/stations/topvote/20?hidebroken=true` ;    
            break ;
        }

        fetch(apiUrl).then(res => res.json()).then(data => {
            setStations(data)
        })
    }

    useEffect(() => {
        fetchStations()
    }, [listQuery])

    return (

        <div className="overflow-y-auto">
           
            <ul className="flex flex-col gap-2 overflow-y-auto p-6">
                {
                    stations.map((station: RadioStation , index:number) =>
                    (
                        <li key={index} className={"grid grid-rows-none grid-cols-[3rem_1fr] gap-x-4 break-all hover:bg-slate-800 p-2 rounded-md cursor-pointer " + ((selectedIndex === index) ? 'bg-slate-700 shadow-slate-900 shadow-md pl-2'  : '')} onClick={() => {
                            onSelectStation(station)
                            setSelectedIndex(index)
                        }
                        }
                        >
                            <img className="rounded-md object-contain h-12 w-12 row-span-2 shrink-0" src={station.favicon} alt="" onError={(e) => {
                                e.currentTarget.src = "./public/default_favicon.webp"
                            }} />
                            <h3 className="text-base font-bold text-white" >{station.name}</h3>
                            <p className="text-sm text-neutral-400" > {(station.tags !== '') ? station.tags.split(',').slice(0 , 3).join(', ') + ' - ' : ''} {station.country}</p>
                        </li>
                    )
                    )}

            </ul>
        </div>
    )
}
