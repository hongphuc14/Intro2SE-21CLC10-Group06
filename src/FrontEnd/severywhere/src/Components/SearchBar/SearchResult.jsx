import "./SearchResult.scss"

export const SearchResult = ({ result }) => {
    return (
            <div className="search-result" onClick={(e) => alert(`You choose ${result}`)}>
                {result}
            </div>
    );
};