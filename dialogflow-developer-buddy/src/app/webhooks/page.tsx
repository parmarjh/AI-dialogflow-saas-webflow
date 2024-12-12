'use client';
import React from 'react';
import WebhookForm from '../../components/WebhookForm';

export default function WebhooksPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <WebhookForm />
      </div>
    </div>
  );
}
