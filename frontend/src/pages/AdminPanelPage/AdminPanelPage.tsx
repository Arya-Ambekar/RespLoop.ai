import AdminPanelHeader from "../../components/AdminPanelHeader/AdminPanelHeader";
import "./AdminPanelPage.css";
import { MENU_OPTIONS } from "../../constants/menuOptions";
import { useState } from "react";

const AdminPanelPage = () => {
  const [selectedMenuOption, setSelectedMenuOption] = useState("conversations");

  return (
    <div className="admin-panel-page-wrapper">
      <div className="admin-panel-page-header">
        <AdminPanelHeader />
      </div>
      <div className="admin-panel-body-wrapper">
        <div className="menu-wrapper">
          {MENU_OPTIONS.map(({ id, label, Icon }) => {
            const selected = selectedMenuOption === id;

            return (
              <div
                key={id}
                className={selected ? "selected-menu-option" : "menu-option"}
                onClick={() => setSelectedMenuOption(id)}
              >
                <div
                  className={
                    selected
                      ? "selected-menu-option-icon-wrapper"
                      : "menu-option-icon-wrapper"
                  }
                >
                  <Icon
                    className={
                      selected
                        ? "selected-menu-option-icon"
                        : "menu-option-icon"
                    }
                  />
                </div>
                <p
                  className={
                    selected ? "selected-menu-option-name" : "menu-option-name"
                  }
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="admin-panel-main-body-wrapper"></div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
