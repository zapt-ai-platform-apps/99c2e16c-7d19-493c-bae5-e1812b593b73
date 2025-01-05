import React from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

export default function Preview() {
  const navigate = useNavigate();
  const projectData = JSON.parse(localStorage.getItem('projectData'));

  if (!projectData || !Array.isArray(projectData)) {
    navigate('/');
    return null;
  }

  const downloadProject = async () => {
    const zip = new JSZip();
    projectData.forEach((file) => {
      zip.file(file.name, file.content);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">معاينة المشروع</h1>
      <div className="mb-4">
        {projectData.map((file, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-medium mb-2">{file.name}</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto text-left whitespace-pre-wrap">
              {file.content}
            </pre>
          </div>
        ))}
      </div>
      <button
        onClick={downloadProject}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        تحميل المشروع
      </button>
    </div>
  );
}