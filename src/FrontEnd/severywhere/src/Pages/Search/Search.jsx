import TypeFilter from '../../Components/FilterCard/TypeFilter';
import RatingFilter from '../../Components/FilterCard/RatingFilter';
import CostFilter from '../../Components/FilterCard/CostFilter';
import TourCard from '../../Components/TourCard/TourCard';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import { SearchBar } from '../../Components/SearchBar/SearchBar'

export default function Search() {
    return (  
        <div id="search-page">
            <HeaderGuest />
            <div id="search-page-container">
                <div id="filter-container">
                    <TypeFilter />
                    <RatingFilter />
                    <CostFilter />
                </div> 
                <div id="search-container">
                    <SearchBar />
                    <div id="result-container">
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                        <TourCard />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
// export default Search;