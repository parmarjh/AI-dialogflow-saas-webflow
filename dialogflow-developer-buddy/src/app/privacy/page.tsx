import Link from 'next/link';
import { FaShieldAlt, FaUserLock, FaCookie, FaEnvelope } from 'react-icons/fa';
import Footer from '@/components/Footer';

export default function Privacy() {
  const sections = [
    {
      id: 'data-collection',
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Data Collection',
      content: [
        {
          subtitle: 'Information We Collect',
          details: [
            'Account information (name, email, password)',
            'Usage data (interactions with our platform)',
            'Dialogflow project configurations',
            'Chat logs and analytics data',
            'Technical information (IP address, browser type, device info)'
          ]
        }
      ]
    },
    {
      id: 'data-usage',
      icon: <FaUserLock className="w-6 h-6" />,
      title: 'How We Use Your Data',
      content: [
        {
          subtitle: 'We use your data to:',
          details: [
            'Provide and improve our services',
            'Personalize your experience',
            'Send important notifications',
            'Analyze usage patterns',
            'Maintain platform security'
          ]
        }
      ]
    },
    {
      id: 'cookies',
      icon: <FaCookie className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      content: [
        {
          subtitle: 'Cookie Usage',
          details: [
            'Essential cookies for platform functionality',
            'Analytics cookies to improve our service',
            'Preference cookies to remember your settings',
            'You can control cookie settings in your browser'
          ]
        }
      ]
    },
    {
      id: 'data-security',
      icon: <FaEnvelope className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          details: [
            'Encryption of sensitive data',
            'Regular security audits',
            'Access controls and authentication',
            'Secure data storage practices',
            'Regular backups and monitoring'
          ]
        }
      ]
    }
  ];

  const lastUpdated = '2024-01-15';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600">
              At Dialogflow Developer Buddy, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our platform.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <div key={section.id} className="mb-12">
              <div className="flex items-center mb-6">
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 mr-4">
                  {section.icon}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              
              {section.content.map((subsection, index) => (
                <div key={index} className="ml-13">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {subsection.subtitle}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {subsection.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-gray-600">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Questions About Our Privacy Policy?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions or concerns about our privacy policy, please don't hesitate to contact us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
