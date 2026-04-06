const TRACKS = [
  {
    title: "Best Entertainment",
    description:
      "Build a project that captivates your audience through immersive gaming, creative digital media, or a unique interactive storytelling experience.",
  },
  {
    title: "Best Health & Wellness",
    description:
      "Develop a solution that empowers individuals to improve their lives, focusing on physical fitness, mental well-being, or medical accessibility.",
  },
  {
    title: "Best Education & Social Justice",
    description:
      "Create a tool that breaks down barriers to learning or directly addresses systemic inequities to champion a fairer society.",
  },
  {
    title: "Best Social Impact & Sustainability",
    description:
      "Engineer a hack that tackles urgent global challenges, from protecting our environment to driving meaningful change in your local community.",
  },
  {
    title: "Best Use of AI/ML",
    description:
      "AI is the defining frontier of our generation, so dig deep and build an intelligent system, not just a simple wrapper, that uses data-driven insights to solve complex problems in ways we haven’t seen before.",
  },
  {
    title: "Best Beginner Project",
    description:
      "Jump into the deep end for your first hackathon by focusing on learning new skills, documenting your journey, and shipping a functional foundation. (Team must be >50% first-time hackers)",
  },
  {
    title: "Most Technical",
    description:
      "Flex your engineering muscles by architecting a high-performance system defined by complex back-end logic, sophisticated integrations, and robust code.",
  },
  {
    title: "Best UI/UX",
    description:
      "Prioritize the human at the other side of the screen by designing a seamless, beautiful, and intuitive interface that makes navigation feel like second nature.",
  },
  {
    title: "Esri's Sponsored Track",
    description:
      "More info coming soon...",
  },
  {
    title: "MLH Track",
    description:
      "More info coming soon...",
  },
];

function TrackCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1 sm:gap-3 bg-[#2162B1]/40 rounded-lg p-2 sm:p-5 justify-center items-center border-2 border-[#BEF3FC] min-h-[260px] min-w-[260px]">
      <h3 className="font-baloo text-sm sm:text-xl md:text-2xl lg:text-2xl text-[#EFEFEF] text-center leading-tight">
        {title}
      </h3>
      <p className="font-coheadline text-[0.6rem] leading-tight sm:text-sm md:text-base lg:text-base text-center sm:leading-snug">
        {description}
      </p>
    </div>
  );
}

export function TracksPrizes() {
  return (
    <div className="w-full px-4 md:px-10 lg:px-16 pt-10 md:pt-16 pb-20 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-nemo text-4xl md:text-6xl lg:text-7xl text-[#BEF3FC]">
          tracks and prizes
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-semibold">Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {TRACKS.map((track) => (
            <TrackCard key={track.title} title={track.title} description={track.description} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-semibold">Prizes</h2>
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(53, 120, 167, 0.3)",
            border: "1px solid rgba(239, 239, 239, 0.2)",
          }}
        >
          <p className="font-baloo text-sm text-[#EFEFEF]/50 italic">Prize details coming soon.</p>
        </div>
      </div>
    </div>
  );
}
