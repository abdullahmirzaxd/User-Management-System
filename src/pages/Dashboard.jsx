import React, { useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell
} from 'recharts';
import { ThemeContext } from '../context/ThemeContext';
import './Dashboard.css';

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

    return (
      <div
        className="custom-tooltip"
        style={{
          '--tooltip-bg': theme === 'dark' ? '#1e1e1e' : '#fff',
          '--tooltip-text': theme === 'dark' ? '#f1f1f1' : '#000',
          '--tooltip-border': theme === 'dark' ? '#333' : '#ccc',
        }}
      >
        <p><strong>Month:</strong> {label}</p>
        <p><strong className="income">Income:</strong> ${income.toLocaleString()}</p>
        <p><strong className="expenses">Expenses:</strong> ${expenses.toLocaleString()}</p>
        <p><strong className="percent">Percent Spent:</strong> {percent}%</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  // CSS variables for theming
  const themeStyles = {
    '--bg-color': theme === 'dark' ? '#121212' : '#f4f7fa',
    '--text-color': theme === 'dark' ? '#ccc' : '#333',
    '--heading-color': theme === 'dark' ? '#bbb' : '#555',
    '--section-bg': theme === 'dark' ? '#1f1f1f' : '#fff',
  };

  const axisStroke = theme === 'dark' ? '#999' : '#8884d8';
  const gridStroke = theme === 'dark' ? '#333' : '#e0e0e0';
  const legendStyle = { color: theme === 'dark' ? '#ccc' : '#333', fontSize: '14px' };

  return (
    <div className="dashboard-container" style={themeStyles}>
      <header className="header">
        <h1>Financial Dashboard</h1>
        <p>Monitor income, expenses, and savings trends</p>
      </header>

      <div className="main-layout">
        <section className="line-chart-section">
          <h2>Monthly Trends</h2>
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="month" stroke={axisStroke} tick={{ fill: themeStyles['--text-color'] }} />
                <YAxis stroke={axisStroke} tick={{ fill: themeStyles['--text-color'] }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" wrapperStyle={legendStyle} />
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
                <Legend verticalAlign="bottom" wrapperStyle={legendStyle} />
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
                <Legend verticalAlign="bottom" wrapperStyle={legendStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
