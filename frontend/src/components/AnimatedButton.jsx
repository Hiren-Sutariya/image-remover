
const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  icon: Icon
}) => {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-foreground text-white hover:bg-black px-6 py-3 shadow-lg shadow-black/10",
    secondary: "bg-white text-foreground border border-gray-200 hover:border-gray-300 px-6 py-3 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-foreground hover:bg-gray-100 px-4 py-2",
    accent: "bg-gradient-to-r from-primary to-accent text-white px-8 py-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 text-lg font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="relative z-10">{children}</span>
      {variant === 'accent' && (
        <div 
          className="absolute inset-0 z-0 bg-white opacity-0"        />
      )}
    </button>
  );
};

export default AnimatedButton;
