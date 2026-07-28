const Card = ({ children, className = "", title, subtitle }) => {
  return (
    <div className={`bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-primary/30 transition-colors duration-500 ${className}`}>
      {title && (
        <div className="p-4 border-b border-white/5">
          <h3 className="text-white font-serif text-lg">{title}</h3>
          {subtitle && <p className="text-white/40 text-xs uppercase">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;