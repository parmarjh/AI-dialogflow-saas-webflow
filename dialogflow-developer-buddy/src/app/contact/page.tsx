import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from '@/components/Footer';

export default function Contact() {
  const contactMethods = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      value: "parmarjatin4911@gmail.com",
      description: "Send me an email for business inquiries or technical support.",
      link: "mailto:parmarjatin4911@gmail.com"
    },
    {
      icon: <FaGithub className="w-6 h-6" />,
      title: "GitHub",
      value: "github.com/parmarjh",
      description: "Check out our open-source contributions and project repositories.",
      link: "https://github.com/parmarjh"
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      title: "LinkedIn",
      value: "linkedin.com/in/jhparmar",
      description: "Connect with me professionally on LinkedIn.",
      link: "https://linkedin.com/in/jhparmar"}
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        {/* Contact Header Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Have questions about Dialogflow Developer Buddy? We're here to help you build better chatbots.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method, index) => (
              <a 
                key={index} 
                href={method.link}
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700">
                    {method.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-sm text-indigo-600 font-medium">
                    {method.value}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {method.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Send us a Message
              </h3>
              <div className="mt-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
