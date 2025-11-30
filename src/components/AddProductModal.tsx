import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";

interface AddProductModalProps {
  show: boolean;
  onHide: Function;
}

const AddProductModal: FunctionComponent<AddProductModalProps> = ({
  show,
  onHide,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct onHide={onHide} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
