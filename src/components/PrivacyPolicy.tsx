import React from "react";

type PrivacyPolicyProps = {
  onClose: () => void;
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-11/12 max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close privacy policy"
          >
            ✕
          </button>
        </div>

        <div className="prose max-w-none text-gray-700">
          <h3 className="text-lg font-semibold">Privacy Policy for EstimatingHub.com</h3>
          <p><strong>Last Updated:</strong> October 10, 2025</p>
          <p>
            This Privacy Policy outlines how EstimatingHub.com ("we," "us," or "our") collects, uses, and discloses your information when you use our Service, and it details your privacy rights under applicable laws. By using our Service, you agree to the collection and use of information as described herein.
          </p>

          <h3 className="text-lg font-semibold mt-4">Collecting and Using Your Personal Data</h3>
          <h4 className="text-base font-semibold mt-3">1. Types of Data Collected</h4>
          <p className="font-semibold mt-2">Personal Data</p>
          <p>
            When using our Service, we may request personally identifiable information to contact or identify you, including:
          </p>
          <ul className="list-disc pl-6">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </ul>

          <p className="font-semibold mt-3">Usage Data</p>
          <p>Usage Data is automatically collected when you use the Service, including:</p>
          <ul className="list-disc pl-6">
            <li>Device Internet Protocol address (e.g., IP address)</li>
            <li>Browser type and version</li>
            <li>Pages visited, time and date of visit, time spent</li>
            <li>Unique device identifiers and diagnostic data</li>
            <li>Mobile device details (type, unique ID, IP address, operating system, browser)</li>
          </ul>

          <h4 className="text-base font-semibold mt-4">2. Use of Your Personal Data</h4>
          <p>We may use your Personal Data for:</p>
          <ul className="list-disc pl-6">
            <li>Providing and maintaining the Service</li>
            <li>Managing your account and registration</li>
            <li>Fulfilling contract obligations (e.g., purchased services)</li>
            <li>Contacting you via email, phone, SMS, or app notifications for updates or service-related communications</li>
            <li>Offering news, special offers, or event information (opt-out available)</li>
            <li>Handling your requests</li>
            <li>Business transfers (e.g., mergers, asset sales)</li>
            <li>Data analysis, trend identification, and service improvement</li>
          </ul>

          <h4 className="text-base font-semibold mt-4">3. Disclosure of Your Personal Data</h4>
          <ul className="list-disc pl-6">
            <li><strong>Business Transactions:</strong> Your data may be transferred during mergers or acquisitions, with prior notice.</li>
            <li><strong>Law Enforcement:</strong> We may disclose data if required by law or valid public authority requests.</li>
            <li><strong>Legal Requirements:</strong> Disclosure may occur to comply with legal obligations, protect our rights, prevent wrongdoing, ensure user safety, or mitigate legal liability.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Security of Your Personal Data</h3>
          <p>
            We prioritize the security of your data using commercially acceptable methods, though no online transmission or storage is 100% secure.
          </p>

          <h3 className="text-lg font-semibold mt-4">Children’s Privacy</h3>
          <p>
            Our Service is not intended for anyone under 13. We do not knowingly collect data from children under 13. If you believe we have, please contact us at <a href="mailto:sales@estimatinghub.com">sales@estimatinghub.com</a>. Parental consent may be required where applicable.
          </p>

          <h3 className="text-lg font-semibold mt-4">Changes to This Privacy Policy</h3>
          <p>
            We may update this policy, notifying you via email or a prominent notice on our Service, and updating the "Last Updated" date. Review periodically for changes, effective upon posting.
          </p>

          <h3 className="text-lg font-semibold mt-4">Contact Us</h3>
          <p>For questions, reach us at:</p>
          <ul className="list-disc pl-6">
            <li>Email: <a href="mailto:sales@estimatinghub.com">sales@estimatinghub.com</a></li>
            <li>Website: <a href="https://estimatinghub.com/" target="_blank" rel="noopener noreferrer">https://estimatinghub.com/</a></li>
            <li>Phone: +1 (212) 450-7419</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-construction-orange hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


