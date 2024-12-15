
// components/IntentForm.tsx
"use client";

import React, { useState } from 'react';
import { Trash2Icon, PlusCircleIcon, DownloadIcon } from 'lucide-react';

interface Intent {
  id: string;
  text: string;
}

const IntentForm = () => {
  const [userInput, setUserInput] = useState('');
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [newIntent, setNewIntent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate_intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setIntents(data.intents.map((text: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        text
      })));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIntent = () => {
    if (newIntent.trim()) {
      setIntents([
        ...intents,
        { id: Math.random().toString(36).substr(2, 9), text: newIntent.trim() }
      ]);
      setNewIntent('');
    }
  };

  const handleRemoveIntent = (id: string) => {
    setIntents(intents.filter(intent => intent.id !== id));
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Intent'],
      ...intents.map(intent => [intent.text])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'intents.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="userInput" className="font-medium">
            Enter your base intent:
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="px-4 py-2 border rounded-lg h-24"
            placeholder="Enter your intent here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Generating...' : 'Generate Similar Intents'}
        </button>
      </form>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newIntent}
            onChange={(e) => setNewIntent(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg"
            placeholder="Add custom intent..."
          />
          <button
            onClick={handleAddIntent}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {intents.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Intents</h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <DownloadIcon className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          {intents.map((intent) => (
            <div
              key={intent.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <p className="flex-grow">{intent.text}</p>
              <button
                onClick={() => handleRemoveIntent(intent.id)}
                className="ml-4 p-2 text-red-600 hover:text-red-800"
              >
                <Trash2Icon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntentForm;