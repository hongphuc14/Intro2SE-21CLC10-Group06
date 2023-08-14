import { useState } from 'react';
import './SearchBar.scss';

export const SearchBar = ({ setResult }) => {
    const [search, setSearch] = useState("");

    const fetchSearch = (value) => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.name &&
                        user.name.toLowerCase().includes(value)
                    );
            });
                setResult(results);
                // console.log(search);
            });
    };
    const handleSearch = (value) => {
        setSearch(value);
        fetchSearch(value);
    }

    return (
        <div className="input-wrapper">
            <input placeholder='Enter your favorite destination !' value={search} onChange={(e) => handleSearch(e.target.value)} id="input-search"/>
            <i class="fa-solid fa-magnifying-glass-location" id='seach-icon'></i>
        </div>
    );
};