// Fee Reports and Analytics Dashboard
// web_admin/src/components/fees/FeeReports.jsx

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  DocumentArrowDownIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FeeReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedClass, setSelectedClass] = useState('all');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const mockReportData = {
    summary: {
      totalCollected: 1250000,
      totalDue: 1700000,
      totalOverdue: 150000,
      collectionRate: 85.5,
      totalStudents: 1200,
      paidStudents: 1026,
      pendingStudents: 174,
      overdueStudents: 45
    },
    monthlyTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Collected',
          data: [200000, 220000, 250000, 180000, 200000, 200000],
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
        },
        {
          label: 'Due',
          data: [250000, 270000, 300000, 220000, 250000, 250000],
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          borderColor: 'rgba(251, 191, 36, 1)',
          borderWidth: 2,
        }
      ]
    },
    classWiseCollection: {
      labels: ['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'],
      datasets: [
        {
          data: [95, 88, 92, 85, 78],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
        }
      ]
    },
    paymentMethods: {
      labels: ['Online', 'Cash', 'Cheque', 'UPI', 'Card'],
      datasets: [
        {
          data: [65, 20, 10, 3, 2],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
        }
      ]
    },
    outstandingFees: [
      { student: 'John Doe', class: '10A', amount: 5000, dueDate: '2024-01-15', daysOverdue: 5 },
      { student: 'Jane Smith', class: '10B', amount: 4500, dueDate: '2024-01-20', daysOverdue: 0 },
      { student: 'Mike Johnson', class: '9A', amount: 4000, dueDate: '2024-01-10', daysOverdue: 10 },
      { student: 'Sarah Wilson', class: '9B', amount: 5500, dueDate: '2024-01-25', daysOverdue: 0 },
      { student: 'David Brown', class: '8A', amount: 3500, dueDate: '2024-01-05', daysOverdue: 15 }
    ]
  };

  useEffect(() => {
    setReportData(mockReportData);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fee Collection Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const exportReport = (format) => {
    // Implement report export functionality
    console.log(`Exporting report as ${format}`);
  };

  const generateReport = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Comprehensive fee collection reports and analytics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Classes</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
            <option value="7">Class 7</option>
            <option value="6">Class 6</option>
          </select>
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <CalendarIcon className="h-4 w-4 mr-2" />
            )}
            Generate Report
          </button>
          <div className="relative">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center">
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
              <div className="py-1">
                <button
                  onClick={() => exportReport('pdf')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as Excel
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Collected</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{reportData.summary.totalCollected.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                12.5% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Due</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{reportData.summary.totalDue.toLocaleString()}
              </p>
              <p className="text-sm text-yellow-600 flex items-center">
                <TrendingDownIcon className="h-4 w-4 mr-1" />
                8.2% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Collection Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {reportData.summary.collectionRate}%
              </p>
              <p className="text-sm text-blue-600 flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                2.1% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUpIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue Amount</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{reportData.summary.totalOverdue.toLocaleString()}
              </p>
              <p className="text-sm text-red-600 flex items-center">
                <TrendingDownIcon className="h-4 w-4 mr-1" />
                15.3% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Collection Trend</h3>
          <Bar data={reportData.monthlyTrend} options={chartOptions} />
        </div>

        {/* Payment Methods Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods Distribution</h3>
          <Doughnut data={reportData.paymentMethods} options={doughnutOptions} />
        </div>
      </div>

      {/* Class-wise Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Class-wise Collection Rate</h3>
          <Doughnut data={reportData.classWiseCollection} options={doughnutOptions} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-green-800">Paid Students</span>
              </div>
              <span className="text-lg font-bold text-green-900">
                {reportData.summary.paidStudents} ({Math.round((reportData.summary.paidStudents / reportData.summary.totalStudents) * 100)}%)
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-yellow-800">Pending Students</span>
              </div>
              <span className="text-lg font-bold text-yellow-900">
                {reportData.summary.pendingStudents} ({Math.round((reportData.summary.pendingStudents / reportData.summary.totalStudents) * 100)}%)
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-red-800">Overdue Students</span>
              </div>
              <span className="text-lg font-bold text-red-900">
                {reportData.summary.overdueStudents} ({Math.round((reportData.summary.overdueStudents / reportData.summary.totalStudents) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Outstanding Fees Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Outstanding Fees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Overdue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.outstandingFees.map((fee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fee.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fee.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{fee.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fee.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.daysOverdue === 0 ? 'bg-yellow-100 text-yellow-800' :
                      fee.daysOverdue <= 7 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {fee.daysOverdue === 0 ? 'Due Today' : 
                       fee.daysOverdue === 1 ? '1 day overdue' :
                       `${fee.daysOverdue} days overdue`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Send Reminder</button>
                    <button className="text-green-600 hover:text-green-900">Contact Parent</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 flex items-center justify-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Generate Monthly Report
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 flex items-center justify-center">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Export Outstanding List
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 flex items-center justify-center">
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Send Bulk Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeReports;
