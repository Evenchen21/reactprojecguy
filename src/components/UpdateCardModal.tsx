import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateCard from "./UpdateCard";

interface UpdateCardModalProps {
  show: boolean;
  onHide: Function;
  cardId: string;
  refresh: Function;
}

const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({
  show,
  onHide,
  cardId,
  refresh,
}) => {
  return (
    <Modal show={show} onHide={() => onHide()} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Business Card Update </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateCard onHide={onHide} cardId={cardId} refresh={refresh} />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCardModal;
