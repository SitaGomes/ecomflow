// src/inventory/dto/calculate-thresholds.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';
import { csvData } from './types/csvData';

export class CalculateThresholdsDto {
  @IsNotEmpty()
  csvData: csvData[];

  @IsNumber()
  leadTime: number;

  @IsNumber()
  safetyStock: number;

  @IsNumber()
  avgDailySales: number;
}
