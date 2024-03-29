import React, { useEffect } from "react";
// import { myStxAddress  } from "../../components/auth";
import { useState } from "react";

import { saveHomeInfo, fetchHomeInfo, saveNFTPic } from "../../components/home-reg";

// import { userSession } from "../../components/auth";
// import { userSession } from "../pages/_app";

import imageCompression from 'browser-image-compression';

import { userSession } from "../_app";

import { v4 as uuid } from "uuid";

import navigation from "react";

const defaultHouse = "https://media.istockphoto.com/photos/3d-rendering-brick-house-isolation-on-a-white-3d-illustration-picture-id1337434489?b=1&k=20&m=1337434489&s=170667a&w=0&h=Be7c31gM3b-sDHIRqCXPNcqamruzf9RUhVrdL3Wrs60=";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { removeHomeInfo } from "../../components/home-reg";

function HomeReg() {

  const [data, setData] = useState([]);

  const [isFetching, setFetching] = useState(false);

  const [filestate, setfilestate] = useState({

    // Initially, no file is selected
    selectedFile: null
  });

  const [uploadedfilestate, setuploadedfilestate] = useState({

    // Initially, no file is selected
    selectedFile: null
  });



  const [state, setState] = useState({
    Address: "",
    Phone: "",
    Zipcode: "",
    City: "",
    Estate: "",
    URL: "",
  });


  if (!isFetching) {
    fetchHomeInfo(userSession).then((HomeInfo) => {
      setData(HomeInfo);
      console.log(HomeInfo);
      setFetching(true);
      console.log("Tried Fetching");
    });
    
  }

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    const HomeInfo = {
      Address: state.Address,
      Phone: state.Phone,
      Zipcode: state.Zipcode,
      City: state.City,
      Estate: state.Estate,
      URL: state.URL,
      id: uuid(),
    };

    if (userSession.isUserSignedIn()) {
      saveHomeInfo(HomeInfo, data).then((result) => {
        console.log(result);
        setFetching(false);
      });
    }
    else {
      console.log('User is not Signed in!');
    }
  }

  const removeHouse = (HomeAddress) => {
    console.log(HomeAddress);
    if (userSession.isUserSignedIn()) {
      removeHomeInfo(HomeAddress, data).then((result) => {
        console.log("agent deleted");
        setFetching(false);
      });
    }
    else {
      console.log('User is not Signed in!');
    }
  }


  const onFileChange = (event) => {

    // Update the state
    setfilestate({ selectedFile: event.target.files[0] });

  };

  const onFileUpload = async () => {

    if (NFTPicValidation(filestate.selectedFile)) {

      if (userSession !== null) {
        
        try {
          // File, MaxWidth
          const ResizedImage = await ResizeImage(filestate.selectedFile, 300);
          const URL = await saveNFTPic(ResizedImage);

          setState({
            ...state,
            URL: URL,
          });

          const buffer = await imageCompression.getDataUrlFromFile(ResizedImage);
          setuploadedfilestate({ selectedFile: buffer });
         
        }
        catch (err) {
          console.log(err);
        }
        
      }
      else {
        console.log('User is not Signed in!');
      }
    }

   
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-black border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Home Registration</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Home Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="House no. 23, UC Berkley, USA"
                            type="text"
                            name="Address"
                            onChange={handleChange}
                            defaultValue={state.Address}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phoneno"
                          >
                            Phone no.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phoneno"
                            placeholder="+2135454544"
                            type="text"
                            name="Phone"
                            onChange={handleChange}
                            defaultValue={state.Phone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-zipcode"
                          >
                            Zip Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-zipcode"
                            placeholder="21100"
                            type="number"
                            name="Zipcode"
                            onChange={handleChange}
                            defaultValue={state.Zipcode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="New York"
                            type="text"
                            name="City"
                            onChange={handleChange}
                            defaultValue={state.City}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-estate"
                          >
                            Estate
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-estate"
                            placeholder="Albama"
                            type="text"
                            name="Estate"
                            onChange={handleChange}
                            defaultValue={state.Estate}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="4">
          <div style={{ maxHeight: "400px", maxWidth: "400px" }} className="mt-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                      
                        src={uploadedfilestate.selectedFile? uploadedfilestate.selectedFile: defaultHouse}
                      />
                    </a>
                  </div>

                  <div className="h5 mt-4">
              
                    <input type="file" onChange={onFileChange}/>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={onFileUpload}
                      size="sm"
                    >
                      Upload
                    </Button>

                  </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Homes Registered</h3>
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Home Address</th>
                    <th scope="col">Phone no.</th>
                    <th scope="col">Zipcode</th>
                    <th scope="col">City Name</th>
                    <th scope="col">Estate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(dataProps =>
                    <tr>
                      <th scope="row">{dataProps.Address}</th>
                      <td>{dataProps.Phone}</td>
                      <td>{dataProps.Zipcode}</td>
                      <td>{dataProps.City}</td>
                      <td>{dataProps.Estate}</td>
                      <Button onClick={() => removeHouse(dataProps.Address)}>Remove</Button>

                    </tr>
                  )}

                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

function NFTPicValidation(file) {

  if (file) {
    // Allowing file type
    const allowedExtensions =
      /(\/jpg|\/jpeg|\/png)$/i;

    if (!allowedExtensions.exec(file.type)) {
      alert('Invalid file type');
      return false;
    }
    else {
      return true;
    }
  }
  else {
    alert('No File Selected');
    return false;
  }
}

async function ResizeImage(file, MaxWidth) {
  const options = {
    maxWidthOrHeight: MaxWidth,
  }

  const ResizedImage = await imageCompression(file, options);

  return ResizedImage;
}

HomeReg.layout = Admin;

export default HomeReg;