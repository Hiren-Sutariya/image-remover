import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Code, Key, BookOpen, Settings, AlertCircle } from 'lucide-react';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const navItems = [
    { id: 'getting-started', label: 'Getting Started', icon: <BookOpen size={16} /> },
    { id: 'authentication', label: 'Authentication', icon: <Key size={16} /> },
    { id: 'api-endpoints', label: 'API Endpoints', icon: <Terminal size={16} /> },
    { id: 'examples', label: 'Code Examples', icon: <Code size={16} /> },
    { id: 'status-codes', label: 'Status Codes', icon: <AlertCircle size={16} /> },
  ];

  return (
    <div className="pt-16 pb-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Documentation</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                    activeSection === item.id 
                      ? 'bg-[#0047FF]/5 text-[#0047FF]' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#404040]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-[#404040] mb-4 tracking-tight">API Documentation</h1>
              <p className="text-base text-[#555555] font-medium leading-relaxed max-w-3xl">
                Clearix AI provides a robust REST API for seamless background removal integration. 
                Process thousands of images with pixel-perfect accuracy in just seconds.
              </p>
            </div>

            {activeSection === 'getting-started' && (
              <section id="getting-started" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-[#404040] mb-6 tracking-tight">Getting Started</h2>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <p className="text-[#555555] font-medium leading-relaxed mb-6">
                    To start using the API, you first need to obtain an API key from your dashboard. 
                    All requests must be made over HTTPS to ensure data security.
                  </p>
                  <div className="bg-black rounded-2xl p-6 relative group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Bash</span>
                    </div>
                    <code className="text-gray-300 text-[14px] leading-relaxed block">
                      curl -X POST https://api.clearix.ai/v1/remove-bg \<br />
                      &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                      &nbsp;&nbsp;-F "image_url=https://example.com/photo.jpg"
                    </code>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'authentication' && (
              <section id="authentication" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-[#404040] mb-6 tracking-tight text-[#0047FF]">Authentication</h2>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <p className="text-[#555555] font-medium leading-relaxed mb-6">
                    The Clearix AI API uses API keys to authenticate requests. You can view and manage your API keys in the dashboard.
                  </p>
                  <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm mb-6">
                    <h4 className="font-bold text-[#404040] mb-2">Bearer Token</h4>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      All API requests must be authenticated using the <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">Authorization</code> header with a Bearer token.
                    </p>
                  </div>
                  <div className="bg-[#1e1e1e] rounded-2xl p-6">
                    <code className="text-gray-300 text-[14px] leading-relaxed block">
                      Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx
                    </code>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'api-endpoints' && (
              <section id="api-endpoints" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-[#404040] mb-8 tracking-tight text-[#0047FF]">POST /v1/remove-bg</h2>
                <div className="space-y-12">
                  <div>
                    <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-6">Request Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                        <div className="font-bold text-[#404040] mb-2 flex items-center justify-between">
                          image_file <span className="text-[10px] text-red-500 uppercase">Required</span>
                        </div>
                        <p className="text-[13px] text-gray-500 font-medium">Binary image data (PNG, JPG, WebP up to 50MB).</p>
                      </div>
                      <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                        <div className="font-bold text-[#404040] mb-2 flex items-center justify-between">
                          image_url <span className="text-[10px] text-gray-400 uppercase">Optional</span>
                        </div>
                        <p className="text-[13px] text-gray-500 font-medium">URL of the image to process if file is not provided.</p>
                      </div>
                      <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                        <div className="font-bold text-[#404040] mb-2 flex items-center justify-between">
                          format <span className="text-[10px] text-gray-400 uppercase">Optional</span>
                        </div>
                        <p className="text-[13px] text-gray-500 font-medium">Output format: 'png' (default) or 'webp'.</p>
                      </div>
                      <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                        <div className="font-bold text-[#404040] mb-2 flex items-center justify-between">
                          quality <span className="text-[10px] text-gray-400 uppercase">Optional</span>
                        </div>
                        <p className="text-[13px] text-gray-500 font-medium">Resolution quality: 'standard' or 'hd'.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-6">JSON Response</h4>
                    <div className="bg-[#1e1e1e] rounded-3xl p-8 relative">
                      <pre className="text-blue-300 text-[14px] leading-relaxed overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "image_id": "img_7281920",
    "result_url": "https://storage.clearix.ai/results/abc-123.png",
    "credits_remaining": 482,
    "processing_time_ms": 240
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'examples' && (
              <section id="examples" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-[#404040] mb-6 tracking-tight text-[#0047FF]">Code Examples</h2>
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <h4 className="font-bold text-[#404040] mb-4">Python</h4>
                    <div className="bg-black rounded-2xl p-6">
                      <pre className="text-gray-300 text-[14px] leading-relaxed overflow-x-auto">
{`import requests

response = requests.post(
    'https://api.clearix.ai/v1/remove-bg',
    files={'image_file': open('photo.jpg', 'rb')},
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
)

with open('no-bg.png', 'wb') as out:
    out.write(response.content)`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <h4 className="font-bold text-[#404040] mb-4">Node.js</h4>
                    <div className="bg-black rounded-2xl p-6">
                      <pre className="text-gray-300 text-[14px] leading-relaxed overflow-x-auto">
{`const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const formData = new FormData();
formData.append('image_file', fs.createReadStream('photo.jpg'));

axios.post('https://api.clearix.ai/v1/remove-bg', formData, {
  headers: {
    ...formData.getHeaders(),
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  responseType: 'arraybuffer'
}).then(response => {
  fs.writeFileSync('no-bg.png', response.data);
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'status-codes' && (
              <section id="status-codes" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-[#404040] mb-6 tracking-tight text-[#0047FF]">Status Codes</h2>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                      <div className="px-3 py-1 bg-green-50 text-green-600 rounded-lg font-black text-sm">200</div>
                      <div>
                        <h4 className="font-bold text-[#404040] mb-1">OK</h4>
                        <p className="text-[13px] text-gray-500 font-medium">The request was successful and the image was processed.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                      <div className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-sm">400</div>
                      <div>
                        <h4 className="font-bold text-[#404040] mb-1">Bad Request</h4>
                        <p className="text-[13px] text-gray-500 font-medium">Invalid parameters or unsupported image format.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                      <div className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-lg font-black text-sm">401</div>
                      <div>
                        <h4 className="font-bold text-[#404040] mb-1">Unauthorized</h4>
                        <p className="text-[13px] text-gray-500 font-medium">API key is missing or invalid.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                      <div className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-sm">500</div>
                      <div>
                        <h4 className="font-bold text-[#404040] mb-1">Server Error</h4>
                        <p className="text-[13px] text-gray-500 font-medium">Something went wrong on our end.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
