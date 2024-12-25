// components/IntentForm.tsx
"use client";

import React, { useState } from 'react';
import { Trash2Icon, PlusCircleIcon, DownloadIcon, PencilIcon, CheckIcon, XIcon } from 'lucide-react';

interface Intent {
  id: string;
  text: string;
}

interface Example {
  input: string;
  outputs: string[];
}

const exampleIntents: Example[] = [
  {
    input: "I want to book a flight",
    outputs: [
      "Book me a plane ticket",
      "I need to reserve a flight",
      "Help me find flight tickets",
      "Looking for available flights",
      "Can you assist with flight booking"
    ]
  },
  {
    input: "What's the weather like?",
    outputs: [
      "Tell me the weather forecast",
      "Is it going to rain today?",
      "What's the temperature outside",
      "How's the weather looking",
      "Check weather conditions"
    ]
  }
];

const IntentForm = () => {
  const [userInput, setUserInput] = useState('');
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [newIntent, setNewIntent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showProBanner, setShowProBanner] = useState(false);

  const loadExample = (example: Example) => {
    setUserInput(example.input);
    const exampleIntents = example.outputs.map(text => ({
      id: Math.random().toString(36).substr(2, 9),
      text
    }));
    setIntents(exampleIntents);
  };

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
      const newIntents = data.intents.map((text: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        text
      }));

      // Check if the total number of intents would exceed the free limit
      if (intents.length + newIntents.length > 10) {
        setShowProBanner(true);
        // Only add intents up to the free limit
        const allowedNewIntents = newIntents.slice(0, 10 - intents.length);
        setIntents([...intents, ...allowedNewIntents]);
      } else {
        setIntents([...intents, ...newIntents]);
      }
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

  const startEditing = (intent: Intent) => {
    setEditingId(intent.id);
    setEditText(intent.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setIntents(intents.map(intent =>
        intent.id === id ? { ...intent, text: editText.trim() } : intent
      ));
      setEditingId(null);
      setEditText('');
    }
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
      {/* Examples Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exampleIntents.map((example, index) => (
            <div 
              key={index}
              className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
              onClick={() => loadExample(example)}
            >
              <p className="font-medium mb-2">Input: "{example.input}"</p>
              <p className="text-sm text-gray-600">Click to load {example.outputs.length} similar intents</p>
            </div>
          ))}
        </div>
      </div>

      {showProBanner && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <span className="font-semibold">Upgrade to Pro! </span>
            You've reached the free limit of 10 intents. Get the Pro plan to generate 25+ intents and unlock more features.
            <a href="/pricing" className="ml-2 text-blue-600 hover:text-blue-800 underline">
              Learn More
            </a>
          </p>
        </div>
      )}
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
              {editingId === intent.id ? (
                <div className="flex-grow flex items-center gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-3 py-1 border rounded"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(intent.id)}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="flex-grow">{intent.text}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(intent)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveIntent(intent.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntentForm;