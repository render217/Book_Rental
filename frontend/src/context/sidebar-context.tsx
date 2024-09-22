import { useMediaQuery } from "@mui/material";
import useUIStore from "@/store/useUIStore";
import { useEffect } from "react";
export default function SidebarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const matchMinScreen = useMediaQuery("(max-width:1024px)");
    const { isSideBarCollapsed, closeSideBar, setMinScreen } = useUIStore();
    useEffect(() => {
        if (matchMinScreen) {
            setMinScreen(true);
        } else {
            setMinScreen(false);
        }
    }, [matchMinScreen, isSideBarCollapsed, closeSideBar, setMinScreen]);
    return <>{children}</>;
}
