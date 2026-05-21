type CardProps = {
  company: string;
  role: string;
  period: string;
};

export const ExperienceCard: React.FC<CardProps> = ({
  company,
  role,
  period
}) => {

  const experienceDescriptions: Record<string, string[]> = {
    MultiDadosTI: [
      "Built and maintain a Business Intelligence portal with Power BI Embedded integrated to Azure, eliminating the need for Pro licenses for end users",
      "Developed a pre-sales portal covering the full commercial pipeline — lead management, proposal creation, and deal tracking — built in React and Next.js",
      "Developed a post-sales portal handling the full client lifecycle: support tickets, technical assistance, payments, receivables anticipation, and contract cancellations — built in React, Next.js, Tailwind CSS, and TanStack"
    ],
    Patriani: [
      "Built a complete BPM system in React, Next.js, TypeScript, and Tailwind CSS, replacing manual workflows and cutting operational bottlenecks across multiple departments",
      "Designed a multi-step approval flow with sequential sign-offs by different business areas, including client file upload and document management",
      "Set up the backend with N8N for workflow orchestration — automated email triggers, file uploads to AWS S3, and PostgreSQL integration",
      "Developed system integrations in Java (Spring) for cross-platform notifications and process automations",
      "Actively maintain and ship new features on pre-sales and post-sales portals built in React/Next.js, serving commercial and customer success teams"
    ]
  };

  return (
    <div className='flex flex-col justify-start border border-importantText bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-md text-start hover:-translate-y-1 hover:shadow-lg transition duration-200'>
      <h3 className='font-semibold'>{company}</h3>

      <p className='text-importantText mt-1'>{role}</p>

      <p className='text-sm mt-1'>{period}</p>

      {experienceDescriptions[company]?.map((desc, index) => (
        <p className='wrap-break-word text-start before:content-["▹"] before:text-importantText before:pr-2 text-sm mt-3' key={index}>{desc}</p>
      ))}
    </div>
  );
};