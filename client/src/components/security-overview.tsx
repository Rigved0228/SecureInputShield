import { Code, Database, CheckCircle2 } from "lucide-react";

export default function SecurityOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Vulnerabilities Addressed</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="bg-danger p-2 rounded-lg">
            <Code className="text-white text-sm" />
          </div>
          <div>
            <h3 className="font-medium text-danger">XSS Prevention</h3>
            <p className="text-sm text-red-700 mt-1">Cross-site scripting protection through proper output encoding</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <div className="bg-warning p-2 rounded-lg">
            <Database className="text-white text-sm" />
          </div>
          <div>
            <h3 className="font-medium text-warning">SQL Injection</h3>
            <p className="text-sm text-orange-700 mt-1">Database security using parameterized queries</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="bg-secondary p-2 rounded-lg">
            <CheckCircle2 className="text-white text-sm" />
          </div>
          <div>
            <h3 className="font-medium text-secondary">Input Validation</h3>
            <p className="text-sm text-green-700 mt-1">Client & server-side validation with sanitization</p>
          </div>
        </div>
      </div>
    </div>
  );
}
