'use client';

import { Inter, Inter_Tight } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from 'next/link';
import { getEvents } from './lib/firecrawl';

const inter = Inter({ subsets: ["latin"] });
const interTight = Inter_Tight({ subsets: ["latin"] });

const defaultSchema = {
  "type": "object",
  "properties": {
    "popular_streaming_movies": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "popular_streaming_movies"
  ]
};

export default function Home() {
  const [url, setUrl] = useState("https://www.rottentomatoes.com/");
  const [prompt, setPrompt] = useState("Extract the names of five popular streaming movies listed on the website.");
  const [schema, setSchema] = useState(JSON.stringify(defaultSchema, null, 2));
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement Firecrawl logic here
      const result = await getEvents(url, prompt, JSON.parse(schema));
      console.log(result);
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className={`h-[calc(100vh-65px)] bg-white ${inter.className} relative`}>
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 h-full overflow-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl mb-2"
          >
            🔥
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`text-3xl font-bold mb-2 text-[#36322f] ${interTight.className}`}
          >
            Events Extractor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-[#36322f] max-w-2xl mx-auto"
          >
            Get web data with a prompt
            <br />
            Turn entire websites into structured data with AI
          </motion.p>
        </div>

        <div className="flex gap-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1 bg-white rounded-lg shadow-lg p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#36322f] mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#36322f] mb-2">
                  What would you like to extract?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md h-32 outline-none resize-none"
                  placeholder="Describe what information you want to extract..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#36322f] mb-2">
                  JSON Schema
                </label>
                <textarea
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md h-48 font-mono text-sm outline-none resize-none"
                  placeholder="Enter your JSON schema..."
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[rgb(249,115,22)] text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-400"
                >
                  Extract Data
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1 bg-white rounded-lg shadow-lg p-6"
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#36322f]">Result</h3>
                {result && (
                  <button
                    onClick={handleDownload}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    Download JSON
                  </button>
                )}
              </div>
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto flex-1 min-h-[400px]">
                {result || "Extracted data will appear here..."}
              </pre>
            </div>
          </motion.div>
        </div>

        <footer className="text-center mt-8 text-sm text-[#36322f]">
          Built by{" "}
          <a
            href="https://www.firecrawl.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600"
          >
            Firecrawl
          </a>
        </footer>

        <div className="text-center mt-4 text-xs text-gray-500">
          This is a demo of Extract data with AI using Firecrawl. To learn more, see the{" "}
          <Link href="https://github.com/mendableai/events-extractor" target="_blank" className="text-orange-500">complete template</Link>.
        </div>
      </motion.div>
    </main>
  );
}
