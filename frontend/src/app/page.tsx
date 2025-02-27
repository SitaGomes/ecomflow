'use client';

import FileUpload from '@/components/file-upload';
import InventoryChart from '@/components/inventory-chart';
import ThresholdForm from '@/components/threshold-form';
import { handleFormatAsync, handleUploadAsync } from '@/lib/services/inventory';
import { useState } from 'react';

export default function Home() {
  const [csvData, setCsvData] = useState();
  const [thresholds, setThresholds] = useState(null);

  const handleFileUpload = async (file: File) => {
    const data = await handleUploadAsync(file);
    setCsvData(data);
  };

  const handleFormSubmit = async (params: any) => {
    const result = await handleFormatAsync({ ...params, csvData });
    setThresholds(result.thresholds);
  };

  return (
    <div className="p-10 flex flex-col gap-10">
      <h1>Inventory Threshold Optimizer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <ThresholdForm onSubmit={handleFormSubmit} />
      {csvData && thresholds && (
        <InventoryChart data={csvData} thresholds={thresholds} />
      )}
    </div>
  );
}
