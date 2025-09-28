const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    failure: "bg-red-100 text-red-700"
  };
  
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;