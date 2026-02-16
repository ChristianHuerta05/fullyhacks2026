import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/useAuth";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import Background from "../../assets/ApplicationPage/Background.svg";

const SCHOOLS = [
  "California State University, Fullerton",
  "California State University, Long Beach",
  "California State University, Los Angeles",
  "California State University, Northridge",
  "California State University, Pomona",
  "California State University, San Bernardino",
  "California State University, Dominguez Hills",
  "California State University, Channel Islands",
  "California State University, Bakersfield",
  "California State University, Fresno",
  "California State University, Sacramento",
  "California State University, San Diego",
  "California State University, San Jose",
  "California State University, Stanislaus",
  "California State University, East Bay",
  "California State University, Monterey Bay",
  "California State University, San Marcos",
  "California State University, Chico",
  "California State University, Humboldt",
  "California State University, Maritime Academy",
  "California Polytechnic State University, San Luis Obispo",
  "California Polytechnic State University, Pomona",
  "University of California, Irvine",
  "University of California, Los Angeles",
  "University of California, Berkeley",
  "University of California, San Diego",
  "University of California, Davis",
  "University of California, Santa Barbara",
  "University of California, Santa Cruz",
  "University of California, Riverside",
  "University of California, Merced",
  "University of Southern California",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Georgia Institute of Technology",
  "Carnegie Mellon University",
  "University of Washington",
  "University of Texas at Austin",
  "University of Michigan",
  "University of Illinois Urbana-Champaign",
  "Purdue University",
  "Arizona State University",
  "Oregon State University",
  "University of Colorado Boulder",
  "San Diego State University",
  "San Jose State University",
  "Harvey Mudd College",
  "Pomona College",
  "Claremont McKenna College",
  "Other",
];

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

  const filtered = options.filter((opt) => opt.toLowerCase().includes(inputValue.toLowerCase()));

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

  const [form, setForm] = useState(() => ({
    fullName: "",
    schoolEmail: "",
    school: "",
    schoolOther: "",
    githubUrl: githubUsername ? `https://github.com/${githubUsername}` : "",
    pronouns: "",
    phone: "",
    major: "",
    majorOther: "",
    gradYear: "",
    level: "",
    skillLevel: "",
    whyJoin: "",
    foodChoice: "",
    foodOther: "",
    isAdult: false,
  }));

  const [isSchoolOther, setIsSchoolOther] = useState(false);
  const [isMajorOther, setIsMajorOther] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const wordCount = form.whyJoin
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

    if (!form.fullName.trim()) errs.fullName = "Full name is required";

    if (!form.schoolEmail.trim()) {
      errs.schoolEmail = "School email is required";
    } else if (!isValidEmail(form.schoolEmail)) {
      errs.schoolEmail = "Please enter a valid email address";
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

    if (!form.level) errs.level = "Please select your level";
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

    if (!form.isAdult) errs.isAdult = "You must be 18 or older by April 12th, 2026";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    const finalForm = {
      ...form,
      school: isSchoolOther ? form.schoolOther : form.school,
      major: isMajorOther ? form.majorOther : form.major,
    };

    try {
      await setDoc(doc(db, "applications", user.uid), {
        ...finalForm,
        status: "pending",
        userId: user.uid,
        displayName: user.displayName || form.fullName,
        submittedAt: serverTimestamp(),
      });
      navigate("/profile");
    } catch (err) {
      console.error("Failed to submit application:", err);
      alert("Something went wrong submitting your application. Please try again.");
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
        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="John Doe"
            className={errors.fullName ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.fullName && (
            <span className="font-baloo text-sm text-red-400">{errors.fullName}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-baloo text-xl text-[#EFEFEF]">School Email</label>
          <input
            type="email"
            value={form.schoolEmail}
            onChange={(e) => updateField("schoolEmail", e.target.value.toLowerCase().trim())}
            placeholder="johndoe@csu.fullerton.edu"
            className={errors.schoolEmail ? INPUT_ERROR_CLASS : INPUT_CLASS}
            style={INPUT_STYLE}
          />
          {errors.schoolEmail && (
            <span className="font-baloo text-sm text-red-400">{errors.schoolEmail}</span>
          )}
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
          <label className="font-baloo text-xl text-[#EFEFEF]">Level</label>
          <select
            value={form.level}
            onChange={(e) => updateField("level", e.target.value)}
            className={errors.level ? SELECT_ERROR_CLASS : SELECT_CLASS}
          >
            <option value="" disabled className="bg-[#1D244C] text-[#EFEFEF]">
              Select your level
            </option>
            <option value="undergraduate" className="bg-[#1D244C] text-[#EFEFEF]">
              Undergraduate
            </option>
            <option value="graduate" className="bg-[#1D244C] text-[#EFEFEF]">
              Graduate
            </option>
          </select>
          {errors.level && <span className="font-baloo text-sm text-red-400">{errors.level}</span>}
        </div>

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

        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="isAdult" className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="isAdult"
              checked={form.isAdult}
              onChange={(e) => updateField("isAdult", e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-8 h-8 rounded-[7px] shrink-0 flex items-center justify-center ${form.isAdult ? "bg-[#72D6E6]" : "bg-[#72D6E6]/50"}`}
            >
              {form.isAdult && (
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
            <span className="font-baloo text-xl text-[#EFEFEF]">
              I'm 18 or older by April 12th, 2026
            </span>
          </label>
          {errors.isAdult && (
            <span className="font-baloo text-sm text-red-400 ml-9">{errors.isAdult}</span>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 mx-auto px-10 md:px-16 py-3 md:py-4 rounded-2xl md:rounded-[23px] bg-[#72D6E6] text-[#246B8A] font-baloo text-xl md:text-2xl hover:bg-[#5bc0d0] transition-colors cursor-pointer"
        >
          Submit Application
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
