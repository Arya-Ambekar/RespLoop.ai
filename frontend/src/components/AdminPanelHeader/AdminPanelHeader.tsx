import botIconImg from "../../assets/chatboticonimg.png";
import "./AdminPanelHeader.css";
import SearchBar from "../SearchBar/SearchBar.tsx";

const AdminPanelHeader = () => {
  return (
    <div className="admin-panel-header-wrapper">
      <div className="left-admin-panel-header">
        <div className="admin-panel-header-icon-wrapper">
          <img className="admin-panel-header-icon-img" src={botIconImg} />
          <div className="admin-panel-header-info">
            <p>RespLoop.ai</p>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
