import { Outlet } from "react-router-dom";
export default function AuthLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div>
            <p>auth layout</p>
            <>{children ? children : <Outlet />}</>
        </div>
    );
}
