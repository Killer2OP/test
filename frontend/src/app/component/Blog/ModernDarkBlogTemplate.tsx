"use client";
import React from "react";

interface ModernDarkBlogTemplateProps {
  children: React.ReactNode;
}

const ModernDarkBlogTemplate: React.FC<ModernDarkBlogTemplateProps> = ({
  children
}) => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content - No Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

// Highlighted text component
export const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="text-[#FF5252]">{children}</span>;
};

// Quote component with red sidebar style
export const QuoteSection: React.FC<{
  title: string;
  author?: string;
}> = ({ title, author }) => {
  return (
    <div className="flex my-12 bg-[#111111] rounded-none overflow-hidden">
      <div className="flex-shrink-0 w-6 bg-[#FF5252]">
        <div className="h-full"></div>
      </div>
      <div className="p-6">
        <h3 className="text-[15px] font-medium leading-relaxed text-white">{title}</h3>
        {author && <p className="text-xs text-gray-400 mt-3">{author}</p>}
      </div>
    </div>
  );
};

// Paragraph component with proper spacing
export const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-gray-300 mb-8 leading-relaxed text-[15px] tracking-wide">{children}</p>;
};

export default ModernDarkBlogTemplate;
