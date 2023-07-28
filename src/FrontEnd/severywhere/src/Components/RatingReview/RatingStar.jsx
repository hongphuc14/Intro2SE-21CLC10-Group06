import './RatingStar.scss'

export default function RatingStar({numberStar}){
    if (numberStar === 5)
        return(
            <div className = "rating-line">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        )
    else if (numberStar === 4)
        return(
            <div className = "rating-line">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>  
        )
    else if (numberStar === 3)
        return(
            <div className = "rating-line">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </div>  
        )
    else if (numberStar === 2)
        return(
            <div className = "rating-line">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </div>  
        )
    else if (numberStar === 1)
        return(
            <div className = "rating-line">
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </div>  
        )
    else 
        return(
            <div className = "rating-line">
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </div>  
        )
}
