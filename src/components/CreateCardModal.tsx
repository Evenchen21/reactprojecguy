import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";

interface CreateCardModalProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
}
// Modal component for creating a new card
const CreateCardModal: FunctionComponent<CreateCardModalProps> = ({
  show,
  onHide,
  refresh,
}) => {
  return (
    // Modal for creating a new card
    <Modal show={show} onHide={() => onHide()} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCard onHide={onHide} refresh={refresh} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateCardModal;
