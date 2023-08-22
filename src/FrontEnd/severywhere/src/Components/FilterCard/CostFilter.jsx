import './Card.scss';

const CostFilter = () => {
    return (  
        <div className="filter-card">
            <p className="card-title">Cost</p>
            <label className="container">Under $20
                <input type="radio" name="cost"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">$20 - $100
                <input type="radio" name="cost"/>
                {/* <span className="checkmark"></span> */}
            </label>
            <label className="container">Above $100
                <input type="radio" name="cost"/>
                {/* <span className="checkmark"></span> */}
            </label>
        </div>
    );
}
 
export default CostFilter;