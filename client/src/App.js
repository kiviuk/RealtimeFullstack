import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import UpdateAvatar from "./components/UpdateAvatar";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/update-avatar" element={<UpdateAvatar />}/>
                <Route path="/" element={<Chat />}/>
                <Route path="/chat" element={<Chat />}/>
            </Routes>
        </BrowserRouter>);
};
