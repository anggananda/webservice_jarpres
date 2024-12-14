import axios from "axios";

const baseUrl = "http://localhost:8080";

const service = axios.create({
  baseURL: baseUrl,
});

export const getUsers = async () => {
  try {
    const response = await service.get("/api/v1/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByID = async (id) => {
  try {
    const reponse = await service.get(`/api/v1/users/${id}`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (values) => {
  try {
    const reponse = await service.post("/api/v1/user", values);
    return reponse.status;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, values) => {
  try {
    const response = await service.put(`/api/v1/users/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const reponse = await service.delete(`/api/v1/users/${id}`);
    return reponse.status;
  } catch (error) {
    throw error;
  }
};

// Inventory

export const createInventory = async (values) => {
  try {
    const response = await service.post("/api/v1/inventory", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getInventory = async () => {
  try {
    const response = await service.get("/api/v1/inventory");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateInventory = async (id, values) => {
  try {
    const response = await service.put(`/api/v1/inventory/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteInventory = async (id) => {
  try {
    const response = await service.delete(`/api/v1/inventory/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// vehicles
export const createVehicles = async (values) => {
  try {
    const response = await service.post("/api/v1/vehicles", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getVehicles = async () => {
  try {
    const response = await service.get("/api/v1/vehicles");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVehicles = async (id, values) => {
  try {
    const response = await service.put(`/api/v1/vehicles/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicles = async (id) => {
  try {
    const response = await service.delete(`/api/v1/vehicles/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Tasks
export const createTask = async (values) => {
  try {
    const response = await service.post("/api/v1/task", values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getTask = async () => {
  try {
    const response = await service.get("/api/v1/task");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id, values) => {
  try {
    const response = await service.put(`/api/v1/task/${id}`, values);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await service.delete(`/api/v1/task/${id}`);
  } catch (error) {
    throw error;
  }
};
