import { useState, useEffect } from 'react';
import './SearchBar.scss';
import { useSelector, useDispatch } from 'react-redux';
import {getDestination} from '../../redux/actions/BasicAction'

export const SearchBar = ({ setResult, val = ""}) => {
    const dispatch = useDispatch()
    const {destination} = useSelector((state) => state.BasicReducer)
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getDestination())
    }, [])

    const fetchSearch = (value) => {
        value = value.toLowerCase()

        const results = destination.filter((user) => {
            return (
                value &&
                user &&
                user.name &&
                user.name.toLowerCase().includes(value)
            );
        });
        setResult(results);
        // console.log(results);
    };
    const handleSearch = (value) => {
        setSearch(value);
        fetchSearch(value);
    }

    console.log(val)
    return (
        <div className="input-wrapper">
            <input placeholder={val || 'Enter your favorite destination !'} value={search} onChange={(e) => handleSearch(e.target.value)} id="input-search"/>
            <i class="fa-solid fa-magnifying-glass-location" id='seach-icon'></i>
        </div>
    );
};