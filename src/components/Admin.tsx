import { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../Services/UserService";
import User from "../Interfaces/User";

interface AdminProps {}

const Admin: FunctionComponent<AdminProps> = () => {
  const navigate = useNavigate(); // Navigation hook
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [saving, setSaving] = useState(false); // Saving state for updating user data
  const [me, setMe] = useState<User | null>(null); // Current logged-in user

  const [form, setForm] = useState({
    first: "",
    last: "",
    phone: "",
    imageUrl: "",
    imageAlt: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  // Fetch current user data
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true); // Set loading state to true before fetching user data
    getUserById()
      .then((res) => {
        const user: User = res.data;
        setMe(user);
        setForm({
          first: user.name?.first || "",
          last: user.name?.last || "",
          phone: user.phone || "",
          imageUrl: user.image?.url || "",
          imageAlt: user.image?.alt || "",
          country: user.address?.country || "",
          city: user.address?.city || "",
          street: user.address?.street || "",
          houseNumber: user.address?.houseNumber
            ? String(user.address.houseNumber)
            : "",
          zip: user.address?.zip ? String(user.address.zip) : "",
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data || err?.message || "Failed to load user"
        );
        setMe(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle form input changes
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated user data
  const onSave = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      toast.error("You must be logged in..");
      return;
    }
    // Check if user data is loaded , if not error and return
    if (!me) {
      toast.error("No user data loaded.");
      return;
    }

    // Proceed to save updated data
    setSaving(true);
    try {
      const updated = {
        name: {
          first: form.first,
          last: form.last,
        },
        phone: form.phone,
        image: {
          url: form.imageUrl,
          alt: form.imageAlt,
        },
        address: {
          country: form.country,
          city: form.city,
          street: form.street,
          houseNumber: form.houseNumber ? Number(form.houseNumber) : undefined,
          zip: form.zip ? Number(form.zip) : undefined,
        },
      };
      // Call update service
      const res = await updateUser(userId, updated as User);
      setMe(res.data || me);
      toast.success("Profile Updated");
    } catch (err: any) {
      toast.error(err?.response?.data || err?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  // Reset form to last loaded user data
  const onReset = () => {
    if (!me) return;
    setForm({
      first: me.name?.first || "",
      last: me.name?.last || "",
      phone: me.phone || "",
      imageUrl: me.image?.url || "",
      imageAlt: me.image?.alt || "",
      country: me.address?.country || "",
      city: me.address?.city || "",
      street: me.address?.street || "",
      houseNumber: me.address?.houseNumber
        ? String(me.address.houseNumber)
        : "",
      zip: me.address?.zip ? String(me.address.zip) : "",
    });
  };

  // If not logged in, prompt to login
  if (!sessionStorage.getItem("userId")) {
    return (
      <div className="container py-4">
        <h2 className="mb-3 text-center">Edit Profile</h2>
        <p className="text-muted text-center">
          Please login to edit your profile!
        </p>
      </div>
    );
  }
  return (
    // Edit Profile Form
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <img
          src="https://www.nicepng.com/png/detail/263-2635962_png-file-svg-admin-icon-png.pnghttps://www.nicepng.com/png/detail/263-2635962_png-file-svg-admin-icon-png.png"
          alt="Profile icon"
          style={{ width: 40, height: 40, marginRight: 12 }}
        />
        <h2 className="mb-0">Edit My Profile</h2>
      </div>
      <p className="text-muted mb-4 text-center">Edit my profile</p>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div className="bg-white border rounded-4 shadow-sm p-3 p-md-4">
          <Form>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    name="first"
                    value={form.first}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    name="last"
                    value={form.last}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Email (read-only)</Form.Label>
                  <Form.Control value={me?.email || ""} disabled />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Image Alt</Form.Label>
                  <Form.Control
                    name="imageAlt"
                    value={form.imageAlt}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={form.country}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={form.city}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    name="street"
                    value={form.street}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>House #</Form.Label>
                  <Form.Control
                    name="houseNumber"
                    value={form.houseNumber}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    name="zip"
                    value={form.zip}
                    onChange={onChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <Button
                // Save updated profile
                variant="primary"
                onClick={onSave}
                disabled={saving || loading}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                // Reset form to last loaded data
                variant="outline-secondary"
                onClick={onReset}
                disabled={!me || saving || loading}
              >
                Reset
              </Button>
              <Button
                // Navigate to Home
                variant="outline-primary"
                onClick={() => navigate("/home")}
                disabled={saving || loading}
              >
                <i className="fa-solid fa-home me-2"></i>
                Home
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Admin;
