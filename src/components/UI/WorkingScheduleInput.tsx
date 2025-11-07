"use client";

import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Schedule = {
  [key in Day]: { from: string | null; to: string | null };
};

type Props = {
  name: string;
  error?: string;
  defaultValue?: Partial<Schedule> | string;
  onChange?: (schedule: Schedule) => void;
};

export default function WorkingScheduleInput({
  name,
  defaultValue,
  error,
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

  const parsedDefault: Partial<Schedule> | undefined =
    typeof defaultValue === "string" ? JSON.parse(defaultValue) : defaultValue;

  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initial: Schedule = {} as Schedule;
    DAY_KEYS.forEach((day) => {
      initial[day] = parsedDefault?.[day] || { from: null, to: null };
    });
    return initial;
  });

  const handleTimeChange = (
    day: Day,
    field: "from" | "to",
    value: string | null
  ) => {
    setSchedule((prev) => {
      const updated = { ...prev, [day]: { ...prev[day], [field]: value } };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden input containing the full JSON */}
      <input type="hidden" name={name} value={JSON.stringify(schedule)} />

      {DAY_KEYS.map((day) => {
        const label = messages[day as keyof typeof messages] || day;
        return (
          <div key={day} className="flex items-center justify-between">
            <span className="w-20 text-sm text-gray-600 font-semibold capitalize mr-4">
              {label}
            </span>
            <div className="flex gap-4 items-center">
              <TimePicker
                onChange={(val) => handleTimeChange(day, "from", val)}
                value={schedule[day].from || ""}
                disableClock
                format="HH:mm"
                clearIcon={null}
                className="text-sm font-semibold rounded w-24"
              />
              <span className="font-semibold text-sm text-gray-600">-</span>
              <TimePicker
                onChange={(val) => handleTimeChange(day, "to", val)}
                value={schedule[day].to || ""}
                disableClock
                format="HH:mm"
                clearIcon={null}
                className="text-sm font-semibold rounded w-24"
              />
            </div>
          </div>
        );
      })}
      {error && (
        <p className="text-sm font-medium text-red-500 text-end">{error}</p>
      )}
    </div>
  );
}
