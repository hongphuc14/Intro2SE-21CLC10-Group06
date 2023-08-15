import { SearchResult } from "./SearchResult";
import './SearchList.scss'

export const SearchList = ({ results }) => {
    return (
        <div className = "search-container">
            {results?.map((result) => {
                return <SearchResult result={result.name} id = {result.id_des} key={result.id_des} />;
            })}
        </div>
    );
}