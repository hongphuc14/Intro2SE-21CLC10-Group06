import './TouristFreelancer.scss'
import placeholder from '../../placeholder-image.png'

export default function TouristFreelancer({img=placeholder, fullname, id_tourist }){
    img = img==="" ? placeholder : img
  
    return(
      <div className = "tourist">
        {/* <Link to = {{pathname: "/booking-freelancer", state: {id_tourist}}} style={{ textDecoration: 'none' }}> */}
            <img src={img} alt = "tourist-avatar"></img>
            <p>{fullname}</p>
        {/* </Link> */}
      </div>
    )
  }