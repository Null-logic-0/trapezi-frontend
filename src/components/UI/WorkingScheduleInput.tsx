"use client";

import { useMessages } from "@/hooks/useMessages";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { FaCopy, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Schedule = {
  [key in Day]: { from: string | null; to: string | null; isOpen: boolean };
};

type Props = {
  name: string;
  error?: string;
  defaultValue?: Partial<Schedule> | string;
  onChange?: (schedule: Schedule) => void;
};

const DAY_KEYS: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type DayKey = (typeof DAY_KEYS)[number];

type SubmissionDay = {
  from: string | null;
  to: string | null;
};

type SubmissionPayload = Record<DayKey, SubmissionDay>;

function WorkingScheduleInput({ name, defaultValue, error, onChange }: Props) {
  const messages = useMessages();

  const DAY_LABELS: Record<Day, string> = {
    monday: messages.monday,
    tuesday: messages.tuesday,
    wednesday: messages.wednesday,
    thursday: messages.thursday,
    friday: messages.friday,
    saturday: messages.saturday,
    sunday: messages.sunday,
  };

  const getInitialState = (): Schedule => {
    let parsed: Partial<Schedule> | undefined;
    try {
      parsed =
        typeof defaultValue === "string"
          ? JSON.parse(defaultValue)
          : defaultValue;
    } catch (e) {
      console.error("Failed to parse schedule defaultValue:", e);
      parsed = {};
    }

    const initial: Schedule = {} as Schedule;
    DAY_KEYS.forEach((day) => {
      const dayData = parsed?.[day];
      const hasTime = !!dayData?.from;
      initial[day] = {
        from: dayData?.from || null,
        to: dayData?.to || null,
        isOpen: dayData?.isOpen ?? hasTime,
      };
    });
    return initial;
  };

  const [schedule, setSchedule] = useState<Schedule>(getInitialState);

  useEffect(() => {
    onChange?.(schedule);
  }, [schedule, onChange]);

  const handleTimeChange = (
    day: Day,
    field: "from" | "to",
    value: string | null
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value, isOpen: true },
    }));
  };

  const toggleDay = (day: Day) => {
    setSchedule((prev) => {
      const isCurrentlyOpen = prev[day].isOpen;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          isOpen: !isCurrentlyOpen,
          from: !isCurrentlyOpen ? prev[day].from || "09:00" : null,
          to: !isCurrentlyOpen ? prev[day].to || "17:00" : null,
        },
      };
    });
  };

  const copyMondayToWeekdays = () => {
    const monday = schedule.monday;
    setSchedule((prev) => {
      const updated = { ...prev };
      (["tuesday", "wednesday", "thursday", "friday"] as Day[]).forEach((d) => {
        updated[d] = { ...monday };
      });
      return updated;
    });
  };

  const cleanDataForSubmission = () => {
    const cleaned: SubmissionPayload = {} as SubmissionPayload;
    DAY_KEYS.forEach((day) => {
      if (schedule[day].isOpen) {
        cleaned[day] = { from: schedule[day].from, to: schedule[day].to };
      } else {
        cleaned[day] = { from: null, to: null };
      }
    });
    return JSON.stringify(cleaned);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <input type="hidden" name={name} value={cleanDataForSubmission()} />

      {/* Header with Quick Actions */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-2">
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          {messages.working_hours}
        </h3>
        <button
          type="button"
          onClick={copyMondayToWeekdays}
          className="text-xs flex items-center gap-1.5 text-[#ff6b35] cursor-pointer font-medium "
          title="Copy Monday's schedule to Tuesday through Friday"
        >
          <FaCopy size={12} /> {messages.copy_schedule}
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {DAY_KEYS.map((day) => {
          const label = DAY_LABELS[day];
          const isOpen = schedule[day].isOpen;

          return (
            <div
              key={day}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-lg transition-all duration-200 ${
                isOpen
                  ? "bg-gray-50 border border-transparent"
                  : "bg-transparent border border-dashed border-gray-200 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3 w-32 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`shrink-0 transition-colors focus:outline-none ${
                    isOpen
                      ? "text-green-500 hover:text-green-600"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                  aria-label={isOpen ? `Close ${day}` : `Open ${day}`}
                >
                  {isOpen ? (
                    <FaCheckCircle size={18} />
                  ) : (
                    <FaTimesCircle size={18} />
                  )}
                </button>
                <span
                  className={`text-sm font-semibold capitalize select-none ${
                    isOpen
                      ? "text-gray-700"
                      : "text-gray-400 line-through decoration-gray-300"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Time Inputs */}
              <div className="flex items-center gap-2 h-9">
                {!isOpen ? (
                  <span className="text-xs font-medium text-gray-400 italic pl-2">
                    {messages.closed}
                  </span>
                ) : (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="custom-time-picker-wrapper">
                      <TimePicker
                        onChange={(val) => handleTimeChange(day, "from", val)}
                        value={schedule[day].from}
                        disableClock
                        format="HH:mm"
                        clearIcon={null}
                        className="bg-white rounded-md text-sm shadow-sm"
                      />
                    </div>
                    <span className="text-gray-400 font-light px-1 text-sm">
                      -
                    </span>
                    <div className="custom-time-picker-wrapper">
                      <TimePicker
                        onChange={(val) => handleTimeChange(day, "to", val)}
                        value={schedule[day].to}
                        disableClock
                        format="HH:mm"
                        clearIcon={null}
                        className="bg-white rounded-md text-sm shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-sm font-medium text-red-500 text-end mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
export default WorkingScheduleInput;
