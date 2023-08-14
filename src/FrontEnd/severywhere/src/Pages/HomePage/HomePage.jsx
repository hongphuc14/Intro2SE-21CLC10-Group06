import './HomePage.scss'
import React from 'react'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { SearchList } from '../../Components/SearchBar/SearchList'
import { useState } from 'react'

function HomePage () {
    const [results, setResults] = useState([]);

    return (
        <div className='Searchbar-container'>
            <SearchBar setResult={setResults}/>
            {results && results.length > 0 && <SearchList results={results} />}
        </div>  
    );
}

export default HomePage;