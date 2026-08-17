import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AYAN45');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside 
      aria-label="Announcement" 
      id="announcement-bar" 
      className="w-full bg-[#D4AF37] text-[#0D0D0D] text-[11px] py-1.5 px-4 relative z-50 font-bold tracking-widest uppercase shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left message */}
        <div className="flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D] animate-ping shrink-0" />
          <p className="font-bold tracking-widest text-[10px] sm:text-[11px]">
            Exclusive Sale: Flat 45% Off on All Master Copies | Free Nationwide Shipping
          </p>
        </div>

        {/* Center/Right Coupon Trigger */}
        <div className="flex items-center gap-3 justify-center">
          <button
            id="btn-copy-announcement-code"
            onClick={handleCopyCode}
            aria-label="Copy discount code AYAN45"
            className="inline-flex items-center gap-1.5 bg-[#0D0D0D] hover:bg-[#1A1A1A] text-[#D4AF37] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider transition-colors duration-200 cursor-pointer shadow"
          >
            <span className="text-[#A1A1AA] font-normal lowercase">use code:</span>
            <span className="font-mono font-black text-white">AYAN45</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-[#D4AF37]" />
            )}
            {copied && <span className="text-[9px] text-emerald-400 font-bold">COPIED</span>}
          </button>

          <span className="hidden md:inline-flex items-center gap-1 text-[#0D0D0D]/80 text-[10px] font-semibold lowercase">
            <span>•</span> cod & delhi store walk-in open
          </span>
        </div>

      </div>
    </aside>
  );
};
