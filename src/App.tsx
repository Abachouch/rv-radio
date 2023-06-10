import { useState } from 'react'

import './App.css'
import StationInfo from './StationInfo/StationInfo'

import SavedStations from './StationsList/StationsList'
import { RadioStation } from './types/Station'
import { FcGlobe, FcLike, FcMusic } from 'react-icons/fc'
import CountriesModal from './CountrieModal/CountriesModal'
import TagsModal from './TagsModal/TagsModal'
import { ListSearchQueryType } from './types/ListSearchQueryType'
import { ListSearchQuery } from './types/ListSearchQuery'



function App() {
  const [playing, setPlaying] = useState(new RadioStation())
  const [listSearchQuery, setListSearchQuery ] = useState<ListSearchQuery>({type : ListSearchQueryType.trending })

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false)

  return (
    <div className='bg-slate-900 h-screen grid md:grid-cols-[1fr_2fr] '>

      <StationInfo {...playing} ></StationInfo>

      <main className='flex flex-col overflow-auto' >

        <header className="flex gap-x-4 p-4">
          <button className="text-white flex gap-x-2 items-center rounded-sm bg-slate-800 border border-slate-600 px-3 py-1 font-bold text-sm" onClick={() => {
            setListSearchQuery({type : ListSearchQueryType.trending });
          }}> <FcLike /> Trending</button>

          <button className="text-white flex gap-x-2 items-center rounded-sm bg-slate-800 border border-slate-600 px-3 py-1 font-bold text-sm" onClick={() => {
            setShowCountryModal(true);
          }}> <FcGlobe /> Country</button>

          <button className="text-white flex gap-x-2 items-center rounded-sm bg-slate-800 border border-slate-600 px-3 py-1 font-bold text-sm" onClick={() => {
            setShowTagModal(true)
          }}> <FcMusic /> Tag</button>

        </header>

        <SavedStations  listQuery={ listSearchQuery } onSelectStation={(selectedStation: RadioStation) => {
          setPlaying(selectedStation)
        }}></SavedStations>
      </main>

      <CountriesModal onCloseModal={() => {
        setShowCountryModal(false)
      }} show={showCountryModal}
        onSelectCountry={(selectedCountry: Country) => {
          setShowCountryModal(false);
          setListSearchQuery({type : ListSearchQueryType.country , query : selectedCountry.iso_3166_1})
        }} />

      <TagsModal onCloseModal={() => {
        setShowTagModal(false)
      }} show={showTagModal}
        onSelectTag={(selectedTag: Tag) => {
          setShowTagModal(false);
          setListSearchQuery({type : ListSearchQueryType.tag , query : selectedTag.name})
        }} />

    </div>
  )
}

export default App
