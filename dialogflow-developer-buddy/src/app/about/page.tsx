import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaUsers, FaRobot, FaHandshake } from "react-icons/fa";
import Footer from "@/components/Footer";

export default function About() {
  // We define our mission statements and values as an array of objects
  // This makes it easy to map through them and maintain consistent styling
  const missionStatements = [
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Our Mission",
      description: "We're dedicated to making chatbot development accessible to everyone. Our AI-powered platform simplifies the complex process of creating intelligent conversational interfaces, enabling developers and businesses to focus on what matters most - delivering value to their users."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Who We Serve",
      description: "From individual developers to enterprise teams, we support anyone looking to build sophisticated chatbots. Whether you're new to Dialogflow or an experienced developer, our tools adapt to your skill level and needs."
    },
    {
      icon: <FaRobot className="w-6 h-6" />,
      title: "Our Technology",
      description: "Leveraging cutting-edge AI and natural language processing, we've created a suite of tools that streamline the chatbot development process. Our platform integrates seamlessly with Dialogflow, providing intelligent suggestions and automated workflows."
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Our Commitment",
      description: "We believe in providing not just tools, but a complete development ecosystem. Our platform is continuously evolving, incorporating user feedback and the latest technological advancements to better serve our community."
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
                About Dialogflow Developer Buddy
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Empowering developers to build exceptional conversational experiences
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statements Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {missionStatements.map((statement, index) => (
              <div 
                key={index} 
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                    {statement.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    {statement.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {statement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Behind the Platform
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                We're a team of developers, AI specialists, and UX designers passionate about making chatbot development more accessible and efficient.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Ready to Transform Your Chatbot Development?
              </h2>
              <p className="mt-4 text-xl text-indigo-100">
                Join thousands of developers who are building better chatbots faster.
              </p>
              <div className="mt-8">
                <Link href="/dashboard" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}