import "./SearchResult.scss"
// import { useDispatch } from "react-redux";
// import {Link} from 'react-router-dom'

export const SearchResult = ({ result, id }) => {
    // const dispatch = useDispatch()

    return (
            <div className="search-result" onClick={(e) => {
                window.history.pushState(id, null, "/login")
                window.location.reload()
            }}>
                {result}
            </div>
    );
};