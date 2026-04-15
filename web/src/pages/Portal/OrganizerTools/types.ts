export interface CheckInFields {
  checkedIn: boolean;
  saturdayDinner: boolean;
  sundayBreakfast: boolean;
  sundayLunch: boolean;
  sundayDinner: boolean;
}

export interface ParticipantData {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  school?: string;
  major?: string;
  foodChoice?: string;
  checkedIn?: boolean;
  saturdayDinner?: boolean;
  sundayBreakfast?: boolean;
  sundayLunch?: boolean;
  sundayDinner?: boolean;
}

export type CheckInType = keyof CheckInFields;

export const CHECK_IN_TYPES: {
  key: CheckInType;
  label: string;
  bg: string;
  hoverBg: string;
  text: string;
}[] = [
  {
    key: "checkedIn",
    label: "Event Check-in",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    text: "text-white",
  },
  {
    key: "saturdayDinner",
    label: "Sat Dinner",
    bg: "bg-orange-500",
    hoverBg: "hover:bg-orange-600",
    text: "text-white",
  },
  {
    key: "sundayBreakfast",
    label: "Sun Breakfast",
    bg: "bg-yellow-400",
    hoverBg: "hover:bg-yellow-500",
    text: "text-gray-900",
  },
  {
    key: "sundayLunch",
    label: "Sun Lunch",
    bg: "bg-green-500",
    hoverBg: "hover:bg-green-600",
    text: "text-white",
  },
  {
    key: "sundayDinner",
    label: "Sun Dinner",
    bg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    text: "text-white",
  },
];
