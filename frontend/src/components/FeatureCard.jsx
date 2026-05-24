
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col items-start transition-colors hover:border-gray-200">
      <div className="w-14 h-14 rounded-[1.2rem] bg-white shadow-sm flex items-center justify-center text-[#404040] mb-6">
        <Icon size={24} strokeWidth={2} />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-[#404040] tracking-tight">{title}</h3>
      <p className="text-[#555555] text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
