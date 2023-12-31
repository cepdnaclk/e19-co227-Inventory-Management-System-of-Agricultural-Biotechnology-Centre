import React, { useState } from 'react';
import { Container, Form, Button, Card, Image, Row, Col } from 'react-bootstrap';
import SigninAllService from './signinAllServices';
import { useNavigate } from 'react-router-dom';
import ProfilePictureLogo from '../signup/UOPlogo.png';
import axios from 'axios';


function Signin() {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading]  = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  sessionStorage.setItem('user', JSON.stringify(formData));
  console.log('form data:', formData);

  const handleFormChange = (e) => {
    const form = e.target.form;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setIsFormFilled(form.checkValidity());
  };

  const navigate = useNavigate();

  const signinService = new SigninAllService();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        try {
          // console.log(formData);
          const response = await signinService.handleSignin(formData);

          const user = JSON.parse(sessionStorage.getItem('user'));
          const token = user.accessToken;
          // console.log(user);
          const isUser = user.roles[0] === "ROLE_USER";
          // const isMedprof = user.roles[0] === "ROLE_MODERATOR";
          const isAdmin = user.roles[0] === "ROLE_ADMIN";
          const inAdmin = await axios.get("http://localhost:8080/api/v1/manager/admin/existsbyuserid/" + user.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          const inUser = await axios.get("http://localhost:8080/api/v1/manager/user/existsbyuserid/"  + user.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          // const inMedprof = await axios.get("https://lifecare-5z1q.onrender.com/api/v1/medprof/existsbyuserid/" + user.id, {
          //   headers: {
          //       Authorization: `Bearer ${token}`
          //   }
          // });
         
          console.log(isUser);
          // console.log(isMedprof);
          console.log(isAdmin);
          console.log(inUser.data);
          // console.log(inMedprof.data);
          console.log(inAdmin.data);
          if (isUser) {
            if (inUser.data) {
              setIsLoading(false);
              navigate("/studentHome");
            } else {
              navigate("/");
            }
          } 
          // else if (isMedprof) {
          //   if (inMedprof.data) {
          //     setIsLoading(false);
          //     navigate("/medprof/home");
          //   } else {
          //     setIsLoading(false);
          //     navigate("/medprof/register");
          //     console.log("here");
          //   }
          // } 
          else if (isAdmin) {
            if (inAdmin.data) {
              navigate("/adminHome");
            } else {
              navigate("/adminReg");
            }
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Signin failed:", error);
          console.log("Error:", error); // Log the error object
          if (error.response && error.response.status === 403) {
            alert("Invalid password. Please try again.");
          } else if (error.response && error.response.status === 401) {
            console.log("Unauthorized. Please check your credentials.");
            alert("Unauthorized. Please check your credentials.");
          } else {
            alert("Signin Failed!");
          }
        }
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Signin failed:", error);
      if (error.response && error.response.status === 403) {
        alert("Invalid password. Please try again.");
      } else if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please check your credentials.");
      } else {
        alert("Signin Failed!");
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow">
              <Card.Body>
                <div className="text-center mb-4">
                  <Image src={ProfilePictureLogo} alt="Profile Logo" roundedCircle style={{ width: '150px' }} />
                </div>
                <section className="bg-c-light border-top border-bottom">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleFormChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" placeholder="Password" onChange={handleFormChange} required />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="button" className="me-5 btn-light btn-outline-primary" onClick={handleSubmit} disabled={!isFormFilled}>
                        Sign in
                      </Button>
                      <Button variant="primary" type="button" onClick={handleBack} className="btn-light btn-outline-primary">
                        Back
                      </Button>
                    </div>
                  </Form>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Signin;
