import React from "react";
const DeniedPage: React.FC = () => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8d7da",
        color: "#721c24"
    }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
    </div>
);

export default DeniedPage;