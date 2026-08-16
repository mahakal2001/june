import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface Props {
  data: number[];
  color: string;
}

export function DailyMISSparkline({
  data,
  color,
}: Props) {
  return (
    <div className="h-14 w-full">
      <ResponsiveContainer>
        <LineChart
          data={data.map((v) => ({
            value: v,
          }))}
        >
          <Line
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}