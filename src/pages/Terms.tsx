import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            Welcome to Invoice Pixie. By using our service, you agree to these terms.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Terms</h2>
          <p className="text-gray-600">
            By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. Use License</h2>
          <p className="text-gray-600">
            Permission is granted to temporarily download one copy of the materials (information or software) on Invoice Pixie's website for personal, non-commercial transitory viewing only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;