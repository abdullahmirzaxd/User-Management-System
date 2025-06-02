import React, { useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell
} from 'recharts';

import { ThemeContext } from '../context/ThemeContext';

const data = [
  { month: 'Jan', income: 2500, expenses: 1500 },
  { month: 'Feb', income: 3500, expenses: 1500 },
  { month: 'Mar', income: 2500, expenses: 1000 },
  { month: 'Apr', income: 2500, expenses: 1600 },
  { month: 'May', income: 3500, expenses: 2000 },
  { month: 'Jun', income: 2000, expenses: 1500 },
  { month: 'Jul', income: 3100, expenses: 2300 },
  { month: 'Aug', income: 2800, expenses: 2200 },
  { month: 'Sep', income: 2700, expenses: 1900 },
  { month: 'Oct', income: 3200, expenses: 2500 },
  { month: 'Nov', income: 3000, expenses: 2100 },
  { month: 'Dec', income: 3500, expenses: 2700 },
];

const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
const totalExpenses = data.reduce((sum, d) => sum + d.expenses, 0);
const savings = totalIncome - totalExpenses;

const pieData1 = [
  { name: 'Income', value: totalIncome },
  { name: 'Expenses', value: totalExpenses },
];

const pieData2 = [
  { name: 'Savings', value: savings },
  { name: 'Spent', value: totalExpenses },
];

const COLORS = ['#1890ff', '#ff4d4f'];

const CustomTooltip = ({ active, payload, label }) => {
  const { theme } = useContext(ThemeContext);

  if (active && payload && payload.length >= 2) {
    const income = payload[0].value;
    const expenses = payload[1].value;
    const percent = income > 0 ? ((expenses / income) * 100).toFixed(1) : '0.0';

    const bgColor = theme === 'dark' ? '#1e1e1e' : '#fff';
    const textColor = theme === 'dark' ? '#f1f1f1' : '#000';
    const borderColor = theme === 'dark' ? '#333' : '#ccc';

    return (
      <div style={{
        backgroundColor: bgColor,
        padding: '12px 16px',
        borderRadius: '8px',
        color: textColor,
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        lineHeight: '1.6',
        border: `1px solid ${borderColor}`
      }}>
        <p><strong style={{ color: theme === 'dark' ? '#ccc' : '#555' }}>Month:</strong> <span>{label}</span></p>
        <p><strong style={{ color: '#66ccff' }}>Income:</strong> <span>${income.toLocaleString()}</span></p>
        <p><strong style={{ color: '#ff6666' }}>Expenses:</strong> <span>${expenses.toLocaleString()}</span></p>
        <p><strong style={{ color: '#66ff66' }}>Percent Spent:</strong> <span>{percent}%</span></p>
      </div>
    );
  }
  return null;
};

function CustomChart() {
  const { theme } = useContext(ThemeContext);

  // Dynamic styles based on theme
  const sectionBg = theme === 'dark' ? '#1f1f1f' : '#fff';
  const textColor = theme === 'dark' ? '#ccc' : '#333';
  const headingColor = theme === 'dark' ? '#bbb' : '#555';
  const axisStroke = theme === 'dark' ? '#888' : '#8884d8';
  const gridStroke = theme === 'dark' ? '#333' : '#e0e0e0';

  return (
    <>
      <style>
        {`
          .dashboard-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* remove background-color and padding here */
  
  max-width: 1200px;
  margin: 0 auto;  /* center it */
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  color: ${textColor};
  background-color: ${theme === 'dark' ? '#1f1f1f' : '#fff'}; /* keep container bg */
  padding: 20px; /* padding inside container */
}

            <div
  className="outer-wrapper"
  style={{
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f7fa',
    padding: '30px',   
    minHeight: '100vh',
    boxSizing: 'border-box'
  }}
>

          .header {
            margin-bottom: 30px;
            text-align: center;
          }

          .header h1 {
            font-size: 2.5rem;
            margin: 0;
            color: ${textColor};
          }

          .header p {
            font-size: 1.1rem;
            color: ${headingColor};
            margin-top: 8px;
          }

          .charts-container {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
            padding: 20px;
            align-items: stretch; /* Ensure equal height */
          }

          .line-chart-section,
          .pie-charts-container {
            background-color: ${sectionBg};
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            flex: 1 1 600px;
            min-width: 320px;
            width: 100%;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start; /* remove center alignment */
            color: ${textColor};
          }

          .line-chart-section h2,
          .pie-charts-container h2 {
            margin-bottom: 20px;
            color: ${headingColor};
            text-align: center;
          }

          .pie-charts-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            width: 100%;
            margin-top: auto;
          }

          .pie-chart-wrapper {
            text-align: center;
            width: 100%;
            max-width: 280px;
            padding: 10px;
            box-sizing: border-box;
            color: ${textColor};
          }

          .pie-chart-wrapper h3 {
            font-size: 1rem;
            margin-bottom: 10px;
          }

          /* Responsive Layouts */
          @media (min-width: 900px) {
            .charts-container {
              flex-wrap: nowrap;
            }
            .pie-charts-container {
              min-width: 300px;
              max-width: 300px;
            }
          }

          @media (max-width: 768px) {
            .charts-container {
              flex-direction: column;
            }
            .pie-chart-wrapper {
              width: 45%;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <header className="header">
          <h1>Financial Overview Dashboard</h1>
          <p>Track your monthly income, expenses, and savings</p>
        </header>

        <div className="charts-container">
          <section className="line-chart-section">
            <h2>Monthly Income vs Expenses</h2>
            <div style={{ height: 450 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="month" stroke={axisStroke} strokeWidth={2} tick={{ fill: textColor, fontSize: 12 }} />
                  <YAxis stroke={axisStroke} strokeWidth={2} tick={{ fill: textColor, fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ color: textColor }} />
                  <Line type="monotone" dataKey="income" stroke="#1890ff" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#ff4d4f" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="pie-charts-container">
            <h2>Summary Pie Charts</h2>
            <div className="pie-charts-row">
              <div className="pie-chart-wrapper">
                <h3>Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData1}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {pieData1.map((entry, index) => (
                        <Cell key={`cell1-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '14px', color: textColor }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="pie-chart-wrapper">
                <h3>Savings vs Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData2}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {pieData2.map((entry, index) => (
                        <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '14px', color: textColor }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CustomChart;
