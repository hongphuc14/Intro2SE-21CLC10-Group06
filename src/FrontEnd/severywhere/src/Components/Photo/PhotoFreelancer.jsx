import './PhotoFreelancer.scss'

function EditIcon(){
    return(
        <div className ="icon">
            <i class="fas fa-edit"></i>
        </div>
    )
}

function TrashIcon(){
    return(
        <div className ="icon">
            <i class="fas fa-trash-alt"></i>
        </div>
    )
}

export default function PhotoFreelancer({img, verified}){
    return(
        <div className = "avatar-frame">
            <div className = "picture">
                <img src={img} alt = ""></img>
                <div className = "picture-bg">
                    <EditIcon/>
                    <TrashIcon/>
                </div>
            </div>
            
            {verified && 
            <div className = "verified">
                <i class="fas fa-user-check"></i>
                Verified user account
            </div>}
            
        </div>
    )
}