import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            Your privacy is important to us at Invoice Pixie.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Information We Collect</h2>
          <p className="text-gray-600">
            We collect information that you provide directly to us when using our services, including but not limited to your name, email address, and billing information.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account and updates to our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;