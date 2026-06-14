import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including your name, email address, phone number, and payment information when you make a donation or sign up as a volunteer. We also automatically collect certain information about your device and how you interact with our website.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
          <p>We use the information we collect to process donations, send receipts, communicate about campaigns and impact, send newsletters (with your consent), and improve our services.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">3. Payment Security</h2>
          <p>All payment transactions are processed securely through Razorpay. We do not store your credit card, debit card, or UPI details on our servers. Razorpay complies with PCI DSS standards.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">4. Data Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our activities, subject to confidentiality agreements.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">5. Contact Us</h2>
          <p>For privacy-related questions, please contact us at info@communityfoundation.in or call +91 85297 16474.</p>
        </section>
      </div>
    </div>
  );
}
