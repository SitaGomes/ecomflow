import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class InventoryService {
  async parseCSV(csvString: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from([csvString]);
      stream
        .pipe(csv())
        .on('data', (data: any) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error: Error) => reject(error));
    });
  }

  calculateThresholds(
    csvData: any[],
    params: { leadTime: number; safetyStock: number; avgDailySales: number },
  ): { low: number; medium: number; high: number } {
    const base = params.avgDailySales * params.leadTime;
    const low = base * (1 - params.safetyStock / 100);
    const high = base * (1 + params.safetyStock / 100);
    const medium = (low + high) / 2;
    return { low, medium, high };
  }
}
