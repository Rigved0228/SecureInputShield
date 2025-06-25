import { CheckCircle, Shield, Info } from "lucide-react";

interface SubmissionResultsProps {
  result: {
    message: string;
    submissionId: number;
    sanitizedData: {
      fullName: string;
      email: string;
      phone?: string;
      message: string;
      securityPreferences?: string[];
    };
  };
}

export default function SubmissionResults({ result }: SubmissionResultsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CheckCircle className="text-secondary mr-2" />
        Secure Submission Results
      </h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-800">
          <Info className="inline mr-2" />
          Form submitted successfully! All data has been sanitized and securely stored.
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Sanitized Name:</span>
            <p className="text-sm text-gray-900 mt-1">{result.sanitizedData.fullName}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Validated Email:</span>
            <p className="text-sm text-gray-900 mt-1">{result.sanitizedData.email}</p>
          </div>
          {result.sanitizedData.phone && (
            <div>
              <span className="text-sm font-medium text-gray-700">Sanitized Phone:</span>
              <p className="text-sm text-gray-900 mt-1">{result.sanitizedData.phone}</p>
            </div>
          )}
          {result.sanitizedData.securityPreferences && result.sanitizedData.securityPreferences.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-700">Security Preferences:</span>
              <p className="text-sm text-gray-900 mt-1">
                {result.sanitizedData.securityPreferences.join(", ")}
              </p>
            </div>
          )}
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-700">Sanitized Message:</span>
          <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded border">
            {result.sanitizedData.message}
          </p>
        </div>
        
        <div className="text-xs text-gray-500 mt-4">
          <Shield className="inline w-3 h-3 mr-1" />
          All HTML entities have been encoded, SQL injection attempts blocked, and input length validated.
          Submission ID: {result.submissionId}
        </div>
      </div>
    </div>
  );
}
