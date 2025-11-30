import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProduct } from "../Services/productsService";
import Product from "../Interfaces/Product";

interface AddProductProps {
  onHide: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ onHide }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      quantity: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required(),
      description: Yup.string().min(5).required(),
      price: Yup.number().min(0).required(),
      category: Yup.string().min(2).required(),
      image: Yup.string().url().required(),
      quantity: Yup.number().min(0).required(),
    }),
    onSubmit: (values) => {
      const newProduct: Product = { ...values };
      addProduct(newProduct)
        .then(() => {
          alert("Product added successfully!");
          onHide();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-danger">{formik.errors.name}</small>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <small className="text-danger">{formik.errors.description}</small>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <small className="text-danger">{formik.errors.price}</small>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.category && formik.errors.category && (
            <small className="text-danger">{formik.errors.category}</small>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <small className="text-danger">{formik.errors.image}</small>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <small className="text-danger">{formik.errors.quantity}</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={!formik.isValid}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
