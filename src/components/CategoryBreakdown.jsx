import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DATASETS } from '../utils/dataConfig';
import './CategoryBreakdown.css';

function CategoryBreakdown({ venues }) {
  const data = useMemo(() => {
    const counts = {};
    venues.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return DATASETS
      .filter((d) => counts[d.key])
      .map((d) => ({
        name: d.label,
        value: counts[d.key],
        color: d.color,
      }));
  }, [venues]);

  if (data.length === 0) {
    return (
      <div className="category-breakdown">
        <h3>Category Distribution</h3>
        <p className="no-data">No venues match current filters</p>
      </div>
    );
  }

  return (
    <div className="category-breakdown">
      <h3>Category Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [value, name]}
            contentStyle={{ fontSize: '0.85rem' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '0.75rem' }}
            layout="horizontal"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryBreakdown;
