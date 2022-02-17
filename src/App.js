import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import RoomAddModal from "./components/Modals/RoomAddModal";
import MemberAddModal from "./components/Modals/MemberAddModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
        <RoomAddModal/>
        <MemberAddModal/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
