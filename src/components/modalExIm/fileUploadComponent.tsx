import React, { ChangeEvent, useState } from 'react';

const FileUploadComponent: React.FC = () => {
  const [base64String, setBase64String] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        console.log(base64);
        setBase64String(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {base64String && (
        <img src={base64String} alt="Uploaded file" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default FileUploadComponent;
