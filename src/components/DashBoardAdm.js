import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { CSVLink } from 'react-csv';

const DashBoardAdm = () => {
  const [dailyCounts, setDailyCounts] = useState({});
  const [monthlyCounts, setMonthlyCounts] = useState({});
  const [completedUsers, setCompletedUsers] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://191.184.72.124:8800/");
        const users = response.data;

        const dailyCounts = {};
        const monthlyCounts = {};

        let completedCount = 0;

        users.forEach(user => {
          const date = new Date(user.data);
          const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const month = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

          dailyCounts[day] = { ...dailyCounts[day], [user.id_cnpj]: (dailyCounts[day]?.[user.id_cnpj] || 0) + 1 };
          monthlyCounts[month] = { ...monthlyCounts[month], [user.id_cnpj]: (monthlyCounts[month]?.[user.id_cnpj] || 0) + 1 };

          if (user.uploadsPathAso) {
            completedCount++;
          }
        });

        const sortedMonthlyCounts = Object.keys(monthlyCounts).sort((a, b) => a - b).reduce((sortedObj, key) => {
          sortedObj[key] = monthlyCounts[key];
          return sortedObj;
        }, {});

        setDailyCounts(dailyCounts);
        setMonthlyCounts(sortedMonthlyCounts);
        setCompletedUsers(completedCount);
      } catch (error) {
        console.error("Erro ao obter dados dos usuários:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const dailyData = Object.entries(dailyCounts).map(([date, counts]) => {
          const countSum = Object.values(counts).reduce((sum, count) => sum + count, 0);
          return { x: new Date(Number(date)), y: countSum };
        });

        const monthlyData = Object.entries(monthlyCounts).map(([date, counts]) => {
          const countSum = Object.values(counts).reduce((sum, count) => sum + count, 0);
          return { x: new Date(Number(date)), y: countSum };
        });

        dailyData.sort((a, b) => a.x - b.x);

        const data = {
          datasets: [{
            label: 'Cadastros por dia',
            data: dailyData,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }, {
            label: 'Cadastros por mês',
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
                unit: 'month',
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

        chartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
      }
    }
  }, [dailyCounts, monthlyCounts]);

  const generateCSV = () => {
    const headers = ["Data", "Cadastro por dia", "Cadastros por mês", "Número de usuários com cadastro completo"];
    const data = [];
  
    Object.keys(dailyCounts).forEach(date => {
      const dailyCountObj = dailyCounts[date] || {};
      const monthlyCountObj = monthlyCounts[date] || {};
      
      const dailyCount = Object.values(dailyCountObj).reduce((sum, count) => sum + count, 0);
      const monthlyCount = Object.values(monthlyCountObj).reduce((sum, count) => sum + count, 0);
      
      data.push([new Date(Number(date)).toLocaleDateString(), dailyCount, monthlyCount, completedUsers]);
    });
  
    return [headers, ...data];
  };
  

  return (
    <div className="DashStyled">
      <div className="MonthInput">
        <h2>Dashboard Cadastros</h2>
        <div>
          <h3>Exames completos: {completedUsers}</h3>
        </div>
        <div>
          <CSVLink data={generateCSV()} filename={"dashboard_data.csv"}  target="_blank">
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

export default DashBoardAdm;
