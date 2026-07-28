const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-white/50 text-[10px] uppercase tracking-widest ml-1">{label}</label>}
      <input
        className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/20 outline-none transition-all duration-300 ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
    </div>
  );
};

export default Input;