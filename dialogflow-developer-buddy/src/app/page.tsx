import Image from "next/image";
import Link from 'next/link';
import { FaRobot, FaRoute, FaCode, FaCogs } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';

export default function Home() {
  const features = [
    {
      icon: <FaRobot className="w-6 h-6" />,
      title: "Intent Generation",
      description: "AI-powered intent generation for your Dialogflow chatbot",
      link: "/intents"
    },
    {
      icon: <FaCogs className="w-6 h-6" />,
      title: "Entity Detection",
      description: "Automatically identify entities and parameters",
      link: "/entities"
    },
    {
      icon: <FaRoute className="w-6 h-6" />,
      title: "Route Creation",
      description: "Generate conversation flows and routes",
      link: "/routes"
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      title: "Webhook Generator",
      description: "Create webhooks and fulfillment code",
      link: "/webhooks"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Dialogflow Developer Buddy
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Your AI-powered assistant for building better Dialogflow chatbots
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link href="/dashboard" className="rounded-md shadow">
                  <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}