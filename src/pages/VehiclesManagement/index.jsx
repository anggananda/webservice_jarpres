import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Drawer,
  Form,
  Input,
  Button,
  Typography,
  Skeleton,
  message,
  Popconfirm,
  Select,
} from "antd";
import {
  createVehicles,
  deleteVehicles,
  getVehicles,
  updateVehicles,
} from "../../services/service";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const VehiclesManagement = () => {
  const [form] = Form.useForm();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVehicles, setSearchVehicles] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const result = await getVehicles();
      setVehicles(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const filteredVehicles = vehicles.filter((item) =>
    item.brand.toLowerCase().includes(searchVehicles.toLowerCase())
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onClose = () => {
    if (isEdit) {
      setIsEdit(false);
      setSelectedID(null);
    }
    form.resetFields();
    setIsDrawer(false);
  };

  const handleOpen = () => {
    setIsDrawer((prev) => !prev);
  };

  const handleEdit = (record) => {
    form.setFieldValue("license_plate", record.license_plate);
    form.setFieldValue("brand", record.brand);
    form.setFieldValue("status", record.status);
    setSelectedID(record.ID);
    setIsEdit(true);
    setIsDrawer((prev) => !prev);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("license_plate", form.getFieldValue("license_plate"));
    formData.append("brand", form.getFieldValue("brand"));
    formData.append("status", form.getFieldValue("status"));
    try {
      if (isEdit) {
        await updateVehicles(selectedID, formData);
        message.success("Successfully Edit Data!");
      } else {
        await createVehicles(formData);
        message.success("Successfully Add Data!");
      }
      form.resetFields();
      fetchVehicles();
      onClose();
    } catch (error) {
      message.error("Failed to add data");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteVehicles(id);
      message.success("Successfully Add Data!");
      fetchVehicles();
    } catch (error) {
      throw error;
    }
  };

  const tableColumns = [
    {
      title: "Item",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-1 justify-center items-center">
          <Button
            type="normal"
            className="bg-green-800 text-white hover:bg-green-700"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.ID)}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Vehicle management</h1>
        <p className="text-gray-600">Manage vehicle efficiently</p>
      </header>
      <Drawer
        open={isDrawer}
        onClose={onClose}
        title={isEdit ? "Edit Data Vehicles" : "Create Data Vehicles"}
        className="bg-white shadow-lg p-6 rounded-lg"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="license_plate"
            label="License Plate"
            className="mb-4"
          >
            <Input
              placeholder="Enter license plate"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="brand" label="Brand" className="mb-4">
            <Input
              placeholder="Enter brand"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="status" label="Status" className="mb-4">
            <Select
              placeholder="Select status"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="maintenance">Maintenance</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            >
              Post Item
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-slate-700 font-semibold text-lg">
              Total Vehicles{" "}
              <span className="text-gray-500">{vehicles.length}</span>
            </Text>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Input
              placeholder="search..."
              allowClear
              className="p-1 text-gray-600"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchVehicles(e.target.value)}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleOpen()}
            >
              Add Vehicles
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        {vehicles.length > 0 && !isLoading ? (
          <Table
            className="custom-ant-table"
            dataSource={filteredVehicles}
            columns={tableColumns}
            rowKey="ID"
            pagination={{ pageSize: 5 }}
          />
        ) : isLoading ? (
          <Skeleton active={true} />
        ) : (
          <Table
            className="custom-ant-table"
            columns={tableColumns}
            rowKey="ID"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default VehiclesManagement;
