import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../supabaseClient';

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateProject = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const result = await createEvent('generate_code', {
        prompt: description,
        language: 'arabic'
      });
      localStorage.setItem('projectData', JSON.stringify(result));
      navigate('/preview');
    } catch (error) {
      console.error('Error generating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">إنشاء مشروع جديد</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="أدخل وصف المشروع هنا..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={generateProject}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        disabled={loading}
      >
        {loading ? 'جارٍ الإنشاء...' : 'إنشاء المشروع'}
      </button>
    </div>
  );
}