import { useState } from "react";
import { Modal, Image, Button } from "react-bootstrap";

const ProductImage = ({ product }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setShow(true)}>
        Click to open expanded view
      </Button>

      <Modal
        size='xl'
        show={show}
        onHide={() => setShow(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            {product && product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            style={{ width: "800px" }}
            src={product && product.image}
            alt={product && product.name}
            fluid
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductImage;
