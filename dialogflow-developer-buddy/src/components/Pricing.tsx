import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['5 intents/month', 'Basic entity detection', 'Community support'],
      cta: 'Start Free'
    },
    {
      name: 'Pro',
      price: '$29/month',
      features: ['Unlimited intents', 'Advanced entity detection', 'Priority support', 'Custom webhooks'],
      cta: 'Go Pro'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Custom AI models', 'Dedicated support', 'SLA guarantees', 'Advanced analytics'],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{plan.price}</p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}