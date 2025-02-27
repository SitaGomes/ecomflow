'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';

interface InventoryChartProps {
  data: Array<{ date: string; inventory_level: number }>;
  thresholds: { low: number; medium: number; high: number };
}

const chartConfig: ChartConfig = {
  inventory: {
    label: 'Inventory Level',
    color: '#8884d8',
  },
  lowThreshold: {
    label: 'Low Threshold',
    color: 'red',
  },
  mediumThreshold: {
    label: 'Medium Threshold',
    color: 'orange',
  },
  highThreshold: {
    label: 'High Threshold',
    color: 'green',
  },
};

export function InventoryChart({ data, thresholds }: InventoryChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="inventory_level"
          stroke={chartConfig.inventory.color}
          dot={{ r: 2 }}
        />
        <ReferenceLine
          y={thresholds.low}
          stroke={chartConfig.lowThreshold.color}
          label="Low Threshold"
        />
        <ReferenceLine
          y={thresholds.medium}
          stroke={chartConfig.mediumThreshold.color}
          label="Medium Threshold"
        />
        <ReferenceLine
          y={thresholds.high}
          stroke={chartConfig.highThreshold.color}
          label="High Threshold"
        />
      </LineChart>
    </ChartContainer>
  );
}
