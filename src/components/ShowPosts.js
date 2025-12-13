import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { SlLike, SlDislike } from "react-icons/sl"
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegThumbsDown } from 'react-icons/fa6';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';
import moment from 'moment';

import { useSelector } from "react-redux"
import { useEffect, useState } from "react";

import axios from "axios"

export default function ShowPosts() {
    const userProfilePic = useSelector((state) => state.user.user.userProfilePic)
    const userFullName = useSelector((state) => state.user.user.userName)


    const lat = 23.773293989503895
    const lon = 57.791495431845426
    //const createdAt = "2025-11-01T14:31:54.588+00:00"
    // const createdAt = "2025-11-01T13:45:54.588+00:00"
    // const createdAt = "2025-10-31T14:31:54.588+00:00"
    const createdAt = "2025-10-25T14:31:54.588+00:00"


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

    const [posts, setPosts] = useState([])

    useEffect(() => {
        showAllPosts()
    }, [posts])

    const showAllPosts = async () => {
        try {
            const myData = await axios.get("http://localhost:7500/showPosts")
            setPosts(myData.data)
            console.log(myData.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Container fluid>
                {
                    posts.map((post) => {
                        return (
                            <>
                                <Card>
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
                            </>
                        )
                    })
                }


                {/* <Card className="my-5">
                    <CardHeader>
                        <img src="https://www.aidemos.info/wp-content/uploads/2023/05/3D_art_for_game_avatar_profile_4093a9b2-07b4-40b5-99e4-ac8adffccb71-1.webp" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 'bold' }}>Mohammed Mushtaq Ahamed</span>
                        <p>Posted: <span className="text-info">{moment("2025-11-02T05:00:54.588+00:00").fromNow()}</span></p>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col xs="8">
                                    <h5>Fullstack Final exam</h5>
                                    <p>Actual message... Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                                </Col>
                                <Col xs="4" className="d-flex justify-content-end"><iframe src={`https://maps.google.com/maps?q=23.575195234819986,58.42170222599534&h1=es;&output=embed`} width='auto' height='auto' /></Col>
                            </Row>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md='1'>
                                <span className="text-success"><SlLike /> 3</span>
                            </Col>
                            <Col md='2'>
                                <span className="text-danger"><SlDislike /> 0</span>
                            </Col>
                            <Col md='7'></Col>
                            <Col md='1'>
                                <FaEdit onClick={() => alert("Edit Post")} />
                            </Col>
                            <Col md='1'>
                                <MdDeleteSweep onClick={() => alert("Delete Post")} />
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>

                <Card className="my-5">
                    <CardHeader>
                        <img src={userProfilePic} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 'bold' }}>{userFullName}</span>
                        <p>Posted: <span className="text-info">{moment("2025-11-01T14:31:54.588+00:00").fromNow()}</span></p>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col xs="8">
                                    <h5>Today is a holiday!</h5>
                                    <p>Actual message... Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                                </Col>
                                <Col xs="4" className="d-flex justify-content-end"><iframe src={`https://maps.google.com/maps?q=${lat},${lon}&h1=es;&output=embed`} width='auto' height='auto' /></Col>
                            </Row>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md='1'>
                                <span className="text-success"><SlLike /> 6</span>
                            </Col>
                            <Col md='2'>
                                <span className="text-danger"><SlDislike /> 1</span>
                            </Col>
                            <Col md='7'></Col>
                            <Col md='1'>
                                <FaEdit onClick={() => alert("Edit Post")} />
                            </Col>
                            <Col md='1'>
                                <MdDeleteSweep onClick={() => alert("Delete Post")} />
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>

                <Card className="my-5">
                    <CardHeader>
                        <img src="https://png.pngtree.com/png-vector/20241023/ourmid/pngtree-discord-cool-png-image_13527910.png
" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 'bold' }}>Mohammed Sulaiman</span>
                        <p>Posted: <span className="text-info">{moment(createdAt).fromNow()}</span></p>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col xs="8">
                                    <h5>National Holidays declared</h5>
                                    <p>Actual message... Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                                </Col>
                                
                            </Row>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md='1'>
                                <span className="text-success"><SlLike /> 1</span>
                            </Col>
                            <Col md='2'>
                                <span className="text-danger"><SlDislike /> 2</span>
                            </Col>
                            <Col md='7'></Col>
                            <Col md='1'>
                                <FaEdit onClick={() => alert("Edit Post")} />
                            </Col>
                            <Col md='1'>
                                <MdDeleteSweep onClick={() => alert("Delete Post")} />
                            </Col>
                        </Row>
                    </CardFooter>
                </Card> */}
            </Container>
        </>
    )
}