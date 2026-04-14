type CardProps = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const ExperienceCard: React.FC<CardProps> = ({
  company,
  role,
  period,
  description,
}) => {
  return (
    <div className='flex flex-col justify-start border border-importantText bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-md text-start hover:-translate-y-1 hover:shadow-lg transition duration-200'>
      <h3 className='font-semibold'>{company}</h3>

      <p className='text-importantText mt-1'>{role}</p>

      <p className='text-sm mt-1'>{period}</p>

      <p className='wrap-break-word text-start before:content-["▹"] before:text-importantText before:pr-2 text-sm mt-3'>{description}</p>
    </div>
  );
};