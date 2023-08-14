import './TouristFreelancer.scss'
import placeholder from '../../placeholder-image.png'
// import image from '../../../../../BackEnd/public/tourist_avatar'


export default function TouristFreelancer({id_tourist_tourist }){
  const importAvatar = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    const path = require(`../../../../../BackEnd/public/tourist_avatar/${filename}`)
    return path
  }

  return(
    <div className = "tourist">
          <img src={importAvatar(id_tourist_tourist.avatar) || placeholder} alt = "tourist-avatar"></img>
          <p>{id_tourist_tourist.fullname}</p>
    </div>
  )
}