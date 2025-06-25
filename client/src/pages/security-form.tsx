import { useState } from "react";
import SecurityOverview from "@/components/security-overview";
import SecureForm from "@/components/secure-form";
import SecurityExplanation from "@/components/security-explanation";
import SubmissionResults from "@/components/submission-results";
import { Shield, BookOpen } from "lucide-react";

export default function SecurityForm() {
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const handleSubmissionSuccess = (result: any) => {
    setSubmissionResult(result);
  };

  return (
    <div className="font-roboto bg-surface min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Secure Input Form Demo</h1>
                <p className="text-sm text-gray-600">Learn web security best practices</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                <BookOpen className="inline w-4 h-4 mr-1" />
                Educational Mode
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Security Overview */}
          <div className="lg:col-span-3 mb-8">
            <SecurityOverview />
          </div>

          {/* Secure Form */}
          <div className="lg:col-span-2">
            <SecureForm onSubmissionSuccess={handleSubmissionSuccess} />
          </div>

          {/* Security Explanation */}
          <div className="space-y-6">
            <SecurityExplanation />
          </div>
        </div>

        {/* Submission Results */}
        {submissionResult && (
          <div className="mt-8">
            <SubmissionResults result={submissionResult} />
          </div>
        )}
      </main>
    </div>
  );
}
