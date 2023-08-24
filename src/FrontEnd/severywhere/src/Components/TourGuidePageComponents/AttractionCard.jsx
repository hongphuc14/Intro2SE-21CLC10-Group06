import './AttractionCard.scss'
import placeholder from '../../placeholder-image.png'

const AttractionCard = ({title, content, photo_path}) => {
    const importPhoto = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return placeholder
        try{
          const path = require(`../../../../../BackEnd/public/attraction/${filename}`)
          return path}
        catch (err) {
          return placeholder
        }
      }

    return (  
        <div class="attraction-card">
            <p class="attraction-title">{title}</p>
            <div class="attraction-info-container">
                <div class="attraction-image-container">
                    <img src={importPhoto(photo_path)}alt="attraction-image" />
                </div>
                <div class="attraction-description-container">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}
 
export default AttractionCard;