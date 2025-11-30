import { FunctionComponent } from "react";
import { deleteProduct } from "../Services/productsService";

interface DeleteProductProps {
  onHide: Function;
  productId: string;
}

const DeleteProduct: FunctionComponent<DeleteProductProps> = ({
  onHide,
  productId,
}) => {
  const handleDelete = () => {
    deleteProduct(productId)
      .then(() => {
        alert("Product deleted successfully!");
        onHide();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container text-center">
      <h5>Are you sure you want to delete this product?</h5>
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
  );
};

export default DeleteProduct;
