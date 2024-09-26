// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function QueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <ToastProvider />
        </QueryClientProvider>
    );
}

function ToastProvider() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );
}
