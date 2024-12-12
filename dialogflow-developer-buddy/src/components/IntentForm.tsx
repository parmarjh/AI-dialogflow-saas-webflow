'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';

const IntentForm: React.FC = () => {
  const [text, setText] = useState('');
  const [intentCount, setIntentCount] = useState(1);
  const [intents, setIntents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-intents', {
        text,
        count: intentCount,
      });
      setIntents(response.data.intents);
    } catch (error) {
      console.error('Error generating intents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (intent: string) => {
    navigator.clipboard.writeText(intent);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate Intents</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Enter Text
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
              rows={6}
              placeholder="Enter your text here..."
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label htmlFor="intentCount" className="block text-sm font-medium text-gray-700 mr-4">
              Number of Intents
            </label>
            <select
              id="intentCount"
              value={intentCount}
              onChange={(e) => setIntentCount(Number(e.target.value))}
              className="mt-1 block w-20 rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {loading ? 'Generating...' : 'Generate Intents'}
          </button>
        </div>
        {intents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Intents</h2>
            <ul className="space-y-4">
              {intents.map((intent, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">{intent}</pre>
                    <button onClick={() => handleCopy(intent)} className="text-indigo-600 hover:text-indigo-800">
                      <FaCopy />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntentForm;
