'use client';

import { useState } from 'react';
import { FaUpload, FaSpinner, FaClock, FaCoins, FaCode, FaRobot, FaTrash, FaInfoCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

interface DebugResult {
  solution: string;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  timeMs: number;
  model: string;
  confidenceScore?: number;
}

export default function DebugPage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebugResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Image must be smaller than 10MB');
        return;
      }

      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.onerror = () => toast.error('Failed to read image file');
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text && !file) {
      toast.error('Please provide either text or an image');
      return;
    }
    
    setLoading(true);
    const startTime = Date.now();

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('text', text);

      const response = await fetch('/api/debug', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Debug request failed');
      }

      const data = await response.json();
      setResult({
        ...data,
        timeMs: Date.now() - startTime,
      });
      toast.success('Debug analysis completed!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process debug request');
    } finally {
      setLoading(false);
    }
  };

  const renderAnalytics = () => {
    if (!result) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="transform hover:scale-105 transition-transform duration-200 text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <FaClock className="mx-auto h-6 w-6 text-indigo-600 mb-3" />
          <div className="text-sm font-medium text-gray-600">Processing Time</div>
          <div className="text-2xl font-bold text-gray-900">{(result.timeMs / 1000).toFixed(2)}s</div>
          <div className="text-xs text-gray-500 mt-1">{result.timeMs}ms</div>
        </div>
        <div className="transform hover:scale-105 transition-transform duration-200 text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <FaCoins className="mx-auto h-6 w-6 text-indigo-600 mb-3" />
          <div className="text-sm font-medium text-gray-600">Tokens Used</div>
          <div className="text-2xl font-bold text-gray-900">{result.tokens.total}</div>
          <div className="text-xs text-gray-500 mt-1">
            Prompt: {result.tokens.prompt} | Response: {result.tokens.completion}
          </div>
        </div>
        <div className="transform hover:scale-105 transition-transform duration-200 text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <FaRobot className="mx-auto h-6 w-6 text-indigo-600 mb-3" />
          <div className="text-sm font-medium text-gray-600">AI Model</div>
          <div className="text-lg font-bold text-gray-900">{result.model}</div>
          <div className="text-xs text-gray-500 mt-1">Gemini Pro</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Dialogflow Debugger
            <span className="text-indigo-600">with Gemini AI</span>
          </h1>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="text-gray-500 hover:text-indigo-600 transition-colors"
            title="Help"
          >
            <FaInfoCircle className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Describe your Dialogflow issue
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  rows={6}
                  placeholder="Describe your problem or paste your Dialogflow code here..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Screenshot (optional)
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
                  <div className="space-y-2 text-center">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-48 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                            <span>Upload a screenshot</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (!text && !file)}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  'Analyze Issue'
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {result && (
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                {renderAnalytics()}

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis & Solution</h2>
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg overflow-auto">
                    <div className="whitespace-pre-wrap text-gray-800">
                      {result.solution}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog
        open={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
              How to Use the Debugger
            </Dialog.Title>
            <div className="space-y-4 text-gray-600">
              <p>The Dialogflow Debugger helps you identify and fix issues in your Dialogflow implementation:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Describe your issue or paste your problematic code in the text area</li>
                <li>Optionally upload a screenshot of your Dialogflow console or error messages</li>
                <li>Click "Analyze Issue" to get AI-powered debugging suggestions</li>
                <li>Review the analysis metrics and detailed solution provided</li>
              </ol>
              <p className="text-sm text-gray-500 mt-4">
                Powered by Google's Gemini AI for accurate and context-aware debugging assistance.
              </p>
            </div>
            <button
              className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setIsHelpOpen(false)}
            >
              Got it, thanks!
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}