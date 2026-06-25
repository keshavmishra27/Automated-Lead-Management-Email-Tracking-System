import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number; // 0 to 100
}

export function GaugeChart({ value }: GaugeChartProps) {
  // We'll use a semi-circle pie chart to act as a gauge.
  // The first section is the filled part, the second is the remaining empty part.
  const data = [
    { name: 'Score', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  // Determine color based on score
  let strokeColor = '#3b82f6'; // Blue
  if (value >= 80) strokeColor = '#10b981'; // Green for high
  if (value <= 40) strokeColor = '#f59e0b'; // Orange for low

  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-end overflow-hidden pb-4">
      <div className="absolute inset-0 top-4">
        <ResponsiveContainer width="100%" height="200%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              <Cell key="cell-0" fill={strokeColor} />
              <Cell key="cell-1" fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-slate-800 tracking-tighter">
          {value}
        </span>
        <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
          Score
        </span>
      </div>
    </div>
  );
}
