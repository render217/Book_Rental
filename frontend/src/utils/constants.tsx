import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

export const COOKIE_TOKEN = "rental_token";
export type INavItem = {
    path: string;
    name: string;
    label: string;
    icon: JSX.Element;
};
export const SIDEBAR_ITEMS: INavItem[] = [
    {
        path: "/",
        name: "",
        label: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        path: "/book-catalogs",
        name: "",
        label: "Books",
        icon: <CollectionsBookmarkIcon />,
    },
    {
        path: "/owners",
        name: "",
        label: "Owners",
        icon: <PersonOutlineIcon />,
    },
    {
        path: "/upload-book",
        name: "",
        label: "Book Upload",
        icon: <BookIcon />,
    },
];

export const SIDEBAR_ITEMS_2: INavItem[] = [
    {
        path: "/notifications",
        name: "",
        label: "Notification",
        icon: <NotificationsIcon />,
    },
    {
        path: "/settings",
        name: "",
        label: "Settings",
        icon: <SettingsIcon />,
    },
    // {
    //     path: "/sign-in",
    //     name: "logout",
    //     label: "Login In as Owner",
    //     icon: <AccountCircleOutlinedIcon />,
    // },
    // {
    //     path: "/sign-in",
    //     name: "logout",
    //     label: "Login In as Admin",
    //     icon: <AccountCircleOutlinedIcon />,
    // },
];
