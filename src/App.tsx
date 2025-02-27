import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import DeploymentPage from "./pages/DeploymentPage";
import ContainerPage from "./pages/ContainerPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<BaseLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/deployment"
                            element={<DeploymentPage />}
                        />
                        <Route path="/container" element={<ContainerPage />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}
