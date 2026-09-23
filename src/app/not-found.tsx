import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import XtremeLogo from '@/components/ui/XtremeLogo';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl border border-gray-200 shadow-xl">
        <div className="mb-6 flex justify-center">
          <XtremeLogo variant="navy" size="md" />
        </div>

        <div className="text-6xl font-black text-[#C62828] font-mono mb-3">
          404
        </div>

        <h1 className="text-xl font-bold text-[#050A5C] mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-gray-600 leading-relaxed mb-8">
          The page or product document you are looking for has been moved, renamed, or is currently unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#050A5C] hover:bg-[#080B63] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
