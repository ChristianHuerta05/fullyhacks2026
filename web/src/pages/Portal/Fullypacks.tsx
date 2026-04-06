const FULLYPACKS = [
  {
    name: "fullypack_flask_vercel",
    description: "A premade Flask template!",
    language: "HTML",
    languageColor: "#e34c26",
    url: "https://github.com/acmcsufoss/fullypack_flask_vercel",
  },
  {
    name: "fullypack_sveltekit",
    description: "Everything you need to build a Svelte project",
    language: "Svelte",
    languageColor: "#ff3e00",
    url: "https://github.com/acmcsufoss/fullypack_sveltekit",
  },
  {
    name: "fullypack_html_css",
    description:
      "A premade template for the most basic web app that anyone can use to create their first website",
    language: "HTML",
    languageColor: "#e34c26",
    url: "https://github.com/acmcsufoss/fullypack_html_css",
  },
  {
    name: "fullypack_discord_python",
    description: "A premade Discord bot using discord.py!",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/acmcsufoss/fullypack_discord_python",
  },
  {
    name: "fullypack_fastapi",
    description: "Template project to make a REST API with FastApi",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/acmcsufoss/fullypack_fastapi",
  },
  {
    name: "fullypack_data_science",
    description: "A premade data science starter template",
    language: "Jupyter Notebook",
    languageColor: "#DA5B0B",
    url: "https://github.com/acmcsufoss/fullypack_data_science",
  },
  {
    name: "fullypack_react_native",
    description: "Premade template for cross-platform mobile dev using React Native (Expo)",
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://github.com/acmcsufoss/fullypack_react_native",
  },
];

function FullypackCard({
  name,
  description,
  language,
  languageColor,
  url,
}: {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:gap-3 bg-[#2162B1]/40 rounded-lg p-2 sm:p-5 justify-between min-h-[260px] min-w-[260px]">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h3 className="font-baloo text-xs sm:text-base md:text-lg lg:text-xl text-[#BEF3FC] leading-tight">
            {name}
          </h3>
          <p className="font-coheadline text-[0.6rem] leading-tight sm:text-xs md:text-sm lg:text-base text-[#EFEFEF]/80 sm:leading-snug">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-1 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
              style={{ backgroundColor: languageColor }}
            />
            <span className="font-coheadline text-[0.55rem] sm:text-xs md:text-sm text-[#EFEFEF]/60">
              {language}
            </span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-[#BEF3FC] hover:bg-[#EFEFEF]/20 transition-colors rounded-md px-2 py-1 sm:px-3 sm:py-1.5"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="#004284">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="font-coheadline text-[0.55rem] sm:text-xs md:text-sm text-[#004284]">
              GitHub
            </span>
          </a>
        </div>
    </div>
  );
}

export function Fullypacks() {
  return (
    <div className="w-full px-4 md:px-10 lg:px-16 pt-10 md:pt-16 pb-20 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-nemo text-4xl md:text-6xl lg:text-7xl text-[#BEF3FC]">fullypacks</h1>
        <p className="font-coheadline text-sm sm:text-base md:text-lg text-[#EFEFEF]/70">
          Starter templates to kickstart your hackathon project. Click any card to get started on
          GitHub!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {FULLYPACKS.map((pack) => (
          <FullypackCard
            key={pack.name}
            name={pack.name}
            description={pack.description}
            language={pack.language}
            languageColor={pack.languageColor}
            url={pack.url}
          />
        ))}
      </div>
    </div>
  );
}
