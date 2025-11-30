import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import DeleteProduct from "./DeleteProduct";

interface DeleteProductModalProps {
  show: boolean;
  onHide: Function;
  productId: string;
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({
  show,
  onHide,
  productId,
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
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteProduct onHide={onHide} productId={productId} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
