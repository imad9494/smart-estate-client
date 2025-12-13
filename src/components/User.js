import {Container} from "reactstrap"
import {useSelector} from "react-redux"
export default function User() {
    const userProfilePic = useSelector((state) => state.user.user.userProfilePic)
    const userFullName = useSelector((state) => state.user.user.userName)
    return(
        <>
            <Container fluid color="light">
                <div className="justify-content-center">
                    <img src={userProfilePic} style={{width : "150px"}} className="img rounded-circle" />
                    <p>{userFullName}</p> 
                </div>
            </Container>
        </>
    )
}