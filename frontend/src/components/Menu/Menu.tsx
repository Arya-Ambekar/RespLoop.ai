import { NavLink } from "react-router-dom";
import { MessagesSquare, Tag } from "lucide-react";

import "./Menu.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menuSelector, setActiveMenu } from "../../slices/menu/menuSlice";
import { views } from "../../slices/menu/menuTypes";

const Menu = () => {
  const dispatch = useAppDispatch();
  const { activeView } = useAppSelector(menuSelector);

  console.log(activeView);

  return (
    <div className="menu-wrapper">
      <NavLink
        to={"/admin/conversations"}
        className={({ isActive }) =>
          isActive ? "selected-menu-option" : "menu-option"
        }
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          dispatch(setActiveMenu(views.CONVERSATIONS));
        }}
      >
        <div
          className={
            activeView === views.CONVERSATIONS
              ? "selected-menu-option-icon-wrapper"
              : "menu-option-icon-wrapper"
          }
        >
          <MessagesSquare
            className={
              activeView === views.CONVERSATIONS
                ? "selected-menu-option-icon"
                : "menu-option-icon"
            }
          />
        </div>
        <p
          className={
            activeView === views.CONVERSATIONS
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
          dispatch(setActiveMenu(views.TICKETS));
        }}
      >
        <div
          className={
            activeView === views.TICKETS
              ? "selected-menu-option-icon-wrapper"
              : "menu-option-icon-wrapper"
          }
        >
          <Tag
            className={
              activeView === views.TICKETS
                ? "selected-menu-option-icon"
                : "menu-option-icon"
            }
          />
        </div>
        <p
          className={
            activeView === views.TICKETS
              ? "selected-menu-option-name"
              : "menu-option-name"
          }
        >
          Tickets
        </p>
      </NavLink>
      <NavLink
        to={"/admin/improveagent"}
        className={({ isActive }) =>
          isActive ? "selected-menu-option" : "menu-option"
        }
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          dispatch(setActiveMenu(views.IMPROVEAGENT));
        }}
      >
        <div
          className={
            activeView === views.IMPROVEAGENT
              ? "selected-menu-option-icon-wrapper"
              : "menu-option-icon-wrapper"
          }
        >
          <Tag
            className={
              activeView === views.IMPROVEAGENT
                ? "selected-menu-option-icon"
                : "menu-option-icon"
            }
          />
        </div>
        <p
          className={
            activeView === views.IMPROVEAGENT
              ? "selected-menu-option-name"
              : "menu-option-name"
          }
        >
          Improve Agent
        </p>
      </NavLink>
    </div>
  );
};

export default Menu;
