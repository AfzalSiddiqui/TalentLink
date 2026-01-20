import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FaceId from "./components/FaceId";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route 
          path="/face-id" 
          element={
            <FaceId 
              onSuccess={() => {
                console.log("Face ID authentication successful!");
                window.location.href = "/login";
              }}
              onError={(error) => console.error("Face ID error:", error)}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
