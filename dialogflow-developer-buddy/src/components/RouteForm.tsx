'use client';
import React, { useState } from 'react';
import axios from 'axios';

const RouteForm: React.FC = () => {
  const [intents, setIntents] = useState('');
  const [routes, setRoutes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/create-routes', { intents: JSON.parse(intents) });
      setRoutes(JSON.stringify(response.data.routes, null, 2));
    } catch (error) {
      setError('Error creating routes. Please check your JSON format.');
      console.error('Error creating routes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Routes</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="intents" className="block text-sm font-medium text-gray-700">
              Intents (JSON format)
            </label>
            <textarea
              id="intents"
              value={intents}
              onChange={(e) => setIntents(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={10}
              placeholder='{"intents": [...]}'
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {loading ? 'Generating Routes...' : 'Generate Routes'}
          </button>
        </form>

        {routes && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Routes</h3>
            <pre className="mt-2 p-4 bg-gray-50 rounded-md overflow-auto whitespace-pre-wrap">
              {routes}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteForm;