import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ThresholdFormProps {
  onSubmit: (params: any) => void;
}

const schema = zod.object({
  leadTime: zod.string().transform((val) => Number(val)),
  safetyStock: zod.string().transform((val) => Number(val)),
  avgDailySales: zod.string().transform((val) => Number(val)),
});

type ThresholdFormValues = zod.infer<typeof schema>;

export default function ThresholdForm({ onSubmit }: ThresholdFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leadTime: 0,
      safetyStock: 0,
      avgDailySales: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmitValues = handleSubmit((data: ThresholdFormValues) => {
    onSubmit({
      leadTime: data.leadTime,
      safetyStock: data.safetyStock,
      avgDailySales: data.avgDailySales,
    });
  });

  return (
    <form onSubmit={onSubmitValues} className="flex flex-col gap-4">
      <div>
        <label>Lead Time (days):</label>
        <Input
          type="number"
          {...register('leadTime', { required: 'This is a required input' })}
        />
        {errors.leadTime && (
          <span className="text-red-500">{errors.leadTime.message}</span>
        )}
      </div>
      <div>
        <label>Safety Stock Percentage:</label>
        <Input
          type="number"
          {...register('safetyStock', { required: 'This is a required input' })}
        />
        {errors.safetyStock && (
          <span className="text-red-500">{errors.safetyStock.message}</span>
        )}
      </div>
      <div>
        <label>Average Daily Sales:</label>
        <Input
          type="number"
          {...register('avgDailySales', {
            required: 'This is a required input',
          })}
        />
        {errors.avgDailySales && (
          <span className="text-red-500">{errors.avgDailySales.message}</span>
        )}
      </div>
      <Button type="submit">Calculate Thresholds</Button>
    </form>
  );
}
