import React from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

export default function Preview() {
  const navigate = useNavigate();
  const websiteData = JSON.parse(localStorage.getItem('websiteData'));

  if (!websiteData || !Array.isArray(websiteData)) {
    navigate('/');
    return null;
  }

  const downloadWebsite = async () => {
    const zip = new JSZip();
    websiteData.forEach((file) => {
      zip.file(file.name, file.content);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">معاينة موقع الويب</h1>
      <div className="mb-4">
        {websiteData.map((file, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-medium mb-2">{file.name}</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto text-left whitespace-pre-wrap">
              {file.content}
            </pre>
          </div>
        ))}
      </div>
      <button
        onClick={downloadWebsite}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        تحميل موقع الويب
      </button>
    </div>
  );
}