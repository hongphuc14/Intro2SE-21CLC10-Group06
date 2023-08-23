import './Card.scss';

const TypeFilter = () => {
    return (  
        <div className="filter-card">
            <p className="card-title">Type</p>
            <label className="container">Tour
                <input type="radio" checked="checked" name="type"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">Tour Guide
                <input type="radio" name="type"/>
                {/* <span className="checkmark"></span> */}
            </label>
        </div>
    );
}
 
export default TypeFilter;