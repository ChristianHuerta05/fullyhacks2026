import { useState, useRef, useEffect } from "react";
import { INPUT_CLASS, INPUT_STYLE } from "../data/formConstants";

export function AutocompleteInput({
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
          className={`${INPUT_CLASS} ${error ? "ring-2 ring-red-400" : ""}`}
          style={INPUT_STYLE}
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
