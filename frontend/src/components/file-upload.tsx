import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles;
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #aaa',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop your CSV file here, or click to select file</p>
    </div>
  );
}
