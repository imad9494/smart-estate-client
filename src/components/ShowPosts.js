import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa6';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowPosts() {
    const userProfilePic = useSelector((state) => state.user.user.userProfilePic);
    const userFullName = useSelector((state) => state.user.user.userName);

    const lat = 23.773293989503895;
    const lon = 57.791495431845426;
    const createdAt = "2025-10-25T14:31:54.588+00:00";

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
    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        showAllPosts();
    }, []);

    const showAllPosts = async () => {
        try {
            const myData = await axios.get("https://smart-estate-server.onrender.com/showPosts");
            setPosts(myData.data);
            console.log(myData.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container fluid>
            {posts.map((post) => (
                <Card key={post._id}>
                    <CardHeader>
                        <img src={post.profilePicture} style={{ height: "70px" }} className="img rounded-circle" />
                        <span style={{ fontWeight: "bold" }}>{post.userName}</span>
                        <p>Posted: <span className="text-info">{moment(post.createdAt).fromNow()}</span></p>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="8">
                                <h6>{post.postTitle}</h6>
                                <p>{post.postMessage}</p>
                            </Col>
                            <Col>
                                <iframe
                                    src={`https://maps.google.com/maps?q=${myPost.lat},${myPost.lon}&output=embed`}
                                    style={{ border: "0", height: "180px", width: "360px" }}
                                ></iframe>
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
            ))}
        </Container>
    );
}
