import './HomePage.scss'
import React from 'react'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { SearchList } from '../../Components/SearchBar/SearchList'
import { useState } from 'react'

function HomePage() {
    const [results, setResults] = useState([]);

    return (
        <div className='HomePage-container'>
            <HeaderGuest />
            <div className='HomePage-content'>
                <h1>SEVERYWHERE</h1>
                <div className='Searchbar-container'>
                    <SearchBar setResult={setResults} />
                    {results && results.length > 0 && <SearchList results={results} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;