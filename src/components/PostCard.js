import { Card, CardBody, CardFooter, CardHeader, Container, Row, Col } from "reactstrap"
import { FaRegThumbsDown } from 'react-icons/fa6';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import moment from "moment";

export default function PostCard() {
    const myPost = {
        userName: "Khalid Sulaiman Al Jabri",
        profilePicture: "https://wallpapers.com/images/hd/cool-profile-picture-kpwjvjw5434qfzo3.jpg",
        postDate: "2025-11-02T06:00:00",
        postTitle: "Fullstack Mid Exam Resuts",
        postMessage: "The fullstack mid exam results are published on the official college e-learning portal, anyone haveing any queries regarding their marks you can meet me in person in my office till thursday this week.",
        likes: 2,
        likesBy: ["ahmed@hotmail.com", "Moza@yahoo.com"],
        dislikes: 0,
        dislikesBy: [],
        lat: 23.608682815687025,
        lon: 58.43900175021011
    }
    return (
        <>
            <Container fluid>
                <Card>
                    <CardHeader>
                        <img src={myPost.profilePicture} style={{ height: "70px" }} className="img rounded-circle" />
                        <span style={{ fontWeight: "bold" }}>{myPost.userName}</span>
                        <p>Posted: <span className="text-info">{moment(myPost.postDate).fromNow()}</span></p>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="9">
                                <h6>{myPost.postTitle}</h6>
                                <p>{myPost.postMessage}</p>
                            </Col>
                            <Col>
                                <iframe src={`https://maps.google.com/maps?q=${myPost.lat},${myPost.lon}&output=embed`} style={{ border: "0", height: "180px", width: "360px" }} ></iframe>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col xs="1">
                                <span className="text-success"><FaRegThumbsUp /> {myPost.likes}</span>
                            </Col>
                            <Col>
                                <span className="text-danger"><FaRegThumbsDown /> {myPost.dislikes}</span>
                            </Col>
                            <Col xs="1"><FaEdit /></Col>
                            <Col xs="1"><MdOutlineDelete /></Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Container>
        </>
    )
}