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
  Calendar,
} from "antd";
import {
  getTask,
  updateTask,
  createTask,
  deleteTask,
} from "../../services/service";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const TaskManagement = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchtask, setSearchtask] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const result = await getTask();
      setTasks(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const filteredTasks = tasks.filter((item) =>
    item.destination.toLowerCase().includes(searchtask.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
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
    form.setFieldValue("user_id", record.user_id);
    form.setFieldValue("vehicle_id", record.vehicle_id);
    form.setFieldValue("inventory_id", record.inventory_id);
    form.setFieldValue("destination", record.destination);
    form.setFieldValue("status", record.status);
    setSelectedID(record.ID);
    setIsEdit(true);
    setIsDrawer((prev) => !prev);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", form.getFieldValue("user_id"));
    formData.append("vehicle_id", form.getFieldValue("vehicle_id"));
    formData.append("inventory_id", form.getFieldValue("inventory_id"));
    formData.append("destination", form.getFieldValue("destination"));
    formData.append("status", form.getFieldValue("status"));
    try {
      if (isEdit) {
        await updateTask(selectedID, formData);
        message.success("Successfully Edit Data!");
      } else {
        await createTask(formData);
        message.success("Successfully Add Data!");
      }
      form.resetFields();
      fetchTasks();
      onClose();
    } catch (error) {
      message.error("Failed to add data");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteTask(id);
      message.success("Successfully delete Data!");
      fetchTasks();
    } catch (error) {
      message.error("Failed to delete Data!");
      throw error;
    }
  };

  const tableColumns = [
    {
      title: "User",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "vehicle",
      dataIndex: "vehicle_id",
      key: "vehicle_id",
    },
    {
      title: "Inventory",
      dataIndex: "inventory_id",
      key: "inventory_id",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
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
        <h1 className="text-3xl font-bold">Task management</h1>
        <p className="text-gray-600">Manage task efficiently</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 mb-6 gap-4">
        <Card className="bg-yellow-400 hover:scale-105 transition-all ease-in-out duration-300">
          <h2 className="text-gray-700 font-semibold">Total Pending</h2>
          <p className="text-2xl font-bold">
            {tasks.filter((item) => item.status.includes("pending")).length}
          </p>
        </Card>
        <Card className="bg-blue-400 hover:scale-105 transition-all ease-in-out duration-300">
          <h2 className="text-gray-700 font-semibold">Total In Progress</h2>
          <p className="text-2xl font-bold">
            {tasks.filter((item) => item.status.includes("in_progress")).length}
          </p>
        </Card>
        <Card className="bg-green-400 hover:scale-105 transition-all ease-in-out duration-300">
          <h2 className="text-gray-700 font-semibold">Total Completed</h2>
          <p className="text-2xl font-bold">
            {tasks.filter((item) => item.status.includes("completed")).length}
          </p>
        </Card>
        <Card className="bg-red-400 hover:scale-105 transition-all ease-in-out duration-300">
          <h2 className="text-gray-700 font-semibold">Total Cancelled</h2>
          <p className="text-2xl font-bold">
            {tasks.filter((item) => item.status.includes("cancelled")).length}
          </p>
        </Card>
      </div>

      <Card>
        <Calendar onPanelChange={onPanelChange} />
      </Card>

      <Drawer
        open={isDrawer}
        onClose={onClose}
        title={isEdit ? "Edit Data Vehicles" : "Create Data Vehicles"}
        className="bg-white shadow-lg p-6 rounded-lg"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="user_id" label="user" className="mb-4">
            <Input
              placeholder="Enter user"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>
          <Form.Item name="vehicle_id" label="Vehicle" className="mb-4">
            <Input
              placeholder="Enter vehicle"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>
          <Form.Item name="inventory_id" label="Inventory" className="mb-4">
            <Input
              placeholder="Enter inventory"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="destination" label="Destination" className="mb-4">
            <Input
              placeholder="Enter destination"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="status" label="Status" className="mb-4">
            <Select
              placeholder="Select status"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Option value="pending">Pending</Option>
              <Option value="in_progress">In Progress</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
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
      <Card className="my-6">
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-slate-700 font-semibold text-lg">
              Total Tasks <span className="text-gray-500">{tasks.length}</span>
            </Text>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Input
              placeholder="search..."
              allowClear
              className="p-1 text-gray-600"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchtask(e.target.value)}
            />
            <Button icon={<PlusOutlined />} onClick={handleOpen} type="primary">
              Add Task
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        {tasks.length > 0 && !isLoading ? (
          <Table
            className="custom-ant-table"
            dataSource={filteredTasks}
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

export default TaskManagement;
