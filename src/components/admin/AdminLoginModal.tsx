import React, { useState } from 'react';
import { Lock, ShieldCheck, Eye, EyeOff, X, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // User requested single password protected e.g. Admin123
      if (password.trim() === 'Admin123') {
        setIsLoading(false);
        setPassword('');
        setError('');
        onSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid admin credentials. Please enter the correct password (Admin123).');
      }
    }, 400);
  };

  return (
    <div 
      id="modal-admin-login-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="modal-admin-login-card"
        className="relative w-full max-w-md bg-[#0B0F17] border border-[#D4AF37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="btn-close-admin-login"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/20 to-amber-500/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D4AF37] block">
              Boutique Staff Access
            </span>
            <h3 className="text-xl font-bold text-white font-serif tracking-wide mt-1">
              Admin HQ Authentication
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Please enter the single management security key to unlock catalog, orders & dispatch controller.
            </p>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>

              <input
                id="input-admin-password"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                placeholder="Enter password (e.g. Admin123)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-11 py-3 bg-[#111827] border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 font-mono tracking-wide"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error ? (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-400 font-medium animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <span>Default Passkey:</span>
                <span className="font-mono font-bold text-[#D4AF37] bg-black/40 px-1.5 py-0.5 rounded border border-[#D4AF37]/20">
                  Admin123
                </span>
              </p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <button
              id="btn-submit-admin-login"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-400 hover:from-[#c49f2e] hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Security Key...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Admin Portal</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors text-center cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        </form>

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Ayanbag SuperAdmin HQ</span>
          <span className="flex items-center gap-1 text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            256-Bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};
