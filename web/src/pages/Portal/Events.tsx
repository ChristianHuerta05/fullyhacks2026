import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faUtensils,
  faCode,
  faPeopleGroup,
  faCircleCheck,
  faTrophy,
  faBolt,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type EventType =
  | "ceremony"
  | "food"
  | "workshop"
  | "activity"
  | "checkin"
  | "judging"
  | "special"
  | "sleeping";

interface ScheduleEvent {
  time: string;
  type: EventType;
  title: string;
  location?: string;
  note?: string;
}

interface ScheduleDay {
  date: string;
  dayLabel: string;
  events: ScheduleEvent[];
}

const TYPE_CONFIG: Record<EventType, { label: string; color: string; icon: IconDefinition }> = {
  ceremony: { label: "Ceremony", color: "#FED220", icon: faWandMagicSparkles },
  food: { label: "Food", color: "#F97316", icon: faUtensils },
  workshop: { label: "Workshop", color: "#72D6E6", icon: faCode },
  activity: { label: "Activity", color: "#A78BFA", icon: faPeopleGroup },
  checkin: { label: "Check-In", color: "#4ADE80", icon: faCircleCheck },
  judging: { label: "Judging", color: "#FB923C", icon: faTrophy },
  special: { label: "Special", color: "#EC4899", icon: faBolt },
  sleeping: { label: "Sleeping", color: "#94A3B8", icon: faMoon },
};

const SCHEDULE: ScheduleDay[] = [
  {
    date: "Saturday, April 18",
    dayLabel: "Day 1",
    events: [
      { time: "4-5 PM", type: "checkin", title: "Check-In", location: "SGMH Lobby" },
      { time: "5-6 PM", type: "ceremony", title: "Opening Ceremony", location: "SGMH 1502" },
      {
        time: "6:00 PM",
        type: "activity",
        title: "Hacking Begins",
        location: "Hacking Rooms: CS 101, CS 102B, CS 104, CS 200, CS 202, CS 300, CS 401, CS 408",
      },
      { time: "6:15 PM", type: "activity", title: "Team Forming Event", location: "ECS Quad" },
      { time: "7:00 PM", type: "food", title: "Dinner", location: "ECS Quad" },
      {
        time: "8PM-9PM",
        type: "workshop",
        title: "Esri Workshop",
        location: "CS 102B",
        note: "More info TBA",
      },
      {
        time: "9PM-10PM",
        type: "workshop",
        title: "Human Delta Workshop",
        location: "CS 102B",
        note: "More info TBD",
      },
      {
        time: "10PM-11PM",
        type: "workshop",
        title: "ChatGPT Lab",
        location: "CS 102B",
        note: "More info TBA",
      },
      {
        time: "10:30 PM",
        type: "sleeping",
        title: "Sleeping Rooms Open",
        location: "CS 110A & 110B",
        note: "Separate rooms available for General and Women",
      },
      {
        time: "11PM-12AM",
        type: "workshop",
        title: "Intro to APIs",
        location: "CS 102B",
        note: "Learn how to use FastAPI and Neon(PostgreSQL) to make a RESTful CRUD API",
      },

      {
        time: "12:00 AM",
        type: "special",
        title: "DJ Set",
        location: "CS 301",
        note: "Decompress and hang out with some sick music!!",
      },
    ],
  },
  {
    date: "Sunday, April 19",
    dayLabel: "Day 2",
    events: [
      { time: "9:00 AM", type: "food", title: "Breakfast", location: "ECS Quad" },
      {
        time: "10AM-11AM",
        type: "workshop",
        title: "Hacking applications and how to avoid it",
        location: "CS 300",
        note: "Hosted by OSS",
      },
      {
        time: "11AM-12PM",
        type: "workshop",
        title: "Hacking with GitHub Copilot",
        location: "CS 300",
        note: "Hosted by MLH",
      },
      {
        time: "12PM-1PM",
        type: "workshop",
        title: "Intro to Google AI Studio",
        location: "CS 300",
        note: "Hosted by MLH",
      },
      { time: "1:00 PM", type: "food", title: "Lunch", location: "ECS Quad" },
      {
        time: "5:00 PM",
        type: "activity",
        title: "Hacking Ends - Devpost Submission Deadline",
        note: "Grab Dinner and head to your assigned room/table when announced for presentation.",
      },
      { time: "5:00 PM", type: "food", title: "Dinner", location: "ECS Quad" },
      {
        time: "6-8 PM",
        type: "judging",
        title: "Judging/Presentation",
        location: "CS 104, 401, 300, 401, 408",
        note: "See Discord for your Assigned Room",
      },
      { time: "8:30-9:30PM", type: "ceremony", title: "Closing Ceremony", location: "SGMH 1502" },
    ],
  },
];

function Badge({ type }: { type: EventType }) {
  const cfg = TYPE_CONFIG[type];
  return (
    <span
      className="font-baloo text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1.5 border-2"
      style={{
        color: cfg.color,
        background: "rgba(22, 52, 116, 0.6)",
        borderColor: cfg.color,
      }}
    >
      <FontAwesomeIcon icon={cfg.icon} className="text-[10px]" />
      {cfg.label}
    </span>
  );
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const cfg = TYPE_CONFIG[event.type];
  return (
    <div
      className="flex gap-3 md:gap-4 items-start rounded-2xl p-4 md:p-5"
      style={{
        background: "rgba(53, 120, 167, 0.3)",
        border: "1px solid rgba(239, 239, 239, 0.2)",
      }}
    >
      {/* Time */}
      <div className="w-18 md:w-20 shrink-0 text-right">
        <span className="font-baloo text-sm md:text-base text-[#EFEFEF]/60 whitespace-nowrap">
          {event.time}
        </span>
      </div>

      {/* Accent bar */}
      <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: cfg.color }} />

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-baloo text-base md:text-lg text-[#EFEFEF] font-semibold leading-tight">
            {event.title}
          </span>
          <Badge type={event.type} />
        </div>
        {event.location && (
          <span className="font-baloo text-sm text-[#EFEFEF]/50">{event.location}</span>
        )}
        {event.note && (
          <span className="font-baloo text-sm text-[#EFEFEF]/40 italic">{event.note}</span>
        )}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.entries(TYPE_CONFIG) as [EventType, (typeof TYPE_CONFIG)[EventType]][]).map(
        ([type, cfg]) => (
          <span
            key={type}
            className="font-baloo text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 border-2"
            style={{
              color: cfg.color,
              background: "rgba(22, 52, 116, 0.6)",
              borderColor: cfg.color,
            }}
          >
            <FontAwesomeIcon icon={cfg.icon} className="text-[10px]" />
            {cfg.label}
          </span>
        ),
      )}
    </div>
  );
}

export function Events() {
  return (
    <div className="w-full px-4 md:px-10 lg:px-16 pt-10 md:pt-16 pb-20 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-nemo text-4xl md:text-6xl lg:text-7xl text-[#BEF3FC]">schedule</h1>
        <p className="font-baloo text-sm md:text-base text-[#EFEFEF]/60">
          April 18–19, 2026 · Cal State Fullerton
        </p>
      </div>

      <Legend />

      <div className="flex flex-col gap-8">
        {SCHEDULE.map((day) => (
          <div key={day.date} className="flex flex-col gap-3">
            {/* Day header */}
            <div className="flex items-center gap-3">
              <div>
                <span
                  className="font-baloo text-xs px-2.5 py-0.5 rounded-full mr-2 border-2"
                  style={{
                    color: "#72D6E6",
                    borderColor: "#72D6E6",
                    background: "rgba(22, 52, 116, 0.6)",
                  }}
                >
                  {day.dayLabel}
                </span>
                <span className="font-baloo text-lg md:text-xl text-[#EFEFEF] font-semibold">
                  {day.date}
                </span>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(239,239,239,0.1)" }} />
            </div>

            <div className="flex flex-col gap-2">
              {day.events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
