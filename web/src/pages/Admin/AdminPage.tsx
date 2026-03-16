import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/useAuth";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";

interface AppData {
  userId: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  displayName?: string;
  email?: string;
  schoolEmail?: string;
  phone?: string;
  school?: string;
  schoolOther?: string;
  major?: string;
  majorOther?: string;
  level?: string;
  gradYear?: string;
  skillLevel?: string;
  pronouns?: string;
  age?: string;
  country?: string;
  shirtSize?: string;
  foodChoice?: string;
  foodOther?: string;
  isAdult?: boolean;
  agreeTerms?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  whyJoin?: string;
  mlhCodeOfConduct?: boolean;
  mlhPrivacy?: boolean;
  mlhEmails?: boolean;
  status: string;
  submittedAt?: { toDate?: () => Date; seconds?: number };
}

type StatusFilter = "all" | "pending" | "accepted" | "rejected";
type SortOption = "newest" | "oldest" | "name" | "school";
type Tab = "applicants" | "stats";

function getDisplayName(app: AppData): string {
  if (app.firstName || app.lastName) {
    return `${app.firstName ?? ""} ${app.lastName ?? ""}`.trim();
  }
  return app.fullName || app.displayName || "Unknown";
}

function getEmail(app: AppData): string {
  return app.email || app.schoolEmail || "—";
}

function getSubmittedDate(app: AppData): Date | null {
  if (!app.submittedAt) return null;
  if (app.submittedAt.toDate) return app.submittedAt.toDate();
  if (app.submittedAt.seconds) return new Date(app.submittedAt.seconds * 1000);
  return null;
}

function formatDate(app: AppData): string {
  const d = getSubmittedDate(app);
  if (!d) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "accepted"
      ? "bg-green-400/20 text-green-300 border-green-400/50"
      : status === "rejected"
        ? "bg-red-400/20 text-red-300 border-red-400/50"
        : "bg-yellow-400/20 text-yellow-300 border-yellow-400/50";
  const label = status === "accepted" ? "Accepted" : status === "rejected" ? "Rejected" : "Pending";
  return (
    <span
      className={`font-baloo text-xs font-semibold px-3 py-1 rounded-full border ${color} uppercase tracking-wide`}
    >
      {label}
    </span>
  );
}

function SkillBadge({ skill }: { skill?: string }) {
  if (!skill) return <span className="text-slate-400">—</span>;
  const labels: Record<string, string> = {
    "no-experience": "No Experience",
    "some-experience": "Some Experience",
    experienced: "Experienced",
    "very-experienced": "Very Experienced",
  };
  return <span>{labels[skill] ?? skill}</span>;
}

function BoolField({ value, label }: { value?: boolean; label: string }) {
  if (value === undefined || value === null) return null;
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-full flex-shrink-0 ${value ? "bg-green-400" : "bg-red-400"}`} />
      <span className="text-slate-300 text-sm">{label}</span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-slate-400 text-xs uppercase tracking-wider">{label}</span>
      <p className="text-slate-100 text-sm mt-0.5">{value}</p>
    </div>
  );
}

function DonutChart({ data, size = 180 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <p className="font-baloo text-slate-400 text-sm">No data</p>;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const ir = size * 0.22;
  let angle = -Math.PI / 2;

  const slices = data
    .filter((d) => d.value > 0)
    .map((d) => {
      const start = angle;
      const sweep = (d.value / total) * Math.PI * 2;
      angle += sweep;
      const end = angle;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);
      const ix1 = cx + ir * Math.cos(start);
      const iy1 = cy + ir * Math.sin(start);
      const ix2 = cx + ir * Math.cos(end);
      const iy2 = cy + ir * Math.sin(end);
      const large = sweep > Math.PI ? 1 : 0;
      const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${large} 0 ${ix1} ${iy1} Z`;
      return { ...d, path, pct: Math.round((d.value / total) * 100) };
    });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={size} height={size} className="flex-shrink-0">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#e2e8f0" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
          {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
          total
        </text>
      </svg>
      <div className="space-y-2 flex-1">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="font-baloo text-slate-300 text-sm flex-1">{s.label}</span>
            <span className="font-baloo text-slate-200 text-sm font-semibold">{s.value}</span>
            <span className="font-baloo text-slate-500 text-xs w-10 text-right">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HBarChart({ data, max }: { data: { label: string; value: number }[]; max: number }) {
  if (data.length === 0) return <p className="font-baloo text-slate-400 text-sm">No data</p>;
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="font-baloo text-slate-300 text-xs w-40 truncate text-right flex-shrink-0">{d.label}</span>
          <div className="flex-1 bg-white/10 rounded-full h-5 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#72D6E6]/70"
              style={{ width: `${max > 0 ? (d.value / max) * 100 : 0}%` }}
            />
          </div>
          <span className="font-baloo text-slate-300 text-xs w-6 flex-shrink-0">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

function StatSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(53, 120, 167, 0.35)",
        border: "1.5px solid rgba(239,239,239,0.2)",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.15)",
      }}
    >
      <h3 className="font-baloo text-[#72D6E6] text-sm uppercase tracking-widest font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function StatsView({ applications }: { applications: AppData[] }) {
  const statusData = [
    { label: "Pending", value: applications.filter((a) => a.status === "pending").length, color: "#FBBF24" },
    { label: "Accepted", value: applications.filter((a) => a.status === "accepted").length, color: "#4ADE80" },
    { label: "Rejected", value: applications.filter((a) => a.status === "rejected").length, color: "#F87171" },
  ];

  const skillData = [
    { label: "No Experience", value: applications.filter((a) => a.skillLevel === "no-experience").length, color: "#60A5FA" },
    { label: "Some Experience", value: applications.filter((a) => a.skillLevel === "some-experience").length, color: "#34D399" },
    { label: "Experienced", value: applications.filter((a) => a.skillLevel === "experienced").length, color: "#A78BFA" },
    { label: "Very Experienced", value: applications.filter((a) => a.skillLevel === "very-experienced").length, color: "#F472B6" },
  ];

  const foodData = [
    { label: "No Preference", value: applications.filter((a) => !a.foodChoice || a.foodChoice === "no-preference").length, color: "#94A3B8" },
    { label: "Vegetarian", value: applications.filter((a) => a.foodChoice === "vegetarian").length, color: "#4ADE80" },
    { label: "Vegan", value: applications.filter((a) => a.foodChoice === "vegan").length, color: "#34D399" },
    { label: "Halal", value: applications.filter((a) => a.foodChoice === "halal").length, color: "#60A5FA" },
    { label: "Kosher", value: applications.filter((a) => a.foodChoice === "kosher").length, color: "#A78BFA" },
    { label: "Gluten Free", value: applications.filter((a) => a.foodChoice === "gluten-free").length, color: "#FB923C" },
    { label: "Other", value: applications.filter((a) => a.foodChoice && !["no-preference","vegetarian","vegan","halal","kosher","gluten-free"].includes(a.foodChoice)).length, color: "#F472B6" },
  ].filter((d) => d.value > 0);

  const shirtData = ["XS","S","M","L","XL","XXL"].map((size, i) => ({
    label: size,
    value: applications.filter((a) => a.shirtSize === size).length,
    color: ["#60A5FA","#34D399","#FBBF24","#F87171","#A78BFA","#FB923C"][i],
  })).filter((d) => d.value > 0);

  const schoolCounts = applications.reduce<Record<string, number>>((acc, a) => {
    const s = a.school || "Unknown";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const topSchools = Object.entries(schoolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, value]) => ({ label, value }));

  const majorCounts = applications.reduce<Record<string, number>>((acc, a) => {
    const m = a.major || "Unknown";
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});
  const topMajors = Object.entries(majorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));

  const gradYearCounts = applications.reduce<Record<string, number>>((acc, a) => {
    const y = a.gradYear || "Unknown";
    acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});
  const gradYears = Object.entries(gradYearCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, value]) => ({ label, value }));

  const countryCounts = applications.reduce<Record<string, number>>((acc, a) => {
    const c = a.country || "Unknown";
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));

  const maxSchool = topSchools[0]?.value ?? 1;
  const maxMajor = topMajors[0]?.value ?? 1;
  const maxYear = Math.max(...gradYears.map((d) => d.value), 1);
  const maxCountry = topCountries[0]?.value ?? 1;

  const resumeCount = applications.filter((a) => a.resumeUrl).length;
  const linkedinCount = applications.filter((a) => a.linkedinUrl).length;
  const adultCount = applications.filter((a) => a.isAdult).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
      <StatSection title="Application Status">
        <DonutChart data={statusData} />
      </StatSection>

      <StatSection title="Skill Level">
        <DonutChart data={skillData} />
      </StatSection>

      <StatSection title="Shirt Sizes">
        <DonutChart data={shirtData} size={160} />
      </StatSection>

      <StatSection title="Food Preferences">
        <DonutChart data={foodData} size={160} />
      </StatSection>

      <StatSection title="Top Schools">
        <HBarChart data={topSchools} max={maxSchool} />
      </StatSection>

      <StatSection title="Top Majors">
        <HBarChart data={topMajors} max={maxMajor} />
      </StatSection>

      <StatSection title="Graduation Year">
        <HBarChart data={gradYears} max={maxYear} />
      </StatSection>

      <StatSection title="Countries">
        <HBarChart data={topCountries} max={maxCountry} />
      </StatSection>

      <StatSection title="Quick Facts">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Have Resume", value: resumeCount },
            { label: "Have LinkedIn", value: linkedinCount },
            { label: "18+", value: adultCount },
            { label: "Total", value: applications.length },
          ].map((f) => (
            <div key={f.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(0,0,0,0.2)" }}>
              <div className="font-baloo text-2xl font-bold text-[#72D6E6]">{f.value}</div>
              <div className="font-baloo text-slate-400 text-xs mt-0.5">{f.label}</div>
            </div>
          ))}
        </div>
      </StatSection>
    </div>
  );
}

function ApplicantCard({
  app,
  expanded,
  onToggle,
  onStatusChange,
  updating,
}: {
  app: AppData;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (userId: string, status: string) => void;
  updating: boolean;
}) {
  const name = getDisplayName(app);
  const email = getEmail(app);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(53, 120, 167, 0.35)",
        border: "1.5px solid rgba(239, 239, 239, 0.2)",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.2)",
      }}
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#72D6E6]/30 border border-[#72D6E6]/50 flex items-center justify-center flex-shrink-0">
          <span className="font-baloo font-bold text-[#72D6E6] text-sm">{name.charAt(0).toUpperCase()}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-baloo font-bold text-slate-100 text-base">{name}</h3>
            <StatusBadge status={app.status} />
          </div>
          <p className="font-baloo text-slate-400 text-sm truncate">{email}</p>
          <p className="font-baloo text-slate-400 text-xs">
            {app.school || "—"} · {app.major || "—"} · Class of {app.gradYear || "—"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="font-baloo text-slate-300 text-xs">{formatDate(app)}</span>
          <div className="flex gap-2">
            {app.resumeUrl && (
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="font-baloo text-xs px-3 py-1 rounded-xl bg-[#72D6E6]/20 text-[#72D6E6] border border-[#72D6E6]/40 hover:bg-[#72D6E6]/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Resume ↗
              </a>
            )}
            <button
              onClick={onToggle}
              className="font-baloo text-xs px-3 py-1 rounded-xl bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            >
              {expanded ? "▲ Less" : "▼ More"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 flex gap-2 flex-wrap">
        <button
          disabled={updating || app.status === "accepted"}
          onClick={() => onStatusChange(app.userId, "accepted")}
          className={`font-baloo text-sm px-4 py-1.5 rounded-xl border transition-colors cursor-pointer
            ${app.status === "accepted"
              ? "bg-green-400/30 text-green-300 border-green-400/50 cursor-default opacity-70"
              : "bg-green-400/10 text-green-300 border-green-400/30 hover:bg-green-400/25"
            } disabled:opacity-50`}
        >
          ✓ Accept
        </button>
        <button
          disabled={updating || app.status === "rejected"}
          onClick={() => onStatusChange(app.userId, "rejected")}
          className={`font-baloo text-sm px-4 py-1.5 rounded-xl border transition-colors cursor-pointer
            ${app.status === "rejected"
              ? "bg-red-400/30 text-red-300 border-red-400/50 cursor-default opacity-70"
              : "bg-red-400/10 text-red-300 border-red-400/30 hover:bg-red-400/25"
            } disabled:opacity-50`}
        >
          ✕ Reject
        </button>
        {app.status !== "pending" && (
          <button
            disabled={updating}
            onClick={() => onStatusChange(app.userId, "pending")}
            className="font-baloo text-sm px-4 py-1.5 rounded-xl border bg-yellow-400/10 text-yellow-300 border-yellow-400/30 hover:bg-yellow-400/25 transition-colors cursor-pointer disabled:opacity-50"
          >
            ↺ Reset to Pending
          </button>
        )}
        {updating && (
          <span className="font-baloo text-xs text-slate-400 self-center animate-pulse">Saving…</span>
        )}
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "rgba(239,239,239,0.15)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Contact</h4>
              <DetailRow label="Email" value={getEmail(app)} />
              <DetailRow label="School Email" value={app.schoolEmail} />
              <DetailRow label="Phone" value={app.phone} />
              <DetailRow label="Pronouns" value={app.pronouns} />
              <DetailRow label="Age" value={app.age} />
              <DetailRow label="Country" value={app.country} />
            </div>

            <div className="space-y-3">
              <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Academic</h4>
              <DetailRow label="School" value={app.school} />
              {app.schoolOther && <DetailRow label="School (other)" value={app.schoolOther} />}
              <DetailRow label="Major" value={app.major} />
              {app.majorOther && <DetailRow label="Major (other)" value={app.majorOther} />}
              <DetailRow label="Level" value={app.level} />
              <DetailRow label="Grad Year" value={app.gradYear} />
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Skill Level</span>
                <p className="text-slate-100 text-sm mt-0.5"><SkillBadge skill={app.skillLevel} /></p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Logistics</h4>
              <DetailRow label="Shirt Size" value={app.shirtSize} />
              <DetailRow
                label="Food Preference"
                value={app.foodChoice === "no-preference" ? "No preference" : app.foodChoice || null}
              />
              {app.foodOther && <DetailRow label="Food (other)" value={app.foodOther} />}
            </div>

            <div className="space-y-3">
              <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Links</h4>
              {app.githubUrl ? (
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider">GitHub</span>
                  <p>
                    <a href={app.githubUrl} target="_blank" rel="noreferrer" className="text-[#72D6E6] text-sm hover:underline break-all">
                      {app.githubUrl}
                    </a>
                  </p>
                </div>
              ) : (
                <DetailRow label="GitHub" value="—" />
              )}
              {app.linkedinUrl && (
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider">LinkedIn</span>
                  <p>
                    <a href={app.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#72D6E6] text-sm hover:underline break-all">
                      {app.linkedinUrl}
                    </a>
                  </p>
                </div>
              )}
              {app.resumeUrl && (
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider">Resume</span>
                  <p>
                    <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-[#72D6E6] text-sm hover:underline">
                      View PDF ↗
                    </a>
                  </p>
                </div>
              )}
            </div>

            {app.whyJoin && (
              <div className="sm:col-span-2 space-y-1">
                <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Why Join</h4>
                <p className="text-slate-200 text-sm leading-relaxed">{app.whyJoin}</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-baloo text-[#72D6E6] text-xs uppercase tracking-widest font-semibold">Agreements</h4>
              <BoolField value={app.isAdult} label="18+" />
              <BoolField value={app.agreeTerms} label="Agreed to Terms" />
              <BoolField value={app.mlhCodeOfConduct} label="MLH Code of Conduct" />
              <BoolField value={app.mlhPrivacy} label="MLH Privacy Policy" />
              <BoolField value={app.mlhEmails} label="MLH Email Consent" />
            </div>
          </div>

          <p className="font-baloo text-slate-600 text-xs mt-4 select-all">UID: {app.userId}</p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  count,
  color,
  onClick,
  active,
}: {
  label: string;
  count: number;
  color: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[110px] rounded-2xl p-4 text-center transition-all cursor-pointer ${
        active ? "ring-2 ring-white/40 scale-[1.04]" : "opacity-80 hover:opacity-100"
      }`}
      style={{
        background: "rgba(53, 120, 167, 0.4)",
        border: "1.5px solid rgba(239,239,239,0.2)",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className={`font-baloo text-3xl font-bold ${color}`}>{count}</div>
      <div className="font-baloo text-slate-300 text-sm mt-1">{label}</div>
    </button>
  );
}

const selectStyle = {
  background: "rgba(53, 120, 167, 0.5)",
  border: "1.5px solid rgba(239,239,239,0.2)",
};

export function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [applications, setApplications] = useState<AppData[]>([]);
  const [fetching, setFetching] = useState(true);
  const [tab, setTab] = useState<Tab>("applicants");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/apply");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const check = async () => {
      try {
        const adminDoc = await getDoc(doc(db, "admin", user.uid));
        setIsAdmin(adminDoc.exists());
      } catch {
        setIsAdmin(false);
      }
    };
    check();
  }, [user]);

  useEffect(() => {
    if (isAdmin === false) navigate("/");
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchAll = async () => {
      try {
        const snap = await getDocs(collection(db, "applications"));
        const data = snap.docs.map((d) => ({ userId: d.id, ...d.data() }) as AppData);
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchAll();
  }, [isAdmin]);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUpdatingId(userId);
    try {
      await updateDoc(doc(db, "applications", userId), { status: newStatus });
      setApplications((prev) => prev.map((a) => (a.userId === userId ? { ...a, status: newStatus } : a)));
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const uniqueSchools = useMemo(
    () => [...new Set(applications.map((a) => a.school).filter(Boolean))].sort() as string[],
    [applications],
  );

  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((a) => a.status === "pending").length,
      accepted: applications.filter((a) => a.status === "accepted").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    }),
    [applications],
  );

  const filtered = useMemo(() => {
    let list = [...applications];

    if (statusFilter !== "all") list = list.filter((a) => a.status === statusFilter);
    if (schoolFilter !== "all") list = list.filter((a) => a.school === schoolFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) => {
        const name = getDisplayName(a).toLowerCase();
        const email = getEmail(a).toLowerCase();
        const school = (a.school || "").toLowerCase();
        const major = (a.major || "").toLowerCase();
        const why = (a.whyJoin || "").toLowerCase();
        const phone = (a.phone || "").toLowerCase();
        return name.includes(q) || email.includes(q) || school.includes(q) || major.includes(q) || why.includes(q) || phone.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sort === "newest" || sort === "oldest") {
        const da = getSubmittedDate(a)?.getTime() ?? 0;
        const db2 = getSubmittedDate(b)?.getTime() ?? 0;
        return sort === "newest" ? db2 - da : da - db2;
      }
      if (sort === "name") return getDisplayName(a).localeCompare(getDisplayName(b));
      if (sort === "school") return (a.school || "").localeCompare(b.school || "");
      return 0;
    });

    return list;
  }, [applications, statusFilter, schoolFilter, search, sort]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}>
        <p className="font-baloo text-2xl text-slate-100 animate-pulse">Checking access…</p>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}>
        <p className="font-baloo text-2xl text-slate-100 animate-pulse">Loading applications…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}>
      <div
        className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{ background: "rgba(28, 70, 100, 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(239,239,239,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <img src={FullyHacksLogo} alt="FullyHacks" className="w-8 h-8" />
          <div>
            <span className="font-nemo text-lg text-[#72D6E6]">FullyHacks</span>
            <span className="font-baloo text-slate-400 text-sm ml-2">· Admin Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl overflow-hidden border border-white/20">
            {(["applicants", "stats"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`font-baloo text-sm px-4 py-1.5 transition-colors cursor-pointer capitalize ${
                  tab === t ? "bg-[#72D6E6]/30 text-[#72D6E6]" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={handleSignOut}
            className="font-baloo text-sm px-4 py-1.5 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {tab === "stats" ? (
          <StatsView applications={applications} />
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              <StatCard label="Total" count={stats.total} color="text-[#72D6E6]" onClick={() => setStatusFilter("all")} active={statusFilter === "all"} />
              <StatCard label="Pending" count={stats.pending} color="text-yellow-300" onClick={() => setStatusFilter("pending")} active={statusFilter === "pending"} />
              <StatCard label="Accepted" count={stats.accepted} color="text-green-300" onClick={() => setStatusFilter("accepted")} active={statusFilter === "accepted"} />
              <StatCard label="Rejected" count={stats.rejected} color="text-red-300" onClick={() => setStatusFilter("rejected")} active={statusFilter === "rejected"} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Search by name, email, school, major…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[200px] font-baloo text-sm px-4 py-2.5 rounded-xl text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#72D6E6]/50"
                style={{ background: "rgba(53, 120, 167, 0.35)", border: "1.5px solid rgba(239,239,239,0.2)" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="font-baloo text-sm px-4 py-2.5 rounded-xl text-slate-100 outline-none cursor-pointer"
                style={selectStyle}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                className="font-baloo text-sm px-4 py-2.5 rounded-xl text-slate-100 outline-none cursor-pointer"
                style={selectStyle}
              >
                <option value="all">All Schools</option>
                {uniqueSchools.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="font-baloo text-sm px-4 py-2.5 rounded-xl text-slate-100 outline-none cursor-pointer"
                style={selectStyle}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A–Z)</option>
                <option value="school">School (A–Z)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-baloo text-slate-400 text-sm">
                Showing <span className="text-slate-200 font-semibold">{filtered.length}</span> of{" "}
                <span className="text-slate-200 font-semibold">{applications.length}</span> applicants
              </p>
              {(search || schoolFilter !== "all") && (
                <button
                  onClick={() => { setSearch(""); setSchoolFilter("all"); }}
                  className="font-baloo text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Clear filters ✕
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-baloo text-slate-400 text-lg">No applicants found.</p>
              </div>
            ) : (
              <div className="space-y-3 pb-10">
                {filtered.map((app) => (
                  <ApplicantCard
                    key={app.userId}
                    app={app}
                    expanded={expandedId === app.userId}
                    onToggle={() => setExpandedId(expandedId === app.userId ? null : app.userId)}
                    onStatusChange={handleStatusChange}
                    updating={updatingId === app.userId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
