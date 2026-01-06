// pages/Analytics.js
import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ properties }) => {
  // Calculate average price for recommendations
  const averagePrice = properties.length > 0 
    ? Math.round(properties.reduce((sum, prop) => sum + parseInt(prop.price || 0), 0) / properties.length)
    : 0;

  // Prepare chart data
  const viewsData = {
    labels: properties.map(prop => prop.title?.substring(0, 15) + '...'),
    datasets: [
      {
        label: 'Views',
        data: properties.map(prop => prop.views),
        backgroundColor: '#4361ee',
      }
    ]
  };

  const inquiriesData = {
    labels: properties.map(prop => prop.title?.substring(0, 15) + '...'),
    datasets: [
      {
        label: 'Inquiries',
        data: properties.map(prop => prop.inquiries),
        borderColor: '#f72585',
        backgroundColor: 'rgba(247, 37, 133, 0.1)',
        fill: true,
      }
    ]
  };

  const propertyTypeData = {
    labels: ['Apartments', 'Houses', 'Villas', 'Commercial', 'Land'],
    datasets: [
      {
        data: [5, 3, 2, 1, 1], // Sample data
        backgroundColor: [
          '#4361ee',
          '#4cc9f0',
          '#f72585',
          '#7209b7',
          '#3a0ca3'
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="analytics">
      <div className="page-header">
        <h1>Analytics & Insights</h1>
        <p>Track your property performance and get smart recommendations</p>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Property Views</h3>
          <Bar data={viewsData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Inquiries Trend</h3>
          <Line data={inquiriesData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Property Types</h3>
          <Doughnut data={propertyTypeData} options={chartOptions} />
        </div>

        <div className="recommendations-card">
          <h3>Price Recommendations</h3>
          <div className="recommendation-item">
            <div className="rec-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="rec-content">
              <h4>Market Average</h4>
              <p>Based on similar properties in your area</p>
              <span className="rec-price">₹{averagePrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="recommendation-item">
            <div className="rec-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="rec-content">
              <h4>Competitive Pricing</h4>
              <p>Price range for quick sale</p>
              <span className="rec-price">₹{(averagePrice * 0.95).toLocaleString()} - ₹{(averagePrice * 1.05).toLocaleString()}</span>
            </div>
          </div>

          <div className="recommendation-item">
            <div className="rec-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="rec-content">
              <h4>Optimization Tips</h4>
              <p>• Add more high-quality photos</p>
              <p>• Highlight Vastu compliance features</p>
              <p>• Update description with key amenities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="performance-metrics">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <i className="fas fa-eye"></i>
            <div className="metric-content">
              <h4>Total Views</h4>
              <p>{properties.reduce((sum, prop) => sum + prop.views, 0)}</p>
            </div>
          </div>
          <div className="metric-card">
            <i className="fas fa-envelope"></i>
            <div className="metric-content">
              <h4>Total Inquiries</h4>
              <p>{properties.reduce((sum, prop) => sum + prop.inquiries, 0)}</p>
            </div>
          </div>
          <div className="metric-card">
            <i className="fas fa-percentage"></i>
            <div className="metric-content">
              <h4>Conversion Rate</h4>
              <p>{properties.length > 0 ? ((properties.reduce((sum, prop) => sum + prop.inquiries, 0) / properties.reduce((sum, prop) => sum + prop.views, 1)) * 100).toFixed(1) : 0}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;