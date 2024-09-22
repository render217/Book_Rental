import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import TableViewIcon from "@mui/icons-material/TableView";
export const SIDEBAR_ITEMS = [
    {
        path: "/",
        label: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        path: "/book-catalogs",
        label: "Books",
        icon: <CollectionsBookmarkIcon />,
    },
    {
        path: "/owners",
        label: "Owners",
        icon: <PersonOutlineIcon />,
    },
    {
        path: "/upload-book",
        label: "Book Upload",
        icon: <BookIcon />,
    },
    {
        path: "/tables",
        label: "Tables",
        icon: <TableViewIcon />,
    },
];

export const SIDEBAR_ITEMS_2 = [
    {
        path: "/notifications",
        label: "Notification",
        icon: <NotificationsIcon />,
    },
    {
        path: "/settings",
        label: "Settings",
        icon: <SettingsIcon />,
    },
    {
        path: "/sign-in",
        label: "Login In as Owner",
        icon: <AccountCircleOutlinedIcon />,
    },
    {
        path: "/sign-in",
        label: "Login In as Admin",
        icon: <AccountCircleOutlinedIcon />,
    },
];
