import { Outlet } from "react-router-dom";

import AdminPanelHeader from "../../components/AdminPanelHeader/AdminPanelHeader";
import "./AdminPanelPage.css";
import Menu from "../../components/Menu/Menu";

const AdminPanelPage = () => {
  return (
    <div className="admin-panel-page-wrapper">
      <div className="admin-panel-page-header">
        <AdminPanelHeader />
      </div>
      <div className="admin-panel-body-wrapper">
        <Menu />
        <div className="admin-panel-main-body-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
