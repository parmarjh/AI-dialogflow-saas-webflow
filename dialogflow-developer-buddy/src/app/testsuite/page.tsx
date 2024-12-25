'use client';
import { useState } from 'react';
import { FaPlay, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function TestSuite() {
  const [testCases, setTestCases] = useState([
    { id: 1, name: 'Welcome Intent Test', status: 'pending' },
    { id: 2, name: 'Product Search Flow', status: 'passed' },
    { id: 3, name: 'Error Handling', status: 'failed' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Suite</h1>
        
        {/* Control Panel */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlay /> Run All Tests
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> New Test Case
            </button>
          </div>
          <div className="flex gap-4">
            <select className="border rounded px-3 py-2">
              <option>All Tests</option>
              <option>Failed Tests</option>
              <option>Passed Tests</option>
            </select>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Test Cases</h2>
          </div>
          <div className="divide-y">
            {testCases.map((test) => (
              <div key={test.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${
                    test.status === 'passed' ? 'bg-green-500' :
                    test.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="font-medium">{test.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-blue-500">
                    <FaEdit />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-500">
                    <FaTrash />
                  </button>
                  <button className="bg-indigo-500 text-white px-4 py-1 rounded">
                    Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
