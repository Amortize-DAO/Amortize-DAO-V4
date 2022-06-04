import React, { useEffect, useState } from "react";
// import { myStxAddress  } from "../../components/auth";

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
import { useRouter } from "next/router";

function Nft() {

  const router = useRouter()
  const { nft } = router.query

  
  const [homeDetails, setHomeDetails] = useState({
    Address: "",
    Phone: "",
    Zipcode: "",
    City: "",
    Estate: ""
  })

  useEffect(async ()=>{

    const nft_data = await fetch(`/api/getNFTbyID?id=${nft}`);

    const response = await nft_data.json();

    console.log(response);

    const data = JSON.parse(response.data);
    setHomeDetails({
      Address: data.Address,
      Phone: data.Phone,
      Zipcode: data.ZipCode,
      City: data.City,
      Estate: data.State
    })
    

  },[])

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
       
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Home Details</h3>
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
                  
                    <tr>
                      <th scope="row">{homeDetails.Address}</th>
                      <td>{homeDetails.Phone}</td>
                      <td>{homeDetails.Zipcode}</td>
                      <td>{homeDetails.City}</td>
                      <td>{homeDetails.Estate}</td>
                     
                    </tr>
                 
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}


Nft.layout = Admin;

export default Nft;