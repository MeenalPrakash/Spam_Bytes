import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import { store } from "../app/store";
import {pending,resolved, reset} from "../features/ticket/TicketSlice";
import ReportIcon from '@mui/icons-material/Report';

const menus = {
  user: {
    header: "User Dashboard",
    nSections: 1,
    sectionList: [
      [
        {
          label: "All Reported Children",
          Icon: FormatListNumberedIcon,
          link: "/in",
        },
        {
          label: "User Profile",
          Icon: AccountCircleIcon,
          link: "/user/profile",
        },
        {
          label: "Report Child",
          Icon: ReportIcon,
          link: "/reportchild",
        },
      ],
    ],
  },
  nodal: {
    header: "Nodal Officer's Dashboard",
    nSections: 3,
    sectionList: [
      [
        {
          label: "Dashboard",
          Icon: DashboardIcon,
          link: "/admin/",
        },
        {
          label: "Officer's Profile",
          Icon: AccountCircleIcon,
          link: "/admin/profile",
        },
      ],
      [
        {
          label: "All Complaints",
          Icon: CallToActionIcon,
          link: null,
          onClick: () => {
            store.dispatch(reset())
            window.location.href = '/alltickets/';
          }
        },
        {
          label: "Pending Complaints",
          Icon: PendingIcon,
          link: null,
          onClick: () => store.dispatch(pending())
        },
        {
          label: "Resolved Complaint",
          Icon: VerifiedIcon,
          link: null,
          onClick: () => store.dispatch(resolved()),
        },
      ],
      [
       
        {
          label: "Logout",
          Icon: LogoutIcon,
          link: "/logout",
        },
        
      ],
      
    ],
  },
  ngo: {
    header: "NGO Dashboard",
    nSections: 2,
    sectionList: [
      [
        {
          label: "Dashboard",
          Icon: DashboardIcon,
          link: "/ngo/",
        },
      ],
      [
        {
          label: "All Child",
          Icon: FormatListBulletedIcon,
          link: null,
        },
        {
          label: "Accepted Child",
          Icon: AccountCircleIcon,
          link: null,
        },
        {
          label: "Logout",
          Icon: LogoutIcon,
          link: "/logout",
        },
      ],
    ],
  },
};

export default menus;
