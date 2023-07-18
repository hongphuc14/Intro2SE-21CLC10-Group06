import './Avatar.scss'

export default function Avatar({img, verified}){
    return(
        <div className = "avatar-frame">
            <div className = "avatar-hover">
                
            </div>
            <img src={img} alt = "avatar"></img>
            {verified && 
            <div className = "verified">
                <i class="fas fa-user-check"></i>
                Verified user account
            </div>}
            
        </div>
    )
}