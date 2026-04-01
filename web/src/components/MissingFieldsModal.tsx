import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AutocompleteInput } from "./AutocompleteInput";
import {
  SCHOOLS,
  MAJORS,
  LEVELS_OF_STUDY,
  AGES,
  COUNTRIES,
  INPUT_CLASS,
  INPUT_ERROR_CLASS,
  INPUT_STYLE,
  SELECT_CLASS,
  SELECT_ERROR_CLASS,
  formatPhoneNumber,
  isValidEmail,
  isValidGithubUrl,
  isValidGradYear,
} from "../data/formConstants";

const FIELD_LABELS: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  school: "School",
  githubUrl: "GitHub URL",
  pronouns: "Pronouns",
  phone: "Phone Number",
  major: "Major",
  gradYear: "Graduation Year",
  age: "Age",
  level: "Level of Study",
  country: "Country of Residence",
  skillLevel: "Skill Level",
  whyJoin: "Why do you want to join FullyHacks?",
  foodChoice: "Food Choice",
  shirtSize: "Shirt Size",
};

const AGREEMENT_FIELDS = new Set([
  "isAdult",
  "agreeTerms",
  "mlhCodeOfConduct",
  "mlhPrivacy",
  "mlhEmails",
]);

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

interface MissingFieldsModalProps {
  missingFields: string[];
  uid: string;
  onComplete: (updatedData: Record<string, string | boolean>) => void;
}

export function MissingFieldsModal({ missingFields, uid, onComplete }: MissingFieldsModalProps) {
  const stringFields = missingFields.filter((f) => !AGREEMENT_FIELDS.has(f));
  const agreementFields = missingFields.filter((f) => AGREEMENT_FIELDS.has(f));

  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    stringFields.forEach((f) => (init[f] = ""));
    return init;
  });
  const [boolValues, setBoolValues] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    agreementFields.forEach((f) => (init[f] = false));
    return init;
  });
  const [isSchoolOther, setIsSchoolOther] = useState(false);
  const [schoolOther, setSchoolOther] = useState("");
  const [isMajorOther, setIsMajorOther] = useState(false);
  const [majorOther, setMajorOther] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string, val: string) => setValues((prev) => ({ ...prev, [field]: val }));
  const setBool = (field: string, val: boolean) =>
    setBoolValues((prev) => ({ ...prev, [field]: val }));

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    stringFields.forEach((field) => {
      const val =
        field === "school" && isSchoolOther
          ? schoolOther
          : field === "major" && isMajorOther
            ? majorOther
            : values[field];

      if (!val || val.trim() === "") {
        errs[field] = "This field is required.";
        return;
      }
      if (field === "email" && !isValidEmail(val)) errs[field] = "Enter a valid email address.";
      if (field === "githubUrl" && !isValidGithubUrl(val))
        errs[field] = "Enter a valid GitHub URL (e.g. https://github.com/username).";
      if (field === "phone" && val.replace(/\D/g, "").length !== 10)
        errs[field] = "Enter a valid 10-digit phone number.";
      if (field === "gradYear" && !isValidGradYear(val))
        errs[field] = "Enter a valid graduation year (2025–2035).";
      if (field === "whyJoin") {
        const wordCount = val.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 100) errs[field] = "Please keep your response to 100 words or less.";
      }
    });

    if (missingFields.includes("foodChoice") && values["foodChoice"] === "other") {
      if (!values["foodOther"] || values["foodOther"].trim() === "") {
        errs["foodOther"] = "Please specify your food preference.";
      }
    }

    if (agreementFields.includes("isAdult") && !boolValues["isAdult"])
      errs["isAdult"] = "You must be 18 or older by April 18th, 2026.";
    if (agreementFields.includes("agreeTerms") && !boolValues["agreeTerms"])
      errs["agreeTerms"] = "You must agree to the FullyHacks event terms.";
    if (agreementFields.includes("mlhCodeOfConduct") && !boolValues["mlhCodeOfConduct"])
      errs["mlhCodeOfConduct"] = "You must agree to the MLH Code of Conduct.";
    if (agreementFields.includes("mlhPrivacy") && !boolValues["mlhPrivacy"])
      errs["mlhPrivacy"] = "You must agree to share information with MLH.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const updatedData: Record<string, string | boolean> = {};

      stringFields.forEach((field) => {
        if (field === "school") {
          updatedData["school"] = isSchoolOther ? schoolOther : values["school"];
          if (isSchoolOther) updatedData["schoolOther"] = schoolOther;
        } else if (field === "major") {
          updatedData["major"] = isMajorOther ? majorOther : values["major"];
          if (isMajorOther) updatedData["majorOther"] = majorOther;
        } else {
          updatedData[field] = values[field];
        }
      });

      if (missingFields.includes("foodChoice") && values["foodChoice"] === "other") {
        updatedData["foodOther"] = values["foodOther"] || "";
      }

      agreementFields.forEach((field) => {
        updatedData[field] = boolValues[field];
      });

      await updateDoc(doc(db, "applications", uid), updatedData);
      onComplete(updatedData);
    } catch (err) {
      console.error("Failed to update application:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const whyJoinWordCount = (values["whyJoin"] || "").trim().split(/\s+/).filter(Boolean).length;
  const needsEventTerms =
    agreementFields.includes("agreeTerms") || agreementFields.includes("isAdult");
  const needsMlhSection =
    agreementFields.includes("mlhCodeOfConduct") ||
    agreementFields.includes("mlhPrivacy") ||
    agreementFields.includes("mlhEmails");

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto p-4"
      style={{ background: "rgba(0, 0, 0, 0.85)" }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="w-full max-w-lg rounded-2xl p-6 md:p-8 flex flex-col gap-6 my-4"
          style={{
            background: "rgba(53, 120, 167, 0.95)",
            border: "3px solid #EFEFEF",
            boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-nemo text-2xl md:text-3xl text-[#BEF3FC]">
              Congratulations on getting accepted!
            </h2>
            <p className="font-baloo text-base text-[#EFEFEF]/80">
              Before you continue, we need a bit more info to complete your registration.
            </p>
          </div>

          {/* String fields */}
          {stringFields.length > 0 && (
            <div className="flex flex-col gap-5">
              {stringFields.map((field) => {
                const label = FIELD_LABELS[field] || field;
                const error = errors[field];

                if (field === "school") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      {isSchoolOther ? (
                        <>
                          <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                          <input
                            type="text"
                            placeholder="Enter your school name"
                            value={schoolOther}
                            onChange={(e) => setSchoolOther(e.target.value)}
                            className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                            style={INPUT_STYLE}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsSchoolOther(false);
                              setSchoolOther("");
                            }}
                            className="font-baloo text-sm text-[#72D6E6] text-left underline cursor-pointer"
                          >
                            ← Back to school list
                          </button>
                        </>
                      ) : (
                        <AutocompleteInput
                          label={label}
                          options={SCHOOLS}
                          value={values["school"]}
                          onChange={(val) => set("school", val)}
                          onSelectOther={() => setIsSchoolOther(true)}
                          placeholder="Search for your school..."
                          error={error}
                        />
                      )}
                    </div>
                  );
                }

                if (field === "major") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      {isMajorOther ? (
                        <>
                          <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                          <input
                            type="text"
                            placeholder="Enter your major"
                            value={majorOther}
                            onChange={(e) => setMajorOther(e.target.value)}
                            className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                            style={INPUT_STYLE}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsMajorOther(false);
                              setMajorOther("");
                            }}
                            className="font-baloo text-sm text-[#72D6E6] text-left underline cursor-pointer"
                          >
                            ← Back to major list
                          </button>
                        </>
                      ) : (
                        <AutocompleteInput
                          label={label}
                          options={MAJORS}
                          value={values["major"]}
                          onChange={(val) => set("major", val)}
                          onSelectOther={() => setIsMajorOther(true)}
                          placeholder="Search for your major..."
                          error={error}
                        />
                      )}
                    </div>
                  );
                }

                if (field === "country") {
                  return (
                    <AutocompleteInput
                      key={field}
                      label={label}
                      options={COUNTRIES}
                      value={values["country"]}
                      onChange={(val) => set("country", val)}
                      placeholder="Search for your country..."
                      error={error}
                    />
                  );
                }

                if (field === "age") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <select
                        value={values["age"]}
                        onChange={(e) => set("age", e.target.value)}
                        className={error ? SELECT_ERROR_CLASS : SELECT_CLASS}
                      >
                        <option value="">Select age</option>
                        {AGES.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "level") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <select
                        value={values["level"]}
                        onChange={(e) => set("level", e.target.value)}
                        className={error ? SELECT_ERROR_CLASS : SELECT_CLASS}
                      >
                        <option value="">Select level of study</option>
                        {LEVELS_OF_STUDY.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "skillLevel") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <select
                        value={values["skillLevel"]}
                        onChange={(e) => set("skillLevel", e.target.value)}
                        className={error ? SELECT_ERROR_CLASS : SELECT_CLASS}
                      >
                        <option value="">Select skill level</option>
                        <option value="no-experience">No Experience</option>
                        <option value="some-experience">Some Experience</option>
                        <option value="experienced">Experienced</option>
                      </select>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "foodChoice") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <select
                        value={values["foodChoice"]}
                        onChange={(e) => set("foodChoice", e.target.value)}
                        className={error ? SELECT_ERROR_CLASS : SELECT_CLASS}
                      >
                        <option value="">Select food preference</option>
                        <option value="no-preference">No Preference</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="other">Other</option>
                      </select>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                      {values["foodChoice"] === "other" && (
                        <div className="flex flex-col gap-2 mt-1">
                          <input
                            type="text"
                            placeholder="Please specify your food preference"
                            value={values["foodOther"] || ""}
                            onChange={(e) => set("foodOther", e.target.value)}
                            className={errors["foodOther"] ? INPUT_ERROR_CLASS : INPUT_CLASS}
                            style={INPUT_STYLE}
                          />
                          {errors["foodOther"] && (
                            <span className="font-baloo text-sm text-red-400">
                              {errors["foodOther"]}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                if (field === "shirtSize") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <select
                        value={values["shirtSize"]}
                        onChange={(e) => set("shirtSize", e.target.value)}
                        className={error ? SELECT_ERROR_CLASS : SELECT_CLASS}
                      >
                        <option value="">Select shirt size</option>
                        {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "whyJoin") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us why you want to join FullyHacks! (max 100 words)"
                        value={values["whyJoin"]}
                        onChange={(e) => set("whyJoin", e.target.value)}
                        className={`${error ? INPUT_ERROR_CLASS : INPUT_CLASS} resize-none`}
                        style={INPUT_STYLE}
                      />
                      <span
                        className={`font-baloo text-sm ${whyJoinWordCount > 100 ? "text-red-400" : "text-[#EFEFEF]/50"}`}
                      >
                        {whyJoinWordCount} / 100 words
                      </span>
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "phone") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <input
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={values["phone"]}
                        onChange={(e) => set("phone", formatPhoneNumber(e.target.value))}
                        className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                        style={INPUT_STYLE}
                      />
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "email") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={values["email"]}
                        onChange={(e) => set("email", e.target.value)}
                        className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                        style={INPUT_STYLE}
                      />
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                if (field === "githubUrl") {
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={values["githubUrl"]}
                        onChange={(e) => set("githubUrl", e.target.value)}
                        className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                        style={INPUT_STYLE}
                      />
                      {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                    </div>
                  );
                }

                // Default: text input (firstName, lastName, pronouns, gradYear, etc.)
                return (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="font-baloo text-base text-[#EFEFEF]">{label}</label>
                    <input
                      type="text"
                      placeholder={label}
                      value={values[field]}
                      onChange={(e) => set(field, e.target.value)}
                      className={error ? INPUT_ERROR_CLASS : INPUT_CLASS}
                      style={INPUT_STYLE}
                    />
                    {error && <span className="font-baloo text-sm text-red-400">{error}</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* isAdult standalone */}
          {agreementFields.includes("isAdult") && (
            <div className="flex flex-col gap-1">
              <label
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setBool("isAdult", !boolValues["isAdult"])}
              >
                <CheckboxVisual checked={boolValues["isAdult"]} />
                <span className="font-baloo text-base text-[#EFEFEF]">
                  I'm 18 or older by April 18th, 2026
                </span>
              </label>
              {errors["isAdult"] && (
                <span className="font-baloo text-sm text-red-400 ml-11">{errors["isAdult"]}</span>
              )}
            </div>
          )}

          {/* Event Terms & Conditions */}
          {needsEventTerms && agreementFields.includes("agreeTerms") && (
            <div className="flex flex-col gap-4 p-4 rounded-[16px] bg-[#070710]/40 border border-[#72D6E6]/30">
              <h3 className="font-baloo text-xl text-[#FED220]">Event Terms & Conditions*</h3>
              <ul className="flex flex-col gap-2 font-baloo text-sm text-[#EFEFEF]/80 list-disc list-inside">
                <li>I consent to photographs being taken and being used for marketing purposes</li>
                <li>
                  I consent to providing a safe space for hackers to learn and grow their interests
                  in computing
                </li>
                <li>
                  I consent to following the provided guidelines and rules instructed by the
                  organizing team
                </li>
                <li>
                  I understand that failure to comply with guidelines or creating an unsafe space
                  will result in my removal from the event
                </li>
                <li>
                  I understand this is an in person event taking place at CSUF and I must attend in
                  person in order to participate
                </li>
              </ul>
              <label
                className="flex items-center gap-3 cursor-pointer mt-2"
                onClick={() => setBool("agreeTerms", !boolValues["agreeTerms"])}
              >
                <CheckboxVisual checked={boolValues["agreeTerms"]} />
                <span className="font-baloo text-base text-[#EFEFEF]">
                  I agree to the FullyHacks event terms above
                </span>
              </label>
              {errors["agreeTerms"] && (
                <span className="font-baloo text-sm text-red-400 ml-11">
                  {errors["agreeTerms"]}
                </span>
              )}
            </div>
          )}

          {/* MLH Notices */}
          {needsMlhSection && (
            <div className="flex flex-col gap-4 p-4 rounded-[16px] bg-[#070710]/40 border border-[#72D6E6]/30">
              <h3 className="font-baloo text-xl text-[#FED220]">MLH Notices*</h3>
              <div className="flex flex-col gap-4 mt-1">
                {agreementFields.includes("mlhCodeOfConduct") && (
                  <div className="flex flex-col gap-1">
                    <label
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() => setBool("mlhCodeOfConduct", !boolValues["mlhCodeOfConduct"])}
                    >
                      <div className="mt-1">
                        <CheckboxVisual checked={boolValues["mlhCodeOfConduct"]} />
                      </div>
                      <span className="font-baloo text-base text-[#EFEFEF]">
                        I have read and agree to the{" "}
                        <a
                          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          MLH Code of Conduct
                        </a>
                        .
                      </span>
                    </label>
                    {errors["mlhCodeOfConduct"] && (
                      <span className="font-baloo text-sm text-red-400 ml-11">
                        {errors["mlhCodeOfConduct"]}
                      </span>
                    )}
                  </div>
                )}

                {agreementFields.includes("mlhPrivacy") && (
                  <div className="flex flex-col gap-1">
                    <label
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() => setBool("mlhPrivacy", !boolValues["mlhPrivacy"])}
                    >
                      <div className="mt-1">
                        <CheckboxVisual checked={boolValues["mlhPrivacy"]} />
                      </div>
                      <span className="font-baloo text-base text-[#EFEFEF]">
                        I authorize you to share my application/registration information with Major
                        League Hacking for event administration, ranking, and MLH administration
                        in-line with the{" "}
                        <a
                          href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          MLH Privacy Policy
                        </a>
                        . I further agree to the terms of both the{" "}
                        <a
                          href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          MLH Contest Terms and Conditions
                        </a>{" "}
                        and the{" "}
                        <a
                          href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FED220] underline hover:text-[#ffe566] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          MLH Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors["mlhPrivacy"] && (
                      <span className="font-baloo text-sm text-red-400 ml-11">
                        {errors["mlhPrivacy"]}
                      </span>
                    )}
                  </div>
                )}

                {agreementFields.includes("mlhEmails") && (
                  <label
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setBool("mlhEmails", !boolValues["mlhEmails"])}
                  >
                    <div className="mt-1">
                      <CheckboxVisual checked={!!boolValues["mlhEmails"]} />
                    </div>
                    <span className="font-baloo text-base text-[#EFEFEF]">
                      I authorize MLH to send me occasional emails about relevant events, career
                      opportunities, and community announcements.{" "}
                      <span className="text-[#EFEFEF]/50">(optional)</span>
                    </span>
                  </label>
                )}
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
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full font-baloo text-lg py-3 rounded-2xl bg-[#72D6E6] text-[#246B8A] font-bold hover:bg-[#5bc0d0] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.2)" }}
          >
            {submitting ? "Saving..." : "Continue to Portal"}
          </button>
        </div>
      </div>
    </div>
  );
}
