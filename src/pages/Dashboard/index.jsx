import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Table, Button, Card } from "antd";
import { getInventory, getTask, getVehicles } from "../../services/service";

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const [inventoryChartData, setInventoryChartData] = useState([]);
  const [vehicleChartData, setVehicleChartData] = useState([]);
  const [taskChartData, setTaskChartData] = useState([]);

  const fetchInventory = async () => {
    try {
      const result = await getInventory();
      console.log("Inventory Data:", result.datas);

      // Set data ke state tabel
      setInventoryData(result.datas);

      // Proses data untuk chart
      const inventoryNames = result.datas.map((item) => item.name);
      const inventoryQuantities = result.datas.map((item) => item.quantity);

      // Update data chart
      setInventoryChartData([
        {
          name: "Stock Count",
          data: inventoryQuantities,
        },
      ]);

      // Update kategori chart
      setInventoryChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: inventoryNames,
        },
      }));
    } catch (error) {
      console.error("Error in fetchInventory:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const result = await getVehicles();
      console.log("Vehicles Data:", result.datas);

      // Set data ke state tabel
      setVehicleData(result.datas);

      // Proses data untuk chart
      const vehicleStatuses = ["active", "inactive", "maintenance"];
      const vehicleCounts = vehicleStatuses.map(
        (status) => result.datas.filter((v) => v.status === status).length
      );

      // Update data chart
      setVehicleChartData(vehicleCounts);
    } catch (error) {
      console.error("Error in fetchVehicles:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const result = await getTask();
      console.log("Vehicles Data:", result.datas);

      // Set data ke state tabel
      setTaskData(result.datas);

      // Proses data untuk chart
      const taskStatuses = ["pending", "in_progress", "completed", "cancelled"];
      const taskCounts = taskStatuses.map(
        (status) => result.datas.filter((v) => v.status === status).length
      );

      // Update data chart
      setTaskChartData(taskCounts);
    } catch (error) {
      console.error("Error in fetchVehicles:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Data untuk Inventory (Bar Chart)
  const [inventoryChartOptions, setInventoryChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [], // Ini akan diperbarui setelah fetch data
    },
    title: {
      text: "Inventory Overview",
      align: "center",
    },
  });

  // Data untuk Vehicles (Pie Chart)
  const vehicleChartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Active", "Inactive", "Maintenance"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "Vehicle Distribution",
      align: "center",
    },
  };

  const taskChartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["pending", "in_progress", "completed", "cancelled"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "Task Distribution",
      align: "center",
    },
  };

  // Kolom untuk Tabel
  const tableColumns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
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
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your logistics dashboard</p>
      </header>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <h2 className="text-gray-700 font-semibold">Total Inventory</h2>
          <p className="text-2xl font-bold">{inventoryData.length}</p>
        </Card>
        <Card>
          <h2 className="text-gray-700 font-semibold">Total Vehicles</h2>
          <p className="text-2xl font-bold">{vehicleData.length}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <ReactApexChart
            options={inventoryChartOptions}
            series={inventoryChartData}
            type="bar"
            height={350}
          />
        </Card>
        <Card>
          <ReactApexChart
            options={vehicleChartOptions}
            series={vehicleChartData}
            type="pie"
            height={350}
          />
        </Card>
        <Card>
          <ReactApexChart
            options={taskChartOptions}
            series={taskChartData}
            type="pie"
            height={350}
          />
        </Card>
      </div>

      {/* Tabel Data */}
      <Card>
        <h2 className="text-lg font-bold mb-4">Recent Inventory Updates</h2>
        <Table
          columns={tableColumns}
          dataSource={inventoryData}
          pagination={{ pageSize: 5 }}
          rowKey="ID"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
