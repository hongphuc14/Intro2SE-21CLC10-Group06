import GuideHeader from "../../Components/TourGuidePageComponents/GuideHeader";
import IntroCard from "../../Components/TourGuidePageComponents/IntroCard";
import AttractionCard from "../../Components/TourGuidePageComponents/AttractionCard";
import "./TourGuidePage.scss"

const TourGuidePage = () => {
    return (  
        <div id="tourguide-page">
            <div id="guide-header"></div>
            <div id="guide-main-page">
                <div id="left-container">
                    <IntroCard />
                </div>
                <div id="right-container">
                    <AttractionCard />
                    <AttractionCard />
                    {/* <AttractionCard />
                    <AttractionCard />
                    <AttractionCard />
                    <ReviewCard /> */}
                </div>
            </div>
        </div>
    );
}
 
export default TourGuidePage;