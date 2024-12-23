'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy, FaCode, FaCheckCircle, FaDownload, FaLightbulb } from 'react-icons/fa';

interface WebhookFormData {
  description: string;
  platform: string;
  language: string;
}

const sampleWebhooks = [
  {
    description: "Create a webhook that fetches real-time weather data based on the user's city. The webhook should handle different weather conditions and return appropriate responses with temperature, humidity, and weather description.",
    platform: "cloud-functions",
    language: "nodejs"
  },
  {
    description: "Build a webhook that integrates with a ticket booking system. It should check seat availability, handle ticket reservations, and return booking confirmation details including price, seat number, and booking reference.",
    platform: "cloud-run",
    language: "python"
  }
];

const WebhookForm: React.FC = () => {
  const [formData, setFormData] = useState<WebhookFormData>({
    description: '',
    platform: 'cloud-run',
    language: 'nodejs'
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const platforms = [
    { value: 'cloud-run', label: 'Google Cloud Run' },
    { value: 'cloud-functions', label: 'Google Cloud Functions' },
    { value: 'others', label: 'Others' }
  ];

  const languages = [
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' }
  ];

  const handleGenerate = async () => {
    if (!formData.description.trim()) {
      setError('Please provide a description of your webhook functionality');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/generate-webhook', formData);
      setGeneratedCode(response.data.code);
    } catch (error) {
      setError('Failed to generate webhook code. Please try again.');
      console.error('Error generating webhook:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    
    const fileExtension = getFileExtension(formData.language);
    const fileName = `webhook.${fileExtension}`;
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getFileExtension = (language: string): string => {
    const extensions: Record<string, string> = {
      nodejs: 'js',
      python: 'py',
      java: 'java',
      go: 'go'
    };
    return extensions[language] || 'txt';
  };

  const loadExample = (index: number) => {
    setFormData(sampleWebhooks[index]);
    setShowExamples(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Webhook Generator</h2>
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200"
          >
            <FaLightbulb className="mr-2" />
            View Examples
          </button>
        </div>

        {showExamples && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sample Webhooks</h3>
            <div className="grid gap-4">
              {sampleWebhooks.map((example, index) => (
                <div 
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors duration-200"
                  onClick={() => loadExample(index)}
                >
                  <p className="text-sm text-gray-600">{example.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span className="mr-3">{example.platform}</span>
                    <span>{example.language}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              placeholder="Describe what your webhook should do..."
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FaCode className="mr-2" />
                Generate Webhook
              </>
            )}
          </button>
        </div>

        {generatedCode && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Generated Code</h3>
              <div className="flex space-x-4">
                <button
                  onClick={handleCopy}
                  className="flex items-center px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="mr-2" />
                      Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  <FaDownload className="mr-2" />
                  Download Code
                </button>
              </div>
            </div>
            <div className="relative">
              <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{generatedCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookForm;