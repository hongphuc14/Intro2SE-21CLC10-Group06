import { SearchResult } from "./SearchResult";
import './SearchList.scss'

export const SearchList = ({ results }) => {
    return (
        <div className = "search-container">
            {results?.map((result, id) => {
                return <SearchResult result={result.name} key={id} />;
            })}
        </div>
    );
}