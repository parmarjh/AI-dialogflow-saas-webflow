import React from 'react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Basic intent generation (5/month)',
        'Simple entity detection',
        'Basic conversation flows',
        'Community support',
        'Basic analytics dashboard',
        'Manual testing tools'
      ],
      cta: 'Start Free'
    },
    {
      name: 'Pro',
      price: '$49/month',
      description: 'Great for growing chatbots',
      features: [
        'Advanced intent generation (100/month)',
        'Advanced entity detection & parameters',
        'Custom conversation flows',
        'Webhook generation & templates',
        'Basic workflow diagrams',
        'Debug console access',
        'Enhanced analytics dashboard',
        'Automated test suite',
        'Priority email support',
        'API access'
      ],
      cta: 'Go Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale deployments',
      features: [
        'Unlimited intent generation',
        'Custom entity models',
        'Advanced workflow automation',
        'Custom webhook development',
        'Advanced flow visualization',
        'Premium debugging tools',
        'Custom analytics & reporting',
        'End-to-end testing suite',
        'Dedicated support manager',
        'Custom SLA guarantees',
        'Training & onboarding',
        'Custom integrations'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose the perfect plan for your needs
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Scale your chatbot development with our flexible pricing options
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative rounded-3xl p-8 ${
                plan.highlight 
                  ? 'ring-2 ring-indigo-600' 
                  : 'ring-1 ring-gray-200'
              } hover:shadow-lg transition-shadow`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full">
                  Popular
                </span>
              )}
              
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {plan.description}
              </p>
              
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-start">
                    <FaCheck className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.name === 'Enterprise' ? '/contact' : '/signup'} 
                className={`mt-8 block rounded-md px-3.5 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}