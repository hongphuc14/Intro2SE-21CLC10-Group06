import logo from '../../logo.png';
import './StatisticsFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
function DropdownMenu(){

}

// function Review(){

// }

function Tourist({img=logo, name }){
  img = img==="" ? logo : img

  return(
    <div className = "tourist">
      <img src={img} alt = "tourist-avatar"></img>
      <p>{name}</p>
    </div>
  )
}

const tourists = [{id: 1, name: "ML", img: ""},
                  {id: 2, name: "ML", img: ""},
                  {id: 3, name: "ML", img: ""},
                  {id: 4, name: "ML", img: ""},
                  {id: 5, name: "ML", img: ""},
                  {id: 6, name: "ML", img: ""},
                  {id: 1, name: "ML", img: ""},
                  {id: 2, name: "ML", img: ""},
                  {id: 3, name: "ML", img: ""},
                  {id: 4, name: "ML", img: ""},
                  {id: 5, name: "ML", img: ""},
                  {id: 6, name: "ML", img: ""},]

function StatisticsFreelancer(){
    return(
        <div>
      <div className = "statistics-freelancer">
         <HeaderFreelancer/>
         <NavbarFreelancer img = {logo} fullname = "PHAN MY LINH" flag3 = "focus"/>  
         <div className = "main-statistic">
            <div className = "statistic">
              <div className = "sale">
                <i class="fas fa-dollar-sign"></i>
                <p className = "title">TOTAL SALES</p>
                <p className = "data">100.000</p>
                <p className = "des">$</p>
              </div>
              <div className = "booking">
                <i class="fas fa-cart-plus"></i>
                <p className = "title">TOTAL BOOKINGS</p>
                <p className = "data">100</p>
                <p className = "des">BOOKINGS</p>
              </div>
              <div className = "rating">
                <i class="fas fa-star"></i>
                <p className = "title">AVERAGE RATINGS</p>
                <p className = "data">5.0</p>
                <p className = "des">(100 RATINGS)</p>
              </div>
            </div>
            {/* chart */}
            <div className = "tourist-section">
              <p>BOOKINGS</p>
              <DropdownMenu/>
              <div className = "tourist-list">
                {
                  tourists.map(tourist =>{
                    return <Tourist li={tourist.id} {...tourist}/>
                  })
                }
              </div>
            </div>
            {/* <div className = "review-section">
              <p>RATINGS & REVIEWS</p>
              <div className = "custom">
                <CheckBoxCalendar/>
              </div>
              <ButtonNextFreelancer/>
              <Review/>
              <ButtonNextFreelancer next/>
            </div> */}
         </div>
      </div>
        </div>
    )
}

export default StatisticsFreelancer