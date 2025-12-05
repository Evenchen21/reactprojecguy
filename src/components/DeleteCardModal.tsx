import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import DeleteCard from "./DeleteCard";

interface DeleteCardModalProps {
  show: boolean;
  onHide: Function;
  cardId: string;
  refresh: Function;
}

const DeleteCardModal: FunctionComponent<DeleteCardModalProps> = ({
  show,
  onHide,
  cardId,
  refresh,
}) => {
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DeleteCard onHide={onHide} cardId={cardId} refresh={refresh} />
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCardModal;
