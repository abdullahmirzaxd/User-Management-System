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
        border: `1px solid ${borderColor}`,
        lineHeight: '1.6'
      }}>
        <p><strong>Month:</strong> {label}</p>
        <p><strong style={{ color: '#66ccff' }}>Income:</strong> ${income.toLocaleString()}</p>
        <p><strong style={{ color: '#ff6666' }}>Expenses:</strong> ${expenses.toLocaleString()}</p>
        <p><strong style={{ color: '#66ff66' }}>Percent Spent:</strong> {percent}%</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  const sectionBg = theme === 'dark' ? '#1f1f1f' : '#fff';
  const textColor = theme === 'dark' ? '#ccc' : '#333';
  const headingColor = theme === 'dark' ? '#bbb' : '#555';
  const axisStroke = theme === 'dark' ? '#999' : '#8884d8';
  const gridStroke = theme === 'dark' ? '#333' : '#e0e0e0';

  return (
    <>
      <style>
        {`
          .dashboard-container {
            font-family: 'Segoe UI', sans-serif;
            background-color: ${theme === 'dark' ? '#121212' : '#f4f7fa'};
            color: ${textColor};
            padding: 30px;
            min-height: 100vh;
          }

          .header {
            text-align: center;
            margin-bottom: 40px;
          }

          .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: ${textColor};
          }

          .header p {
            font-size: 1.2rem;
            color: ${headingColor};
          }

          .main-layout {
            display: flex;
            gap: 30px;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .line-chart-section {
            flex: 2;
            min-width: 300px;
            background-color: ${sectionBg};
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .pie-charts-column {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 280px;
          }

          .pie-chart-box {
            background-color: ${sectionBg};
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
          }

          .pie-chart-box h3 {
            margin-bottom: 10px;
            color: ${headingColor};
          }

          @media (max-width: 768px) {
            .main-layout {
              flex-direction: column;
            }

            .pie-charts-column {
              flex-direction: row;
              justify-content: space-around;
              flex-wrap: wrap;
            }

            .pie-chart-box {
              flex: 1 1 45%;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <header className="header">
          <h1>Financial Dashboard</h1>
          <p>Monitor income, expenses, and savings trends</p>
        </header>

        <div className="main-layout">
          <section className="line-chart-section">
            <h2 style={{ textAlign: 'center', color: headingColor, marginBottom: '20px' }}>Monthly Trends</h2>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="month" stroke={axisStroke} tick={{ fill: textColor }} />
                  <YAxis stroke={axisStroke} tick={{ fill: textColor }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" wrapperStyle={{ color: textColor }} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#1890ff"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ff4d4f"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="pie-charts-column">
            <div className="pie-chart-box">
              <h3>Income vs Expenses</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {pieData1.map((entry, index) => (
                      <Cell key={`cell1-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '14px', color: textColor }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="pie-chart-box">
              <h3>Savings vs Expenses</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {pieData2.map((entry, index) => (
                      <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '14px', color: textColor }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
