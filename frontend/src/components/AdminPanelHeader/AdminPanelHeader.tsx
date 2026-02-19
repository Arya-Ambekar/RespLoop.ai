import botIconImg from "../../assets/chatboticonimg.png";
import "./AdminPanelHeader.css";
import SearchBar from "../SearchBar/SearchBar.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { menuSelector } from "../../slices/menu/menuSlice.ts";
import { views } from "../../slices/menu/menuTypes.ts";
import { fetchConversations } from "../../slices/conversation/conversationSlice.ts";
import { fetchTickets } from "../../slices/ticket/ticketSlice.ts";
import { searchImproveAgentData } from "../../slices/improveAgent/improveAgentSlice.ts";
// import { useNavigate } from "react-router-dom";

const AdminPanelHeader = () => {
  let searchPlaceholder = "";

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeView } = useAppSelector(menuSelector);

  // console.log(activeView);
  const handleSearch = (query: string) => {
    if (activeView === views.CONVERSATIONS) {
      dispatch(fetchConversations({ search: query }));
    } else if (activeView === views.TICKETS) {
      dispatch(fetchTickets({ search: query }));
    } else if (activeView === views.IMPROVEAGENT) {
      dispatch(searchImproveAgentData(query));
    }
  };

  if (activeView === views.CONVERSATIONS) {
    searchPlaceholder = "search by user email";
  } else if (activeView === views.TICKETS) {
    searchPlaceholder = "search by conversation Id";
  } else if (activeView === views.IMPROVEAGENT) {
    searchPlaceholder = "search by conversation Id";
  }

  return (
    <div className="admin-panel-header-wrapper">
      <div className="left-admin-panel-header">
        <div
          className="admin-panel-header-icon-wrapper"
          // onClick={() => {
          //   navigate("/admin/conversations");
          //   setActiveMenu(views.CONVERSATIONS);
          // }}
        >
          <img className="admin-panel-header-icon-img" src={botIconImg} />
          <div className="admin-panel-header-info">
            <p>RespLoop.ai</p>
          </div>
        </div>
        <div>
          <SearchBar placeholder={searchPlaceholder} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
