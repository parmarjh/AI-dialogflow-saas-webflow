'use client';
import React from 'react';
import RouteForm from '../../components/RouteForm';

export default function RoutesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <RouteForm />
      </div>
    </div>
  );
}
