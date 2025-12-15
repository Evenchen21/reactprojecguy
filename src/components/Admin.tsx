import { FunctionComponent } from "react";

interface AdminProps {}

const Admin: FunctionComponent<AdminProps> = () => {
  return (
    <>
      <img
        src="https://learn.microsoft.com/en-us/power-pages/admin/media/maintenance-mode/maintenance-page.png"
        alt="Admin Page is under maintenance"
      />
    </>
  );
};

export default Admin;
