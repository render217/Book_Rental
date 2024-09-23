import AllRoutes from "./routes";
import AuthProvider from "./context/auth-provider";
import AbilityProvider from "./context/ability-provider";
import QueryProvider from "./services/react-query/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <QueryProvider>
            <AuthProvider>
                <AbilityProvider>
                    <AllRoutes />
                </AbilityProvider>
            </AuthProvider>
        </QueryProvider>
    );
}

export default App;
