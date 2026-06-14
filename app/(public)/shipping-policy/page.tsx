import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & Delivery Policy" };

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Shipping & Delivery Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">Digital Delivery</h2>
          <p>Community Base Advancement Foundation primarily provides digital services including donation receipts, 80G certificates, impact reports, and newsletter updates. These are delivered electronically to your registered email address.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">Donation Receipts</h2>
          <p>An automated donation receipt is sent to your email address within 24 hours of a successful transaction. If you do not receive it, please check your spam folder or contact us.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">80G Certificates</h2>
          <p>Annual 80G certificates for tax exemption purposes are issued within 30 days of the end of the financial year for all eligible donations.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">Physical Merchandise</h2>
          <p>For any physical merchandise or promotional materials ordered through special campaigns, delivery timelines will be communicated separately. Standard delivery: 7–14 business days within India.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-gray-900">Contact</h2>
          <p>For delivery queries: info@communityfoundation.in | +91 85297 16474</p>
        </section>
      </div>
    </div>
  );
}
