import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MessagesSquare, Tag } from "lucide-react";

import "./Menu.css";

const Menu = () => {
  const [isConversationMenu, setIsConversationMenu] = useState(true);
  const [isTicketsMenu, setisTicketsMenu] = useState(false);

  return (
    <div className="menu-wrapper">
      <NavLink
        to={"/admin/conversations"}
        className={({ isActive }) =>
          isActive ? "selected-menu-option" : "menu-option"
        }
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          setIsConversationMenu(true);
          setisTicketsMenu(false);
        }}
      >
        <div
          className={
            isConversationMenu
              ? "selected-menu-option-icon-wrapper"
              : "menu-option-icon-wrapper"
          }
        >
          <MessagesSquare
            className={
              isConversationMenu
                ? "selected-menu-option-icon"
                : "menu-option-icon"
            }
          />
        </div>
        <p
          className={
            isConversationMenu
              ? "selected-menu-option-name"
              : "menu-option-name"
          }
        >
          Conversations
        </p>
      </NavLink>
      <NavLink
        to={"/admin/tickets"}
        className={({ isActive }) =>
          isActive ? "selected-menu-option" : "menu-option"
        }
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          setisTicketsMenu(true);
          setIsConversationMenu(false);
        }}
      >
        <div
          className={
            isTicketsMenu
              ? "selected-menu-option-icon-wrapper"
              : "menu-option-icon-wrapper"
          }
        >
          <Tag
            className={
              isTicketsMenu ? "selected-menu-option-icon" : "menu-option-icon"
            }
          />
        </div>
        <p
          className={
            isTicketsMenu ? "selected-menu-option-name" : "menu-option-name"
          }
        >
          Tickets
        </p>
      </NavLink>
    </div>
  );
};

export default Menu;
