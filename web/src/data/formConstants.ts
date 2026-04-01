import schoolsCsv from "../pages/Application/schools.csv?raw";
export { COUNTRIES } from "../pages/Application/countries";

export const SCHOOLS: string[] = (() => {
  const parsed = schoolsCsv
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.replace(/"/g, "").trim())
    .filter(Boolean);

  parsed.sort((a, b) => a.localeCompare(b));

  const topSchools = [
    "California State University-Fullerton",
    "California State University, Fullerton",
    "Fullerton College",
    "University of California Irvine",
    "Chapman University",
    "California State University-Long Beach",
    "California State Polytechnic University, Pomona",
    "Pomona College",
  ];

  for (let i = topSchools.length - 1; i >= 0; i--) {
    const idx = parsed.indexOf(topSchools[i]);
    if (idx > -1) {
      const schoolStr = parsed[idx];
      parsed.splice(idx, 1);
      parsed.unshift(schoolStr);
    }
  }
  if (!parsed.includes("Other")) parsed.push("Other");
  return parsed;
})();

export const MAJORS = [
  "Computer Science",
  "Computer Engineering",
  "Software Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
  "Materials Science & Engineering",
  "Information Technology",
  "Information Systems",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Game Design & Development",
  "Web Development",
  "Mathematics",
  "Applied Mathematics",
  "Statistics",
  "Physics",
  "Chemistry",
  "Biochemistry",
  "Biology",
  "Bioinformatics",
  "Neuroscience",
  "Environmental Science",
  "Business Administration",
  "Business Information Systems",
  "Accounting",
  "Economics",
  "Finance",
  "Marketing",
  "Entrepreneurship",
  "Supply Chain Management",
  "Graphic Design",
  "UX/UI Design",
  "Animation",
  "Film & Media",
  "Art",
  "Music",
  "Communications",
  "Journalism",
  "Public Relations",
  "Psychology",
  "Sociology",
  "Anthropology",
  "Political Science",
  "International Relations",
  "Criminal Justice",
  "Philosophy",
  "English",
  "Linguistics",
  "History",
  "Education",
  "Nursing",
  "Public Health",
  "Kinesiology",
  "Health Science",
  "Pre-Med",
  "Pre-Law",
  "Architecture",
  "Urban Planning",
  "Liberal Studies",
  "Undeclared",
  "Other",
];

export const LEVELS_OF_STUDY = [
  "Less than Secondary / High School",
  "Secondary / High School",
  "Undergraduate University (2 year - community college or similar)",
  "Undergraduate University (3+ year)",
  "Graduate University (Masters, Professional, Doctoral, etc)",
  "Code School / Bootcamp",
  "Other Vocational / Trade Program or Apprenticeship",
  "Post Doctorate",
  "Other",
  "I'm not currently a student",
  "Prefer not to answer",
];

export const AGES = Array.from({ length: 85 }, (_, i) => (i + 16).toString());

export const INPUT_STYLE = { boxShadow: "inset 0px 7px 8px rgba(0, 0, 0, 0.25)" };
export const INPUT_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-base md:text-lg placeholder-[#246B8A]/40 outline-none transition-colors";
export const INPUT_ERROR_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-base md:text-lg placeholder-[#246B8A]/40 outline-none ring-2 ring-red-400 transition-colors";
export const SELECT_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#070710] border-4 md:border-[7px] border-[#D9D9D9] text-[#EFEFEF] font-baloo text-base md:text-lg outline-none transition-colors appearance-none cursor-pointer";
export const SELECT_ERROR_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#070710] border-4 md:border-[7px] border-red-400 text-[#EFEFEF] font-baloo text-base md:text-lg outline-none transition-colors appearance-none cursor-pointer";

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidGithubUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/.test(url);
}

export function isValidGradYear(year: string): boolean {
  const n = parseInt(year, 10);
  return !isNaN(n) && n >= 2025 && n <= 2035;
}
