import { FunctionComponent } from "react";
import { deleteCard } from "../Services/CardService";

interface DeleteCardProps {
  onHide: Function;
  cardId: string;
  refresh: Function;
}

const DeleteCard: FunctionComponent<DeleteCardProps> = ({
  onHide,
  cardId,
  refresh,
}) => {
  const handleDelete = () => {
    deleteCard(cardId)
      .then(() => {
        onHide();
        refresh();
        alert("Card deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting card");
      });
  };

  return (
    <>
      <div className="container text-center">
        <h5 className="mb-4">Are you sure you want to delete this card?</h5>
        <p className="text-muted">This action cannot be undone.</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-secondary" onClick={() => onHide()}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCard;
