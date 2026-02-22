import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './BarChartPanel.css';

function BarChartPanel({ venues }) {
  const data = useMemo(() => {
    const counts = {};
    venues.forEach((v) => {
      counts[v.borough] = (counts[v.borough] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([borough, count]) => ({ borough, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }, [venues]);

  if (data.length === 0) {
    return (
      <div className="bar-chart-panel">
        <h3>Top Boroughs</h3>
        <p className="no-data">No venues match current filters</p>
      </div>
    );
  }

  return (
    <div className="bar-chart-panel">
      <h3>Top Boroughs by Venue Count</h3>
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 28 + 40)}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="borough"
            width={120}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            formatter={(value) => [value, 'Venues']}
            contentStyle={{ fontSize: '0.85rem' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartPanel;
