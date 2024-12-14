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
  Select,
  Popconfirm,
  message,
} from "antd";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../../services/service";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const InventoryManagement = () => {
  const [form] = Form.useForm();
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInventory, setSearchInventory] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const result = await getInventory();
      setInventories(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const filteredInventory = inventories.filter((item) =>
    item.name.toLowerCase().includes(searchInventory.toLowerCase())
  );

  useEffect(() => {
    fetchInventory();
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
    form.setFieldValue("name", record.name);
    form.setFieldValue("description", record.description);
    form.setFieldValue("quantity", record.quantity);
    form.setFieldValue("status", record.status);
    setSelectedID(record.ID);
    setIsEdit(true);
    setIsDrawer((prev) => !prev);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.getFieldValue("name"));
    formData.append("description", form.getFieldValue("description"));
    formData.append("quantity", form.getFieldValue("quantity"));
    formData.append("status", form.getFieldValue("status"));
    try {
      if (isEdit) {
        await updateInventory(selectedID, formData);
        message.success("Successfully Edit Data!");
      } else {
        await createInventory(formData);
        message.success("Successfully Add Data!");
      }
      form.resetFields();
      fetchInventory();
      onClose();
    } catch (error) {
      message.error("Failed to add data");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteInventory(id);
      message.success("Successfully delete Data!");
      fetchInventory();
    } catch (error) {
      message.error("Failed to delete Data!");
      throw error;
    }
  };

  const tableColumns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
        <h1 className="text-3xl font-bold">Inventory management</h1>
        <p className="text-gray-600">Manage inventory efficiently</p>
      </header>
      <Drawer
        open={isDrawer}
        onClose={onClose}
        title={isEdit ? "Edit Data Vehicles" : "Create Data Vehicles"}
        className="bg-white shadow-lg p-6 rounded-lg"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="name" className="mb-4">
            <Input
              placeholder="Enter name inventory"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="description" label="Description" className="mb-4">
            <Input
              placeholder="Enter description"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="quantity" label="Quantity" className="mb-4">
            <Input
              placeholder="Enter Quantity"
              type="number"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="status" label="Status" className="mb-4">
            <Select
              placeholder="Select status"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Option value="available">Available</Option>
              <Option value="reserved">Reserved</Option>
              <Option value="damaged">Damaged</Option>
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
              Total Inventory{" "}
              <span className="text-gray-500">{inventories.length}</span>
            </Text>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Input
              placeholder="search..."
              allowClear
              className="p-1 text-gray-600"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchInventory(e.target.value)}
            />
            <Button icon={<PlusOutlined />} onClick={handleOpen} type="primary">
              Add Inventory
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        {inventories.length > 0 && !isLoading ? (
          <Table
            className="custom-ant-table"
            dataSource={filteredInventory}
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

export default InventoryManagement;
