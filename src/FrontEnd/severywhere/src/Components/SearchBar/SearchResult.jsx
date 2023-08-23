import "./SearchResult.scss"
// import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

export const SearchResult = ({ result, id }) => {
    // const dispatch = useDispatch()

    return (
        <Link to = {{pathname: "/search", state: {id: id}}} style = {{textDecoration: "none"}} >
            <div className="search-result">
                {result}
            </div>
        </Link>
    );
};