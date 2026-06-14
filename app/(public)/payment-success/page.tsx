import Link from "next/link";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-2">
            Your donation has been received successfully.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A receipt has been sent to your email address with your payment details and 80G certificate information.
          </p>
          <div className="space-y-3">
            <Link href="/impact" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              <Heart className="w-4 h-4" /> See Your Impact
            </Link>
            <Link href="/campaigns" className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-700 font-medium py-3 rounded-xl text-sm">
              Explore More Campaigns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
