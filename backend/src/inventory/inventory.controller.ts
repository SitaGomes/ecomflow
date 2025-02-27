import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { InventoryService } from './inventory.service';
import { CalculateThresholdsDto } from './dto/calculate-thresholds.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fileBuffer = file.buffer;
    if (!fileBuffer) {
      throw new BadRequestException('File buffer not available');
    }
    const data = await this.inventoryService.parseCSV(fileBuffer.toString());
    return { data };
  }

  @Post('calculate')
  calculateThresholds(@Body() body: CalculateThresholdsDto) {
    const { csvData, leadTime, safetyStock, avgDailySales } = body;
    if (
      !csvData ||
      leadTime === undefined ||
      safetyStock === undefined ||
      avgDailySales === undefined
    ) {
      throw new BadRequestException('Missing required parameters');
    }
    const thresholds = this.inventoryService.calculateThresholds(csvData, {
      leadTime,
      safetyStock,
      avgDailySales,
    });
    return { thresholds };
  }
}
