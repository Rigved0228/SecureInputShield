import { useQuery } from "@tanstack/react-query";
import { Settings, Filter, Code, Database, Activity, CheckCircle, Shield } from "lucide-react";

export default function SecurityExplanation() {
  const { data: securityStatus } = useQuery({
    queryKey: ["/api/security-status"],
  });

  return (
    <>
      {/* Security Measures */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="text-primary mr-2" />
          Security Measures
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <Filter className="text-secondary text-sm" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Input Sanitization</h4>
              <p className="text-sm text-gray-600 mt-1">All user inputs are sanitized using DOMPurify and validation filters</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Code className="text-primary text-sm" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Output Encoding</h4>
              <p className="text-sm text-gray-600 mt-1">All output is properly encoded to prevent XSS attacks</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-warning/10 p-2 rounded-lg">
              <Database className="text-warning text-sm" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Prepared Statements</h4>
              <p className="text-sm text-gray-600 mt-1">Database queries use parameterized statements to prevent SQL injection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="text-primary mr-2" />
          Security Examples
        </h3>
        
        <div className="space-y-4">
          {/* Secure Example */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-secondary mr-2" />
              <span className="font-medium text-secondary">Secure Code</span>
            </div>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
              <code>{`// Node.js: Secure input handling
const sanitized = DOMPurify.sanitize(userInput);
const result = await db.query(
  'INSERT INTO users (name) VALUES ($1)', 
  [sanitized]
);`}</code>
            </pre>
          </div>
          
          {/* Insecure Example */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="text-danger mr-2" />
              <span className="font-medium text-danger">Vulnerable Code</span>
            </div>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
              <code>{`// DON'T DO THIS - Vulnerable to XSS & SQL Injection
const name = req.body.name;
const query = \`INSERT INTO users (name) VALUES ('\${name}')\`;
res.send("Hello " + name);`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Live Security Status */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="text-primary mr-2" />
          Security Status
        </h3>
        
        <div className="space-y-3">
          {securityStatus && Object.entries(securityStatus).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                value 
                  ? "bg-secondary/10 text-secondary" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {value ? (
                  <>
                    <CheckCircle className="inline w-3 h-3 mr-1" />
                    Active
                  </>
                ) : (
                  "Inactive"
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
