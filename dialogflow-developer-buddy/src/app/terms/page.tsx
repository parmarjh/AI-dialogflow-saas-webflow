import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Terms and Conditions
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Last Updated: December 13, 2024
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content Section */}
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="prose max-w-none p-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-6">
                  Welcome to Dialogflow Developer Buddy. By accessing or using our service, you agree to be bound by these terms and conditions. Please read them carefully before using our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-6">
                  Dialogflow Developer Buddy is a platform that provides AI-powered assistance for building and managing Dialogflow chatbots. Our services include intent generation, entity detection, route creation, and webhook generation tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
                <p className="text-gray-600 mb-6">
                  Users must ensure all information provided is accurate and up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted through your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                <p className="text-gray-600 mb-6">
                  All content, features, and functionality of the Dialogflow Developer Buddy service, including but not limited to text, graphics, logos, and software, are the exclusive property of our company and are protected by international copyright laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Privacy</h2>
                <p className="text-gray-600 mb-6">
                  We are committed to protecting your privacy. Our collection and use of personal information is governed by our Privacy Policy. By using our service, you consent to our data practices as described in the Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Modifications</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right to modify, suspend, or discontinue any part of our service at any time. We will provide notice of significant changes when possible, but are not obligated to do so.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-6">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                <p className="text-gray-600 mb-6">
                  We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about these Terms, please contact us at yash.kavaiya3@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right to update these terms at any time. We will notify users of any material changes via email or through our platform. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}