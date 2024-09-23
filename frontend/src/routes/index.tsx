import AdminOwnerLayout from "@/layouts/admin-owner-layout";
import AuthLayout from "@/layouts/auth-layout";
import RenterLayout from "@/layouts/renter-layout";
import SignIn from "@/pages/(auth)/sign-in";
import SignUp from "@/pages/(auth)/sign-up";
import Dashboard from "@/pages/(root)/_shared/dashboard";
import Notifications from "@/pages/(root)/_shared/notifications";
import Settings from "@/pages/(root)/_shared/settings";
import BookCatalogs from "@/pages/(root)/admin/book-catalogs";
import BookOwners from "@/pages/(root)/admin/book-owners";
import NotFound from "@/pages/(root)/not-found";
import BookUpload from "@/pages/(root)/owner/book-upload";
import BookDetail from "@/pages/(root)/renter/book-detail";
import Home from "@/pages/(root)/renter/home";
import Rentals from "@/pages/(root)/renter/rentals";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import ProtectedRouteAuth from "./protected-route-auth";
import ProtectedRouteAbility from "./protected-route-ability";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public Route */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
            {/* Private Route */}
            <Route element={<ProtectedRouteAuth />}>
                <Route
                    element={
                        <ProtectedRouteAbility
                            subject="admin-owner-layout"
                            fallbackRoute="/home"
                        />
                    }>
                    <Route element={<AdminOwnerLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            element={
                                <ProtectedRouteAbility
                                    subject="book-catalogs"
                                    fallbackRoute="/not-found"
                                />
                            }>
                            <Route
                                path="/book-catalogs"
                                element={<BookCatalogs />}
                            />
                            <Route path="/owners" element={<BookOwners />} />
                        </Route>
                        <Route
                            element={
                                <ProtectedRouteAbility
                                    subject="upload-book"
                                    fallbackRoute="/not-found"
                                />
                            }>
                            <Route
                                path="/upload-book"
                                element={<BookUpload />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
                <Route
                    element={
                        <ProtectedRouteAbility
                            subject="renter-layout"
                            fallbackRoute="/dashboard"
                        />
                    }>
                    <Route element={<RenterLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/books/:bookId" element={<BookDetail />} />
                        <Route path="/rentals" element={<Rentals />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </>
    )
);

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
