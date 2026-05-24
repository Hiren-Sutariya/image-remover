import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, company, avatarInitials, rating = 5 }) => {
  return (
    <div className="min-w-[350px] md:min-w-[450px] p-10 rounded-[2rem] bg-gray-50 border border-gray-100 mx-4 snap-center">
      <div className="flex gap-1 mb-8 text-[#0047FF]">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      
      <p className="text-[#404040] font-medium text-base md:text-lg mb-8 leading-relaxed">"{quote}"</p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#404040] font-bold text-sm shadow-sm">
          {avatarInitials}
        </div>
        <div>
          <h4 className="font-bold text-[#404040] tracking-tight">{author}</h4>
          <p className="text-sm text-[#555555]">{role}{company ? `, ${company}` : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
