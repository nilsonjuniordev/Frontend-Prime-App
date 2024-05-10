import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { CSVLink } from 'react-csv';

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyCounts, setDailyCounts] = useState({});
  const [monthlyCounts, setMonthlyCounts] = useState({});
  const [completedUsers, setCompletedUsers] = useState(0);
  const [currentUserCnpj, setCurrentUserCnpj] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/${userId}`);
        const userDataFromApi = response.data;
        setCurrentUserCnpj(userDataFromApi.id_cnpj);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userResponse = await axios.get(`/api/${userId}`);
        const userDataFromApi = userResponse.data;
        setCurrentUserCnpj(userDataFromApi.id_cnpj);
    
        const usersResponse = await axios.get("/api/");
        const users = usersResponse.data.filter(user => !user.cnpj); // Filtrar apenas usuários sem cnpj
    
        const dailyCounts = {};
        const monthlyCounts = {};
    
        let completedCount = 0;
    
        users.forEach(user => {
          const date = new Date(user.data);
          const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Obter a chave do mês no formato "YYYY-MM"
    
          dailyCounts[day] = dailyCounts[day] ? dailyCounts[day] + 1 : 1;
          monthlyCounts[monthKey] = monthlyCounts[monthKey] ? monthlyCounts[monthKey] + 1 : 1; // Usar a chave do mês para contabilizar os usuários
    
          if (user.uploadsPathAso) {
            completedCount++;
          }
        });
    
        setDailyCounts(dailyCounts);
        setMonthlyCounts(monthlyCounts);
        setCompletedUsers(completedCount);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    
    fetchData();
  }, [currentUserCnpj]);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const dailyData = Object.entries(dailyCounts).map(([date, count]) => ({ x: new Date(Number(date)), y: count }));
        const monthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({ x: new Date(month), y: count }));
  
        dailyData.sort((a, b) => a.x - b.x);
  
        const data = {
          datasets: [{
            label: 'Colaboradores por dia',
            data: dailyData,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }, {
            label: 'Colaboradores por mês',
            data: monthlyData,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }]
        };
  
        const options = {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: endDate && startDate ? 'day' : 'month',
                displayFormats: {
                  day: 'd',
                  month: 'MMM'
                },
              }
            },
            y: {
              beginAtZero: true
            }
          },
          elements: {
            line: {
              fill: true,
              tension: 0.1,
              borderWidth: 2,
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }
          }
        };
  
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
  
        chartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
      }
    }
  }, [dailyCounts, monthlyCounts, startDate, endDate]);
  
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const dailyData = Object.entries(dailyCounts).map(([date, count]) => ({ x: new Date(Number(date)), y: count }));
        const monthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({ x: new Date(month), y: count }));
  
        dailyData.sort((a, b) => a.x - b.x);
        monthlyData.sort((a, b) => a.x - b.x); // Ordenar os dados mensais
  
        const data = {
          datasets: [{
            label: 'Colaboradores por dia',
            data: dailyData,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }, {
            label: 'Colaboradores por mês',
            data: monthlyData,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }]
        };
  
        const options = {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: endDate && startDate ? 'day' : 'month',
                displayFormats: {
                  day: 'd',
                  month: 'MMM'
                },
              }
            },
            y: {
              beginAtZero: true
            }
          },
          elements: {
            line: {
              fill: true,
              tension: 0.1,
              borderWidth: 2,
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }
          }
        };
  
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
  
        chartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
      }
    }
  }, [dailyCounts, monthlyCounts, startDate, endDate]);
  

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const generateCSV = () => {
    const headers = ["Data", "Colaboradores por dia", "Colaboradores por mês", "Número de usuários com cadastro completo"];
    const data = Object.entries(dailyCounts).map(([date, dailyCount]) => {
      const day = new Date(Number(date));
      const monthKey = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}`; // Obter a chave do mês no formato "YYYY-MM"
      const monthlyCount = monthlyCounts[monthKey] || 0;
      return [day.toLocaleDateString(), dailyCount, monthlyCount, completedUsers];
    });
    return [headers, ...data];
  };
  

  return (
    <div className="DashStyled">
      <div className="MonthInput">
        <h2>Dashboard colaboradores</h2>
        <div className="FilterDash">
          <label htmlFor="startDate">Data de Início:</label>
          <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleFilterChange} />
          <label htmlFor="endDate">Data de Término:</label>
          <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleFilterChange} />
        </div>
        <div>
          <h3>Exames completos: {completedUsers}</h3>
        </div>
        <div>
          <CSVLink data={generateCSV()} filename={"dashboard_data.csv"} target="_blank">
            <div className="btnCsv">Baixar Relatório</div>
          </CSVLink>
        </div>
      </div>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
