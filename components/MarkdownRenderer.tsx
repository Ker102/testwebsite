"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
  isAuthenticated: boolean;
}

export default function MarkdownRenderer({
  content,
  isAuthenticated,
}: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${isAuthenticated ? "markdown-light" : "markdown-dark"}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // Code blocks
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-lg my-4 text-sm"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${
                isAuthenticated
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white/20 text-cyan-300"
              } px-1.5 py-0.5 rounded text-sm font-mono`}
              {...props}
            >
              {children}
            </code>
          );
        },
        // Headings
        h1: ({ children }) => (
          <h1
            className={`text-2xl font-bold mt-6 mb-3 ${
              isAuthenticated ? "text-gray-900" : "text-white"
            }`}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className={`text-xl font-bold mt-5 mb-2 ${
              isAuthenticated ? "text-gray-800" : "text-white"
            }`}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className={`text-lg font-semibold mt-4 mb-2 ${
              isAuthenticated ? "text-gray-800" : "text-white"
            }`}
          >
            {children}
          </h3>
        ),
        // Paragraphs
        p: ({ children }) => (
          <p className="my-3 leading-relaxed">{children}</p>
        ),
        // Lists
        ul: ({ children }) => (
          <ul
            className={`list-disc list-inside my-3 space-y-1 ${
              isAuthenticated ? "text-gray-700" : "text-white/90"
            }`}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            className={`list-decimal list-inside my-3 space-y-1 ${
              isAuthenticated ? "text-gray-700" : "text-white/90"
            }`}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="my-1">{children}</li>,
        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isAuthenticated
                ? "text-blue-600 hover:text-blue-800"
                : "text-cyan-400 hover:text-cyan-300"
            } underline font-medium transition-colors`}
          >
            {children}
          </a>
        ),
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote
            className={`border-l-4 ${
              isAuthenticated ? "border-gray-400 bg-gray-50" : "border-cyan-400 bg-white/5"
            } pl-4 py-2 my-3 italic`}
          >
            {children}
          </blockquote>
        ),
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table
              className={`min-w-full border ${
                isAuthenticated ? "border-gray-300" : "border-white/20"
              } rounded-lg`}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead
            className={`${
              isAuthenticated ? "bg-gray-100" : "bg-white/10"
            }`}
          >
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th
            className={`px-4 py-2 text-left font-semibold ${
              isAuthenticated ? "text-gray-800" : "text-white"
            }`}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className={`px-4 py-2 border-t ${
              isAuthenticated ? "border-gray-300" : "border-white/20"
            }`}
          >
            {children}
          </td>
        ),
        // Strong (bold)
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        // Emphasis (italic)
        em: ({ children }) => <em className="italic">{children}</em>,
        // Horizontal rule
        hr: () => (
          <hr
            className={`my-6 ${
              isAuthenticated ? "border-gray-300" : "border-white/20"
            }`}
          />
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

