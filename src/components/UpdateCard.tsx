import { useFormik } from "formik";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import CardInterface from "../Interfaces/Card";
import { getCardById, updateCard } from "../Services/CardService";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

interface UpdateCardProps {
  onHide: Function;
  cardId: string;
  refresh: Function;
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({
  onHide,
  cardId,
  refresh,
}) => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data fetching
  const [card, setCard] = useState<CardInterface>({
    // Card data state
    id: "",
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    bizNumber: "",
    likes: [],
    userId: "",
  });

  // Function to normalize card data
  const normalizeCard = (data: any): CardInterface => ({
    id: data.id || data._id || "",
    title: data.title || "",
    subtitle: data.subtitle || "",
    description: data.description || "",
    phone: data.phone || "",
    email: data.email || "",
    web: data.web || "",
    image: {
      url: data.image?.url || "",
      alt: data.image?.alt || "",
    },
    address: {
      state: data.address?.state || "",
      country: data.address?.country || "",
      city: data.address?.city || "",
      street: data.address?.street || "",
      houseNumber: data.address?.houseNumber?.toString() || "",
      zip: data.address?.zip?.toString() || "",
    },
    bizNumber: data.bizNumber?.toString() || "",
    likes: data.likes || [],
    userId: data.userId || sessionStorage.getItem("userId") || "",
  });

  // Fetch card details on component
  useEffect(() => {
    setLoading(true);
    getCardById(cardId)
      .then((res) => {
        setCard(normalizeCard(res.data));
      })
      .catch(() => {
        toast.error("Failed to load card details");
      })
      .finally(() => setLoading(false));
  }, [cardId]);
  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: card,
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required().min(2),
      subtitle: yup.string().required().min(2),
      description: yup.string().required().min(2),
      phone: yup.string().required().min(9),
      email: yup.string().required().email(),
      web: yup.string().url(),
      image: yup.object({
        url: yup.string().required().url(),
        alt: yup.string().required().min(2),
      }),
      address: yup.object({
        state: yup.string(),
        country: yup.string().required().min(2),
        city: yup.string().required().min(2),
        street: yup.string().required().min(2),
        houseNumber: yup.string().required(),
        zip: yup.string().required(),
      }),
    }),
    // Handle form submission
    onSubmit: (values) => {
      const update = {
        ...values,
        userId:
          values.userId ||
          card.userId ||
          sessionStorage.getItem("userId") ||
          "",
      };
      // Call updateCard service
      updateCard(cardId, update)
        .then(() => {
          toast.success("Card updated successfully!");
          onHide();
          refresh();
        })
        .catch(() => {
          toast.error("Failed to update card");
        });
    },
  });

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container w-75">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Card Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="title">Company Name</label>
              {formik.touched.title && formik.errors.title && (
                <span className="text-danger">{formik.errors.title}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="subtitle"
                placeholder="Subtitle"
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="subtitle">Field</label>
              {formik.touched.subtitle && formik.errors.subtitle && (
                <span className="text-danger">{formik.errors.subtitle}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "100px" }}
              />
              <label htmlFor="description">Company Description</label>
              {formik.touched.description && formik.errors.description && (
                <span className="text-danger">{formik.errors.description}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="05________"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="phone">Phone</label>
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-danger">{formik.errors.phone}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="email">Email</label>
              {formik.touched.email && formik.errors.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                id="web"
                placeholder="https://www.siteName.com"
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="web">Website URL</label>
              {formik.touched.web && formik.errors.web && (
                <span className="text-danger">{formik.errors.web}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                id="image.url"
                placeholder="https://example.com/image.jpg"
                value={formik.values.image?.url || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="image.url">Image URL</label>
              {formik.touched.image?.url && formik.errors.image?.url && (
                <span className="text-danger">{formik.errors.image.url}</span>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="image.alt"
                placeholder="Image description"
                value={formik.values.image?.alt || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="image.alt">Image Alt Text</label>
              {formik.touched.image?.alt && formik.errors.image?.alt && (
                <span className="text-danger">{formik.errors.image.alt}</span>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.country"
                    placeholder="Israel"
                    value={formik.values.address?.country || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.country">Country</label>
                  {formik.touched.address?.country &&
                    formik.errors.address?.country && (
                      <span className="text-danger">
                        {formik.errors.address.country}
                      </span>
                    )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.city"
                    placeholder="City"
                    value={formik.values.address?.city || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.city">City</label>
                  {formik.touched.address?.city &&
                    formik.errors.address?.city && (
                      <span className="text-danger">
                        {formik.errors.address.city}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.street"
                    placeholder="Main Street"
                    value={formik.values.address?.street || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.street">Street</label>
                  {formik.touched.address?.street &&
                    formik.errors.address?.street && (
                      <span className="text-danger">
                        {formik.errors.address.street}
                      </span>
                    )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.houseNumber"
                    placeholder="123"
                    value={formik.values.address?.houseNumber || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.houseNumber">House Number</label>
                  {formik.touched.address?.houseNumber &&
                    formik.errors.address?.houseNumber && (
                      <span className="text-danger">
                        {formik.errors.address.houseNumber}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.zip"
                    placeholder="12345"
                    value={formik.values.address?.zip || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.zip">Zip Code</label>
                  {formik.touched.address?.zip &&
                    formik.errors.address?.zip && (
                      <span className="text-danger">
                        {formik.errors.address.zip}
                      </span>
                    )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address.state"
                    placeholder="State (optional)"
                    value={formik.values.address?.state || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="address.state">State (Optional)</label>
                </div>
              </div>
            </div>
            <button className="btn btn-warning w-100" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateCard;
