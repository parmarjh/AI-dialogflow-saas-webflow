"use client";
import { useState } from 'react';

interface EntityResult {
  category: string;
  name: string;
  extendable: boolean;
  description: string;
  outputFormat: string;
}

export default function EntitiesPage() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<EntityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEntityDetection = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Failed to detect entities');
      
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Entity Detection
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Automatically identify entities using OpenAI's GPT model.
            </p>
            <div className="mt-8">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter text for entity detection"
                rows={4}
              />
              <button
                onClick={handleEntityDetection}
                disabled={loading || !inputText.trim()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {loading ? 'Detecting...' : 'Detect Entities'}
              </button>
            </div>

            {loading && <p className="text-center mt-4">Processing text...</p>}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}

            {results.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Detected Entities</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extendable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output Format</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.extendable ? 'Yes' : 'No'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.outputFormat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}