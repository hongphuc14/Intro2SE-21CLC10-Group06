import './Card.scss';

const RatingFilter = () => {
    return (  
        <div className="filter-card">
            <p className="card-title">Rating</p>
            <label className="container">1 star
                <input type="radio" name="rating"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">2 stars
                <input type="radio" name="rating"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">3 stars
                <input type="radio" name="rating"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">4 stars
                <input type="radio" name="rating"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">5 stars
                <input type="radio" name="rating"/>
                {/* <span className="checkmark"></span> */}
            </label>
        </div>
    );
}
 
export default RatingFilter;