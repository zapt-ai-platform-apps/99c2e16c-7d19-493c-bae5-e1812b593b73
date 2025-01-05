import React from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

export default function Preview() {
  const navigate = useNavigate();
  const projectData = JSON.parse(localStorage.getItem('projectData'));

  if (!projectData) {
    navigate('/');
    return null;
  }

  const downloadProject = async () => {
    const zip = new JSZip();
    projectData.files.forEach((file) => {
      zip.file(file.name, file.content);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project.zip';
    link.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">معاينة المشروع</h1>
      <pre className="bg-gray-200 p-4 mb-4 rounded overflow-auto">
        {projectData.preview}
      </pre>
      <button
        onClick={downloadProject}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        تحميل المشروع
      </button>
    </div>
  );
}