// import AdminOwnerLayout from "@/layouts/admin-owner-layout";
// import AuthLayout from "@/layouts/auth-layout";
// import SignIn from "@/pages/(auth)/sign-in";
// import SignUp from "@/pages/(auth)/sign-up";
// import Dashboard from "@/pages/(root)/_shared/dashboard";
// import Notifications from "@/pages/(root)/_shared/notifications";
// import Settings from "@/pages/(root)/_shared/settings";
// import BookCatalogs from "@/pages/(root)/admin/book-catalogs";
// import BookOwners from "@/pages/(root)/admin/book-owners";
// import NotFound from "@/pages/(root)/not-found";
// import BookUpload from "@/pages/(root)/owner/book-upload";

import AdminOwnerLayout from "@/layouts/admin-owner-layout";
import AuthLayout from "@/layouts/auth-layout";
import SignIn from "@/pages/(auth)/sign-in";
import SignUp from "@/pages/(auth)/sign-up";
import Dashboard from "@/pages/(root)/_shared/dashboard";
import Notifications from "@/pages/(root)/_shared/notifications";
import Settings from "@/pages/(root)/_shared/settings";
import BookCatalogs from "@/pages/(root)/admin/book-catalogs";
import BookOwners from "@/pages/(root)/admin/book-owners";
import NotFound from "@/pages/(root)/not-found";
import BookUpload from "@/pages/(root)/owner/book-upload";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>

            <Route element={<AdminOwnerLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/book-catalogs" element={<BookCatalogs />} />
                <Route path="/owners" element={<BookOwners />} />
                <Route path="/upload-book" element={<BookUpload />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </>
    )
);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
