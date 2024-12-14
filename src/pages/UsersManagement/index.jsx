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
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../../services/service";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUsers, setSearchUsers] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getUsers();
      setUsers(result.datas);
      console.log(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(searchUsers.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
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
    form.setFieldValue("email", record.email);
    form.setFieldValue("role", record.role);
    setSelectedID(record.ID);
    setIsEdit(true);
    setIsDrawer((prev) => !prev);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.getFieldValue("name"));
    formData.append("email", form.getFieldValue("email"));
    formData.append("role", form.getFieldValue("role"));
    try {
      if (isEdit) {
        await updateUser(selectedID, formData);
        message.success("Successfully Edit Data!");
      } else {
        await createUser(formData);
        message.success("Successfully Add Data!");
      }
      form.resetFields();
      fetchUsers();
      onClose();
    } catch (error) {
      message.error("Failed to add data");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteUser(id);
      message.success("Successfully delete users!");
      fetchUsers();
    } catch (error) {
      message.error("Failed delete users!");
      throw error;
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
        <h1 className="text-3xl font-bold">User management</h1>
        <p className="text-gray-600">Manage users efficiently</p>
      </header>
      <Drawer
        open={isDrawer}
        onClose={onClose}
        title={isEdit ? "Edit Data Vehicles" : "Create Data Vehicles"}
        className="bg-white shadow-lg p-6 rounded-lg"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" className="mb-4">
            <Input
              placeholder="Enter Name User"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="email" label="Email" className="mb-4">
            <Input
              placeholder="Enter email users"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="role" label="Role" className="mb-4">
            <Select
              placeholder="Select role"
              className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Option value="admin">Admin</Option>
              <Option value="staff">Staff</Option>
              <Option value="driver">Driver</Option>
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
              Total Users <span className="text-gray-500">{users.length}</span>
            </Text>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Input
              placeholder="search..."
              allowClear
              className="p-1 text-gray-600"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchUsers(e.target.value)}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleOpen()}
            >
              Add Users
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        {users.length > 0 && !isLoading ? (
          <Table
            className="custom-ant-table"
            dataSource={filteredUsers}
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

export default UserManagement;
