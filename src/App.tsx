import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import DeploymentPage from "./pages/DeploymentPage";
import ContainerPage from "./pages/ContainerPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/deployment" element={<DeploymentPage />} />
                    <Route path="/container" element={<ContainerPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
