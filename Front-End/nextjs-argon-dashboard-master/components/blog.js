import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  import PropTypes from "prop-types";
  import Image from "next/image";
  import Link from 'next/link';
  
  
  const Blog = ({ image, estate, id}) => {
    console.log(id);
    return (
      <Card className="align-items-center">
        <img alt="Card image cap" src={image} />
        <CardBody className="p-4">
          <CardTitle tag="h5">Estate : {estate}</CardTitle>
          
          {/* <Button color={color} href = "/ui/">Read More</Button> */}
          <Link href={"/nfts/" + id} >
            <a>View NFT</a>
          </Link>
        </CardBody>
      </Card>
    );
  };
  
  Blog.propTypes = {
    id: PropTypes.string,
    image: PropTypes.any,
  };
  export default Blog;