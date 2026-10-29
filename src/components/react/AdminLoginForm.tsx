// src/components/react/AdminLoginForm.tsx
import { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Fill sample demo credentials for instant testing
  const handleAutoFillDemo = () => {
    setEmail('admin@wintercart.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication verification
    setTimeout(() => {
      // Demo validation check
      if (email.toLowerCase() === 'admin@wintercart.com' && password === 'admin123') {
        setIsSuccess(true);
        setIsLoading(false);
        // Persist session flag if remember me is selected
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('wintercart_admin_auth', 'true');
          if (rememberMe) {
            localStorage.setItem('wintercart_admin_user', email);
          }
          setTimeout(() => {
            window.location.href = '/admin';
          }, 600);
        }
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid administrator credentials. You can click "Quick Demo Fill" below to test.');
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Auth Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[11px] font-bold tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </div>
          <h2 className="text-2xl font-black text-indigo-950 tracking-tight">
            Sign In to Dashboard
          </h2>
          <p className="text-xs text-slate-500">
            Enter your authorized WinterCart staff credentials to manage orders, inventory, and analytics.
          </p>
        </div>

        {/* Quick Demo Fill Helper Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Demo Credentials</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              admin@wintercart.com / admin123
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="shrink-0 bg-white hover:bg-slate-100 text-indigo-950 border border-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-2xs"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {isSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Authentication Successful!</p>
              <p className="text-emerald-700">
                Welcome back, Administrator. Redirecting to management console...
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email / Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-indigo-950" htmlFor="admin-email">
              Admin Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wintercart.com"
                required
                disabled={isLoading || isSuccess}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-indigo-950" htmlFor="admin-password">
                Password
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Please contact the IT Security administrator to reset your credentials.');
                }}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading || isSuccess}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-600 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-slate-300 accent-rose-500 cursor-pointer"
              />
              <span>Remember this workstation</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full mt-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-md shadow-rose-200 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating Admin...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Authenticated</span>
              </>
            ) : (
              <>
                <span>Access Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice Footer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Protected area. Unauthorized access attempts are monitored and logged with IP addresses.
          </p>
        </div>

      </div>

      {/* Back to store navigation */}
      <div className="text-center mt-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-rose-500 transition"
        >
          <span>←</span>
          <span>Return to WinterCart Storefront</span>
        </a>
      </div>

    </div>
  );
}

