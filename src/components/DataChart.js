import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import Filters from './Filters';

Chart.register(...registerables);

const DataChart = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const intensityChartRef = useRef(null);
  const likelihoodChartRef = useRef(null);
  const relevanceChartRef = useRef(null);

  useEffect(() => {
    let query = Object.keys(filters)
      .filter(key => filters[key])
      .map(key => `${key}=${filters[key]}`)
      .join('&');

    axios.get(`http://localhost:5000/api/data?${query}`)
      .then(response => {
        console.log('Fetched data:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
      });
  }, [filters]);

  useEffect(() => {
    if (data.length > 0) {
      if (intensityChartRef.current) {
        intensityChartRef.current.destroy();
      }
      if (likelihoodChartRef.current) {
        likelihoodChartRef.current.destroy();
      }
      if (relevanceChartRef.current) {
        relevanceChartRef.current.destroy();
      }

      const intensityCtx = document.getElementById('intensityChart').getContext('2d');
      intensityChartRef.current = new Chart(intensityCtx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.country),
          datasets: [{
            label: 'Intensity',
            data: data.map(item => item.intensity),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const likelihoodCtx = document.getElementById('likelihoodChart').getContext('2d');
      likelihoodChartRef.current = new Chart(likelihoodCtx, {
        type: 'line',
        data: {
          labels: data.map(item => item.country),
          datasets: [{
            label: 'Likelihood',
            data: data.map(item => item.likelihood),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const relevanceCtx = document.getElementById('relevanceChart').getContext('2d');
      relevanceChartRef.current = new Chart(relevanceCtx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.country),
          datasets: [{
            label: 'Relevance',
            data: data.map(item => item.relevance),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      });
    }
  }, [data]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Data Visualization</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <canvas id="intensityChart" width="400" height="400"></canvas>
        </div>
        <div className="col-md-6 mb-4">
          <canvas id="likelihoodChart" width="400" height="400"></canvas>
        </div>
        <div className="col-md-6 mb-4">
          <canvas id="relevanceChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default DataChart;
