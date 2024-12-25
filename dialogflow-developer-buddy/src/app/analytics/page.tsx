'use client';
import { useState } from 'react';
import { FaUsers, FaRobot, FaClock, FaExclamationTriangle, FaSmile, FaPhoneVolume, FaShieldAlt, FaHeadset, FaExchangeAlt } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const mockData = {
  dailyStats: [
    { date: '2023-07-01', sessions: 120, matchedIntents: 98, fallbacks: 22 },
    { date: '2023-07-02', sessions: 145, matchedIntents: 125, fallbacks: 20 },
    { date: '2023-07-03', sessions: 168, matchedIntents: 150, fallbacks: 18 },
    { date: '2023-07-04', sessions: 189, matchedIntents: 170, fallbacks: 19 },
    { date: '2023-07-05', sessions: 210, matchedIntents: 190, fallbacks: 20 },
  ],
  topIntents: [
    { name: 'Welcome Intent', count: 450 },
    { name: 'Product Inquiry', count: 380 },
    { name: 'Support Request', count: 320 },
    { name: 'Pricing Questions', count: 280 },
    { name: 'Order Status', count: 250 },
  ],
  csatTrends: [
    { date: '2023-07-01', score: 4.2 },
    { date: '2023-07-02', score: 4.5 },
    { date: '2023-07-03', score: 4.3 },
    { date: '2023-07-04', score: 4.6 },
    { date: '2023-07-05', score: 4.7 },
  ],
  transferDistribution: [
    { name: 'Self Served', value: 785 },
    { name: 'Technical Support', value: 120 },
    { name: 'Billing Support', value: 80 },
    { name: 'Sales Team', value: 45 },
  ],
  responseTimes: [
    { time: '0-1s', count: 450 },
    { time: '1-2s', count: 320 },
    { time: '2-3s', count: 180 },
    { time: '3-4s', count: 90 },
    { time: '4s+', count: 40 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = [
    {
      title: 'Total Sessions',
      value: '1,234',
      change: '+12.5%',
      icon: <FaUsers className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Intent Match Rate',
      value: '89.2%',
      change: '+3.1%',
      icon: <FaRobot className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Avg. Response Time',
      value: '1.2s',
      change: '-0.3s',
      icon: <FaClock className="h-6 w-6 text-purple-500" />,
    },
    {
      title: 'Fallback Rate',
      value: '10.8%',
      change: '-2.1%',
      icon: <FaExclamationTriangle className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'CSAT Score',
      value: '4.5/5',
      change: '+0.2',
      icon: <FaSmile className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Avg Handle Time',
      value: '3m 45s',
      change: '-30s',
      icon: <FaPhoneVolume className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Containment Rate',
      value: '78.5%',
      change: '+5.2%',
      icon: <FaShieldAlt className="h-6 w-6 text-indigo-500" />,
    },
    {
      title: 'Transfer Rate',
      value: '21.5%',
      change: '-5.2%',
      icon: <FaExchangeAlt className="h-6 w-6 text-red-500" />,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{metric.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.title}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Session Trends */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Session Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sessions" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="matchedIntents" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Intents */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Top Intents</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.topIntents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CSAT Trends */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">CSAT Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.csatTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transfer Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Agent Transfer Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.transferDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.transferDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Response Time Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.responseTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
