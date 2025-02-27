// src/inventory/dto/calculate-thresholds.dto.ts
import { IsNumber } from 'class-validator';

export class CalculateThresholdsDto {
  @IsNumber()
  leadTime: number;

  @IsNumber()
  safetyStock: number;

  @IsNumber()
  avgDailySales: number;
}
