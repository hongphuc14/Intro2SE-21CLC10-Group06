import TypeFilter from '../../Components/FilterCard/TypeFilter';
import RatingFilter from '../../Components/FilterCard/RatingFilter';
import CostFilter from '../../Components/FilterCard/CostFilter';
import './Search.scss';

export default function Search() {
    return (  
        <div id="search-page">
            <div id="filter-container">
                <TypeFilter />
                <RatingFilter />
                <CostFilter />
            </div> 
        </div>
    );
}
 
// export default Search;