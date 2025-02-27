'use server';

import { API_URL } from '../api';

export const handleUploadAsync = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/inventory/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.data;
};

export const handleFormatAsync = async (data: any) => {
  const res = await fetch(`${API_URL}/inventory/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
