import '../../Components/FilterCard/Card.scss';
import TourCard from '../../Components/TourCard/TourCard';
import TourGuideCard from '../../Components/TourGuideCard/TourGuideCard';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { SearchList } from '../../Components/SearchBar/SearchList';
import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getDestination} from '../../redux/actions/BasicAction'
import {getTourSearch, getGuideSearch} from '../../redux/actions/TouristAction'
import { useEffect,useState } from 'react';
import './Search.scss';
import '../../Components/SearchBar/SearchBar.scss'

export default function Search() {
    const dispatch = useDispatch()
    const {destination} = useSelector((state) => state.BasicReducer)
    const {tour_search, guide_search} = useSelector((state) => state.TouristReducer)
    // window.history.replaceState(null, null, "/search");

    useEffect(() => {
        dispatch(getDestination())
    }, [])

    const location = useLocation()
    const [idResult, setIdResult] = useState(0)
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setIdResult(location?.state?.id || 0)
        setResults([])
        setSearch("")
        console.log('let')
    },[location?.state?.id])

    const [tourCard, setTourCard] = useState([])
    const [guideCard, setGuideCard] = useState([])
    useEffect(() => {
        setTourCard(tour_search)
    },[tour_search])

    useEffect(() => {
        setGuideCard(guide_search)
    },[guide_search])
    
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
        setResults(results);
        // console.log(results);
    };
    const handleSearch = (value) => {
        setSearch(value);
        fetchSearch(value);
    }

    const [rating, setRating] = useState(-1)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("Tour")

    const handleChange = () => {
        let upper_price = 1000
        let below_price = 0
        if (price === 1){
            upper_price = 20
        }
        else if (price === 2){
            upper_price = 100
            below_price = 20
        }
        else if (price === 3){
            below_price = 100
            upper_price = 1000
        }

        if (type === "Tour")
            // console.log(type, idResult, rating, price)
            dispatch(getTourSearch({destination: idResult, rating, upper_price, below_price}))
        else 
            dispatch(getGuideSearch({destination: idResult, rating, upper_price, below_price}))
            // console.log(type, idResult, rating, price)
    }

    useEffect(() => {
        handleChange()
    }, [type, idResult, rating, price])

    console.log(tour_search)
    console.log(guide_search)
    return (  
        <div id="search-page">
            <HeaderGuest />
            <div id="search-page-container">
                <div id="filter-container">

                <div className="filter-card">
                    <p className="card-title">Type</p>
                    <label className="container">Tour
                        <input type="radio" checked= {type === "Tour"} value = "Tour" name="type" onChange = {() => {setType("Tour"); }}/>
                    </label>
                    <label className="container">Tour Guide
                        <input type="radio" checked= {type === "Guide"} name="type" value = "Guide" onChange = {() => {setType("Guide");}}/>
                    </label>
                </div>

                <div className="filter-card">
                    <p className="card-title">Rating</p>
                    <label className="container">1 star
                        <input type="radio" name="rating" checked= {rating === 1} onChange = {() => {setRating(1)}}/>
                    </label>
                    <label className="container">2 stars
                        <input type="radio" name="rating" checked= {rating === 2} onChange = {() => {setRating(2)}}/>
                    </label>
                    <label className="container">3 stars
                        <input type="radio" name="rating" checked= {rating === 3} onChange = {() => {setRating(3);}}/>
                    </label>
                    <label className="container">4 stars
                        <input type="radio" name="rating" checked= {rating === 4} onChange = {() => {setRating(4);}}/>
                    </label>
                    <label className="container">5 stars
                        <input type="radio" name="rating" checked= {rating === 5} onChange = {() => {setRating(5);}}/>
                    </label>
                </div>
  
                <div className="filter-card">
                    <p className="card-title">Cost</p>
                    <label className="container">Under $20
                        <input type="radio" name="cost" checked= {price === 1} onChange = {() => {setPrice(1);}}/>
                    </label>
                    <label className="container">$20 - $100
                        <input type="radio" name="cost" checked= {price === 2} onChange = {() => {setPrice(2);}}/>
                    </label>
                    <label className="container">Above $100
                        <input type="radio" name="cost" checked= {price === 3} onChange = {() => {setPrice(3);}}/>
                    </label>
                </div>

                </div> 

                <div id="search-container">

                    <div className = "searchbar">
                        <div className="input-wrapper">
                            <input placeholder={destination[idResult - 1]?.name || 'Enter your favorite destination !'} value={search} onChange={(e) => handleSearch(e.target.value)} id="input-search"/>
                            <i class="fa-solid fa-magnifying-glass-location" id='seach-icon'></i>
                        </div>
                        {results && results.length > 0 && <SearchList results={results} />}
                    </div>

                    <div id="result-container">
                        {
                            (type === "Tour") && tourCard.map((card) => {
                                return(
                                <Link key = {card.id_tour} to = {{pathname: "/tourpage", state: {info: card}}} style = {{textDecoration: "none"}} >
                                    <TourCard info = {card}/>
                                </Link>
                                )
                            })
                        }
                        {
                            (type === "Guide") && guideCard.map((card) => {
                                return(
                                <Link key = {card.id_guide}  to = {{pathname: "/tourguidepage", state: {info: card}}} style = {{textDecoration: "none"}} >
                                    <TourGuideCard info = {card}/>
                                </Link>    
                                )
                            })
                        }
                        {/* <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
// export default Search;