"use client";

import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type Schedule = {
  [key in Day]: { from: string; to: string };
};

type Props = {
  name: string;
  defaultValue?: Partial<Schedule>;
  onChange?: (schedule: Schedule) => void;
};

export default function WorkingScheduleInput({
  name,
  defaultValue,
  onChange,
}: Props) {
  const messages = useMessages();

  const DAY_KEYS: Day[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initial: Schedule = {} as Schedule;
    DAY_KEYS.forEach((day) => {
      initial[day] = defaultValue?.[day] || { from: "", to: "" };
    });
    return initial;
  });

  const handleTimeChange = (day: Day, field: "from" | "to", value: string) => {
    setSchedule((prev) => {
      const updated = { ...prev, [day]: { ...prev[day], [field]: value } };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {DAY_KEYS.map((day) => {
        const label = messages[day as keyof typeof messages] || day;
        return (
          <div key={day} className="flex items-center justify-between">
            <span className="w-20 text-sm text-gray-600 font-semibold capitalize mr-4">
              {label}
            </span>
            <div className="flex gap-4 items-center">
              <input
                type="time"
                name={`${name}[${day}][from]`}
                value={schedule[day].from}
                onChange={(e) => handleTimeChange(day, "from", e.target.value)}
                className="border px-2 py-1 border-[#ff6933] text-sm font-semibold rounded w-24"
              />
              <span className="font-semibold text-sm text-gray-600">to</span>
              <input
                type="time"
                name={`${name}[${day}][to]`}
                value={schedule[day].to}
                onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                className="border border-[#ff6933] px-2 py-1 text-sm font-semibold rounded w-24"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
