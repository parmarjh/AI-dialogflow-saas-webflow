// src/components/Dashboard/IntentMetrics.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MetricsProps {
  data: {
    date: string;
    intentsCreated: number;
    successRate: number;
  }[];
}

const IntentMetrics: React.FC<MetricsProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Intent Generation Metrics</h5>
      </div>
      <div className="card-body">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone"
                dataKey="intentsCreated"
                stroke="#8884d8"
                name="Intents Created"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="successRate"
                stroke="#82ca9d"
                name="Success Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};