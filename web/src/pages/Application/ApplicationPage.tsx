import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../contexts/useAuth";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import Background from "../../assets/ApplicationPage/Background.svg";
import schoolsCsv from "./schools.csv?raw";
import { COUNTRIES } from "./countries";

const SCHOOLS: string[] = (() => {
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

const MAJORS = [
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

const LEVELS_OF_STUDY = [
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

const AGES = Array.from({ length: 85 }, (_, i) => (i + 16).toString());

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidGithubUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/.test(url);
}

function isValidGradYear(year: string): boolean {
  const n = parseInt(year, 10);
  return !isNaN(n) && n >= 2025 && n <= 2035;
}

function AutocompleteInput({
  label,
  options,
  value,
  onChange,
  onSelectOther,
  placeholder,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  onSelectOther?: () => void;
  placeholder?: string;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options
    .filter((opt) => {
      const searchTerms = inputValue.toLowerCase().split(" ").filter(Boolean);
      if (searchTerms.length === 0) return true;
      const optLower = opt.toLowerCase();
      return searchTerms.every((term) => optLower.includes(term));
    })
    .sort((a, b) => {
      if (!inputValue) return 0;
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const inputLower = inputValue.toLowerCase().trim();
      const aStarts = aLower.startsWith(inputLower);
      const bStarts = bLower.startsWith(inputLower);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  return (
    <div className="flex flex-col gap-2 w-full" ref={wrapperRef}>
      <label className="font-baloo text-xl text-[#EFEFEF]">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-base md:text-lg placeholder-[#246B8A]/40 outline-none transition-colors ${error ? "ring-2 ring-red-400" : ""}`}
          style={{ boxShadow: "inset 0px 7px 8px rgba(0, 0, 0, 0.25)" }}
        />
        {isOpen && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#070710] border-4 md:border-[7px] border-[#D9D9D9] rounded-[16px] md:rounded-[23px] z-50">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  if (opt === "Other") {
                    setInputValue("");
                    onChange("");
                    onSelectOther?.();
                  } else {
                    setInputValue(opt);
                    onChange(opt);
                  }
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-3 font-baloo text-lg text-[#EFEFEF] hover:bg-[#72D6E6] hover:text-[#246B8A] hover:rounded-[23px] transition-colors first:rounded-t-[16px] last:rounded-b-[16px] ${
                  opt === "Other" ? "border-t border-[#EFEFEF]/20 text-[#FED220]" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
    </div>
  );
}

const INPUT_STYLE = { boxShadow: "inset 0px 7px 8px rgba(0, 0, 0, 0.25)" };
const INPUT_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-base md:text-lg placeholder-[#246B8A]/40 outline-none transition-colors";
const INPUT_ERROR_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-base md:text-lg placeholder-[#246B8A]/40 outline-none ring-2 ring-red-400 transition-colors";
const SELECT_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#070710] border-4 md:border-[7px] border-[#D9D9D9] text-[#EFEFEF] font-baloo text-base md:text-lg outline-none transition-colors appearance-none cursor-pointer";
const SELECT_ERROR_CLASS =
  "w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] bg-[#070710] border-4 md:border-[7px] border-red-400 text-[#EFEFEF] font-baloo text-base md:text-lg outline-none transition-colors appearance-none cursor-pointer";

function CheckboxVisual({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-8 h-8 rounded-[7px] shrink-0 flex items-center justify-center ${checked ? "bg-[#72D6E6]" : "bg-[#72D6E6]/50"}`}
    >
      {checked && (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path
            d="M2 7L7 12L16 2"
            stroke="#1F5962"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

const STORAGE_KEY = "fullyhacks-application-draft";

export function ApplicationPage() {
  const { user, loading, githubUsername } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/apply");
      return;
    }
    const checkExisting = async () => {
      const docSnap = await getDoc(doc(db, "applications", user.uid));
      if (docSnap.exists()) {
        navigate("/profile");
      }
    };
    checkExisting();
  }, [user, loading, navigate]);

  const [form, setForm] = useState(() => {
    const defaults = {
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      schoolOther: "",
      githubUrl: githubUsername ? `https://github.com/${githubUsername}` : "",
      linkedinUrl: "",
      pronouns: "",
      phone: "",
      major: "",
      majorOther: "",
      gradYear: "",
      age: "",
      level: "",
      country: "",
      skillLevel: "",
      whyJoin: "",
      foodChoice: "",
      foodOther: "",
      shirtSize: "",
      isAdult: false,
      agreeTerms: false,
      mlhCodeOfConduct: false,
      mlhPrivacy: false,
      mlhEmails: false,
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed.form };
      }
      // eslint-disable-next-line no-empty
    } catch {}
    return defaults;
  });

  const [isSchoolOther, setIsSchoolOther] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).isSchoolOther ?? false;
      // eslint-disable-next-line no-empty
    } catch {}
    return false;
  });
  const [isMajorOther, setIsMajorOther] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).isMajorOther ?? false;
      // eslint-disable-next-line no-empty
    } catch {}
    return false;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, isSchoolOther, isMajorOther }));
      // eslint-disable-next-line no-empty
    } catch {}
  }, [form, isSchoolOther, isMajorOther]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setResumeError("Only PDF files are accepted.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File must be under 5 MB.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }
    setResumeFile(file);
  };

  const wordCount = form.whyJoin
    .trim()
    .split(/\s+/)
    .filter((w: string) => w.length > 0).length;

  const updateField = (field: string, value: string | boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setForm((prev: Record<string, any>) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (isSchoolOther) {
      if (!form.schoolOther.trim()) errs.schoolOther = "Please specify your school";
    } else {
      if (!form.school.trim()) errs.school = "School is required";
    }

    if (!form.githubUrl.trim()) {
      errs.githubUrl = "GitHub URL is required";
    } else if (!isValidGithubUrl(form.githubUrl)) {
      errs.githubUrl = "Please enter a valid GitHub URL (e.g. https://github.com/username)";
    }

    if (!form.pronouns.trim()) errs.pronouns = "Pronouns are required";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      errs.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }

    if (isMajorOther) {
      if (!form.majorOther.trim()) errs.majorOther = "Please specify your major";
    } else {
      if (!form.major.trim()) errs.major = "Major is required";
    }

    if (!form.gradYear.trim()) {
      errs.gradYear = "Graduation year is required";
    } else if (!isValidGradYear(form.gradYear)) {
      errs.gradYear = "Please enter a valid year (2025-2035)";
    }

    if (!form.age) errs.age = "Age is required";
    if (!form.level) errs.level = "Please select your level of study";
    if (!form.country.trim()) errs.country = "Country of residence is required";
    if (!form.skillLevel) errs.skillLevel = "Please select your skill level";

    if (!form.whyJoin.trim()) {
      errs.whyJoin = "This field is required";
    } else if (wordCount > 100) {
      errs.whyJoin = "Please keep your response under 100 words";
    }

    if (!form.foodChoice) errs.foodChoice = "Please select a food preference";
    if (form.foodChoice === "other" && !form.foodOther.trim()) {
      errs.foodOther = "Please specify your dietary restriction";
    }

    if (!form.shirtSize) errs.shirtSize = "Please select a shirt size";

    if (!form.isAdult) errs.isAdult = "You must be 18 or older by April 18th, 2026";
    if (!form.agreeTerms) errs.agreeTerms = "You must agree to the FullyHacks event terms";
    if (!form.mlhCodeOfConduct) errs.mlhCodeOfConduct = "You must agree to the MLH Code of Conduct";
    if (!form.mlhPrivacy) errs.mlhPrivacy = "You must agree to share information with MLH";

    if (!resumeFile) errs.resume = "Please attach your resume (PDF)";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;
    if (!resumeFile) {
      setResumeError("Please attach your resume (PDF)");
      return;
    }

    setIsSubmitting(true);

    const finalForm = {
      ...form,
      school: isSchoolOther ? form.schoolOther : form.school,
      major: isMajorOther ? form.majorOther : form.major,
    };

    try {
      const resumeRef = ref(storage, `resumes/${user.uid}/resume.pdf`);
      await uploadBytes(resumeRef, resumeFile, { contentType: "application/pdf" });
      const resumeUrl = await getDownloadURL(resumeRef);

      await setDoc(doc(db, "applications", user.uid), {
        ...finalForm,
        resumeUrl,
        status: "pending",
        userId: user.uid,
        displayName: user.displayName || `${form.firstName} ${form.lastName}`.trim(),
        submittedAt: serverTimestamp(),
      });
      localStorage.removeItem(STORAGE_KEY);
      navigate("/profile");
    } catch (err) {
      console.error("Failed to submit application:", err);
      alert("Something went wrong submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-slate-100 relative"
        style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}
      >
        <p className="font-baloo text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center text-slate-100 relative"
      style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}
    >
      <div className="flex flex-col items-center pt-6 md:pt-10 z-1 px-4">
        <img src={FullyHacksLogo} alt="FullyHacksLogo" className="w-36 md:w-60" />
        <h1 className="font-nemo text-4xl md:text-8xl text-[#FFF5F5] text-center">
          MY APPLICATION
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl z-1 flex flex-col gap-5 md:gap-6 px-4 md:px-6 py-6 md:py-10"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-baloo text-xl text-[#EFEFEF]">First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="John"
              className={errors.firstName ? INPUT_ERROR_CLASS : INPUT_CLASS}
              style={INPUT_STYLE}
            />
            {errors.firstName && (
              <span className="font-baloo text-sm text-red-400">{errors.firstName}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-baloo text-xl text-[#EFEFEF]">Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Doe"
              className={errors.lastName ? INPUT_ERROR_CLASS : INPUT_CLASS}
              style={INPUT_STYLE}
            />
            {errors.lastName && (
              <span className="font-baloo text-sm text-red-400">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value.toLowerCase().trim())}
            placeholder="johndoe@gmail.com"
            className={errors.email ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.email && <span className="font-baloo text-sm text-red-400">{errors.email}</span>}
        </div>
        {isSchoolOther ? (
          <div className="flex flex-col gap-2">
            <label className="font-baloo text-xl text-[#EFEFEF]">School (Other)</label>
            <input
              type="text"
              value={form.schoolOther}
              onChange={(e) => updateField("schoolOther", e.target.value)}
              placeholder="Enter your school name..."
              className={errors.schoolOther ? INPUT_ERROR_CLASS : INPUT_CLASS}
              style={INPUT_STYLE}
            />
            <button
              type="button"
              onClick={() => {
                setIsSchoolOther(false);
                updateField("schoolOther", "");
              }}
              className="font-baloo text-sm text-[#FED220] self-start hover:underline"
            >
              ← Back to list
            </button>
            {errors.schoolOther && (
              <span className="font-baloo text-sm text-red-400">{errors.schoolOther}</span>
            )}
          </div>
        ) : (
          <AutocompleteInput
            label="School"
            options={SCHOOLS}
            value={form.school}
            onChange={(val) => updateField("school", val)}
            onSelectOther={() => setIsSchoolOther(true)}
            placeholder="Start typing your school..."
            error={errors.school}
          />
        )}

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">GitHub URL</label>
          <input
            type="url"
            value={form.githubUrl}
            onChange={(e) => updateField("githubUrl", e.target.value.trim())}
            placeholder="https://github.com/username"
            className={errors.githubUrl ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.githubUrl && (
            <span className="font-baloo text-sm text-red-400">{errors.githubUrl}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">
            LinkedIn URL <span className="text-[#EFEFEF]/50 text-base">(optional)</span>
          </label>
          <input
            type="url"
            value={form.linkedinUrl}
            onChange={(e) => updateField("linkedinUrl", e.target.value.trim())}
            placeholder="https://linkedin.com/in/username"
            className={errors.linkedinUrl ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Pronouns</label>
          <input
            type="text"
            value={form.pronouns}
            onChange={(e) => updateField("pronouns", e.target.value)}
            placeholder="e.g. he/him, she/her, they/them"
            className={errors.pronouns ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.pronouns && (
            <span className="font-baloo text-sm text-red-400">{errors.pronouns}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", formatPhoneNumber(e.target.value))}
            placeholder="(123) 456-7890"
            className={errors.phone ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.phone && <span className="font-baloo text-sm text-red-400">{errors.phone}</span>}
        </div>

        {isMajorOther ? (
          <div className="flex flex-col gap-2">
            <label className="font-baloo text-xl text-[#EFEFEF]">Major (Other)</label>
            <input
              type="text"
              value={form.majorOther}
              onChange={(e) => updateField("majorOther", e.target.value)}
              placeholder="Enter your major..."
              className={errors.majorOther ? INPUT_ERROR_CLASS : INPUT_CLASS}
              style={INPUT_STYLE}
            />
            <button
              type="button"
              onClick={() => {
                setIsMajorOther(false);
                updateField("majorOther", "");
              }}
              className="font-baloo text-sm text-[#FED220] self-start hover:underline"
            >
              ← Back to list
            </button>
            {errors.majorOther && (
              <span className="font-baloo text-sm text-red-400">{errors.majorOther}</span>
            )}
          </div>
        ) : (
          <AutocompleteInput
            label="Major"
            options={MAJORS}
            value={form.major}
            onChange={(val) => updateField("major", val)}
            onSelectOther={() => setIsMajorOther(true)}
            placeholder="Start typing your major..."
            error={errors.major}
          />
        )}

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Graduation Year</label>
          <input
            type="text"
            inputMode="numeric"
            value={form.gradYear}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              updateField("gradYear", val);
            }}
            placeholder="e.g. 2027"
            className={errors.gradYear ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.gradYear && (
            <span className="font-baloo text-sm text-red-400">{errors.gradYear}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Age</label>
          <select
            value={form.age}
            onChange={(e) => updateField("age", e.target.value)}
            className={errors.age ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your age
            </option>
            {AGES.map((a) => (
              <option key={a} value={a} className="bg-[#1D244C] text-[#EFEFEF]">
                {a}
              </option>
            ))}
          </select>
          {errors.age && <span className="font-baloo text-sm text-red-400">{errors.age}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Level of Study</label>
          <select
            value={form.level}
            onChange={(e) => updateField("level", e.target.value)}
            className={errors.level ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your level of study
            </option>
            {LEVELS_OF_STUDY.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-[#1D244C] text-[#EFEFEF]">
                {lvl}
              </option>
            ))}
          </select>
          {errors.level && <span className="font-baloo text-sm text-red-400">{errors.level}</span>}
        </div>

        <AutocompleteInput
          label="Country of Residence"
          options={COUNTRIES}
          value={form.country}
          onChange={(val) => updateField("country", val)}
          placeholder="Start typing your country..."
          error={errors.country}
        />

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Skill Level</label>
          <select
            value={form.skillLevel}
            onChange={(e) => updateField("skillLevel", e.target.value)}
            className={errors.skillLevel ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your skill level
            </option>
            <option value="no-experience" className="bg-[#1D244C] text-[#EFEFEF]">
              No Experience
            </option>
            <option value="some-experience" className="bg-[#1D244C] text-[#EFEFEF]">
              Some Experience
            </option>
            <option value="experienced" className="bg-[#1D244C] text-[#EFEFEF]">
              Experienced
            </option>
          </select>
          {errors.skillLevel && (
            <span className="font-baloo text-sm text-red-400">{errors.skillLevel}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">
            Why do you want to join FullyHacks?
          </label>
          <textarea
            value={form.whyJoin}
            onChange={(e) => {
              const words = e.target.value
                .trim()
                .split(/\s+/)
                .filter((w) => w.length > 0);
              if (words.length <= 100 || e.target.value.length < form.whyJoin.length) {
                updateField("whyJoin", e.target.value);
              }
            }}
            placeholder="Tell us what excites you about FullyHacks..."
            rows={5}
            className={`${errors.whyJoin ? INPUT_ERROR_CLASS : INPUT_CLASS} resize-none`}
          />
          <span
            className={`font-baloo text-sm self-end ${
              wordCount >= 90 ? "text-[#FED220]" : "text-[#EFEFEF]/60"
            }`}
          >
            {wordCount}/100 words
          </span>
          {errors.whyJoin && (
            <span className="font-baloo text-sm text-red-400">{errors.whyJoin}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">
            Resume <span className="text-[#EFEFEF]/50 text-base">(PDF only, max 5 MB)</span>
          </label>
          <button
            type="button"
            onClick={() => resumeInputRef.current?.click()}
            className={`w-full px-4 py-3 md:px-6 md:py-5 rounded-[16px] md:rounded-[23px] text-left font-baloo text-base md:text-lg transition-colors cursor-pointer ${
              resumeError
                ? "bg-[#072010] border-2 border-red-400 text-red-400"
                : resumeFile
                  ? "bg-[#072010] border-2 border-[#72D6E6] text-[#72D6E6]"
                  : "bg-[#070710] border-4 md:border-[7px] border-[#D9D9D9] text-[#EFEFEF]/50"
            }`}
          >
            {resumeFile ? `✓ ${resumeFile.name}` : "Click to upload resume..."}
          </button>
          <input
            ref={resumeInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleResumeChange}
            className="hidden"
          />
          {resumeError && <span className="font-baloo text-sm text-red-400">{resumeError}</span>}
          {errors.resume && !resumeError && (
            <span className="font-baloo text-sm text-red-400">{errors.resume}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Food Choice</label>
          <select
            value={form.foodChoice}
            onChange={(e) => updateField("foodChoice", e.target.value)}
            className={errors.foodChoice ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your food preference
            </option>
            <option value="no-preference" className="bg-[#1D244C] text-[#EFEFEF]">
              No Preference
            </option>
            <option value="vegetarian" className="bg-[#1D244C] text-[#EFEFEF]">
              Vegetarian
            </option>
            <option value="vegan" className="bg-[#1D244C] text-[#EFEFEF]">
              Vegan
            </option>
            <option value="other" className="bg-[#1D244C] text-[#EFEFEF]">
              Other
            </option>
          </select>
          {errors.foodChoice && (
            <span className="font-baloo text-sm text-red-400">{errors.foodChoice}</span>
          )}
        </div>

        {form.foodChoice === "other" && (
          <div className="flex flex-col gap-2">
            <label className="font-baloo text-xl text-[#EFEFEF]">
              If you chose Other, please specify
            </label>
            <input
              type="text"
              value={form.foodOther}
              onChange={(e) => updateField("foodOther", e.target.value)}
              placeholder="e.g. Halal, Kosher, Gluten-free..."
              className={errors.foodOther ? INPUT_ERROR_CLASS : INPUT_CLASS}
              style={INPUT_STYLE}
            />
            {errors.foodOther && (
              <span className="font-baloo text-sm text-red-400">{errors.foodOther}</span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Shirt Size</label>
          <select
            value={form.shirtSize}
            onChange={(e) => updateField("shirtSize", e.target.value)}
            className={errors.shirtSize ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your shirt size
            </option>
            <option value="XS" className="bg-[#1D244C] text-[#EFEFEF]">
              XS
            </option>
            <option value="S" className="bg-[#1D244C] text-[#EFEFEF]">
              S
            </option>
            <option value="M" className="bg-[#1D244C] text-[#EFEFEF]">
              M
            </option>
            <option value="L" className="bg-[#1D244C] text-[#EFEFEF]">
              L
            </option>
            <option value="XL" className="bg-[#1D244C] text-[#EFEFEF]">
              XL
            </option>
            <option value="2XL" className="bg-[#1D244C] text-[#EFEFEF]">
              2XL
            </option>
            <option value="3XL" className="bg-[#1D244C] text-[#EFEFEF]">
              3XL
            </option>
          </select>
          {errors.shirtSize && (
            <span className="font-baloo text-sm text-red-400">{errors.shirtSize}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="isAdult" className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="isAdult"
              checked={form.isAdult}
              onChange={(e) => updateField("isAdult", e.target.checked)}
              className="sr-only"
            />
            <CheckboxVisual checked={form.isAdult} />
            <span className="font-baloo text-xl text-[#EFEFEF]">
              I'm 18 or older by April 18th, 2026
            </span>
          </label>
          {errors.isAdult && (
            <span className="font-baloo text-sm text-red-400 ml-11">{errors.isAdult}</span>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-4 p-4 md:p-6 rounded-[16px] md:rounded-[23px] bg-[#070710]/40 border border-[#72D6E6]/30">
          <h3 className="font-baloo text-2xl text-[#FED220]">Event Terms & Conditions*</h3>
          <ul className="flex flex-col gap-2 font-baloo text-sm md:text-base text-[#EFEFEF]/80 list-disc list-inside">
            <li>I consent to photographs being taken and being used for marketing purposes</li>
            <li>
              I consent to providing a safe space for hackers to learn and grow their interests in
              computing
            </li>
            <li>
              I consent to following the provided guidelines and rules instructed by the organizing
              team
            </li>
            <li>
              I understand that failure to comply with guidelines or creating an unsafe space will
              result in my removal from the event
            </li>
            <li>
              I understand this is an in person event taking place at CSUF and I must attend in
              person in order to participate
            </li>
          </ul>

          <label htmlFor="agreeTerms" className="flex items-center gap-3 cursor-pointer mt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={form.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
              className="sr-only"
            />
            <CheckboxVisual checked={form.agreeTerms} />
            <span className="font-baloo text-base md:text-xl text-[#EFEFEF]">
              I agree to the FullyHacks event terms above
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="font-baloo text-sm text-red-400 ml-11">{errors.agreeTerms}</span>
          )}
        </div>

        <div className="flex flex-col gap-4 p-4 md:p-6 rounded-[16px] md:rounded-[23px] bg-[#070710]/40 border border-[#72D6E6]/30">
          <h3 className="font-baloo text-2xl text-[#FED220]">MLH Notices*</h3>

          <div className="flex flex-col gap-4 mt-2">
            <label htmlFor="mlhCodeOfConduct" className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="mlhCodeOfConduct"
                checked={form.mlhCodeOfConduct}
                onChange={(e) => updateField("mlhCodeOfConduct", e.target.checked)}
                className="sr-only"
              />
              <div className="mt-1">
                <CheckboxVisual checked={form.mlhCodeOfConduct} />
              </div>
              <span className="font-baloo text-base md:text-lg text-[#EFEFEF]">
                I have read and agree to the{" "}
                <a
                  href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                >
                  MLH Code of Conduct
                </a>
                .
              </span>
            </label>
            {errors.mlhCodeOfConduct && (
              <span className="font-baloo text-sm text-red-400 ml-11">
                {errors.mlhCodeOfConduct}
              </span>
            )}

            <label htmlFor="mlhPrivacy" className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="mlhPrivacy"
                checked={form.mlhPrivacy}
                onChange={(e) => updateField("mlhPrivacy", e.target.checked)}
                className="sr-only"
              />
              <div className="mt-1">
                <CheckboxVisual checked={form.mlhPrivacy} />
              </div>
              <span className="font-baloo text-base md:text-lg text-[#EFEFEF]">
                I authorize you to share my application/registration information with Major League
                Hacking for event administration, ranking, and MLH administration in-line with the{" "}
                <a
                  href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                >
                  MLH Privacy Policy
                </a>
                . I further agree to the terms of both the{" "}
                <a
                  href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                >
                  MLH Contest Terms and Conditions
                </a>{" "}
                and the{" "}
                <a
                  href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                >
                  MLH Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.mlhPrivacy && (
              <span className="font-baloo text-sm text-red-400 ml-11">{errors.mlhPrivacy}</span>
            )}

            <label htmlFor="mlhEmails" className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="mlhEmails"
                checked={form.mlhEmails}
                onChange={(e) => updateField("mlhEmails", e.target.checked)}
                className="sr-only"
              />
              <div className="mt-1">
                <CheckboxVisual checked={form.mlhEmails} />
              </div>
              <span className="font-baloo text-base md:text-lg text-[#EFEFEF]">
                I authorize MLH to send me occasional emails about relevant events, career
                opportunities, and community announcements.
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <p className="font-baloo text-sm text-[#EFEFEF]/50">Resources</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-baloo text-sm text-[#FED220] underline hover:text-[#ffe566] transition-colors"
              >
                MLH Code of Conduct
              </a>
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-baloo text-sm text-[#FED220] underline hover:text-[#ffe566] transition-colors"
              >
                MLH Privacy Policy
              </a>
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-baloo text-sm text-[#FED220] underline hover:text-[#ffe566] transition-colors"
              >
                MLH Contest Terms and Conditions
              </a>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 mx-auto px-10 md:px-16 py-3 md:py-4 rounded-2xl md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-xl md:text-2xl hover:bg-[#5bc0d0] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Uploading & Submitting..." : "Submit Application"}
        </button>
      </form>

      <img
        src={Background}
        alt="Background"
        className="w-full absolute bottom-0 z-0 pointer-events-none"
      />
    </div>
  );
}
