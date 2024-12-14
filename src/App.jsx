import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import MainLayout from "./components/layout/Main";
import InventoryManagement from "./pages/InventoryManagement";
import VehiclesManagement from "./pages/VehiclesManagement";
import TaskManagement from "./pages/TaskManagement";

const App = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <MainLayout>
            {" "}
            <Dashboard />{" "}
          </MainLayout>
        }
      />
      <Route
        path="/users"
        element={
          <MainLayout>
            {" "}
            <UsersManagement />{" "}
          </MainLayout>
        }
      />
      <Route
        path="/inventory"
        element={
          <MainLayout>
            {" "}
            <InventoryManagement />{" "}
          </MainLayout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <MainLayout>
            {" "}
            <VehiclesManagement />{" "}
          </MainLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <MainLayout>
            {" "}
            <TaskManagement />{" "}
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
