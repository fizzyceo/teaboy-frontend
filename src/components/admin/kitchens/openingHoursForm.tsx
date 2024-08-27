"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface DaySchedule {
  start: Date | undefined;
  end: Date | undefined;
  isOpen: boolean;
}

export function OpeningHoursForm() {
  const initialSchedule = {
    monday: { start: undefined, end: undefined, isOpen: true },
    tuesday: { start: undefined, end: undefined, isOpen: true },
    wednesday: { start: undefined, end: undefined, isOpen: true },
    thursday: { start: undefined, end: undefined, isOpen: true },
    friday: { start: undefined, end: undefined, isOpen: true },
    saturday: { start: undefined, end: undefined, isOpen: true },
    sunday: { start: undefined, end: undefined, isOpen: true },
  };

  const [schedule, setSchedule] =
    React.useState<Record<string, DaySchedule>>(initialSchedule);

  const handleTimeChange = (
    day: string,
    timeType: "start" | "end",
    value: Date | undefined,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: value },
    }));
  };

  const handleToggleChange = (day: string, checked: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: checked },
    }));
  };

  return (
    <div className="flex h-full flex-col justify-between gap-7 rounded-md bg-slate-100 px-2 pb-2">
      <div>
        <h1 className="mb-2 mt-4 text-xl font-semibold">Opening Hours</h1>
        <div className="grid grid-rows-7 gap-2">
          {Object.keys(schedule).map((day) => (
            <div
              key={day}
              className="grid h-12 w-full grid-cols-3 items-center py-1"
            >
              <div className="col-span-1 flex items-center space-x-1">
                <Switch
                  id={`switch-${day}`}
                  checked={schedule[day].isOpen}
                  onCheckedChange={(checked) =>
                    handleToggleChange(day, checked)
                  }
                />
                <Label
                  htmlFor={`switch-${day}`}
                  className="text-base font-medium"
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Label>
              </div>

              {schedule[day].isOpen ? (
                <div className="col-span-2 flex justify-between space-x-2">
                  <div className="flex w-1/2 items-center justify-between gap-2 rounded-sm bg-slate-200 p-1">
                    <Label
                      htmlFor={`start-${day}`}
                      className="w-full text-center text-sm font-medium"
                    >
                      Start
                    </Label>
                    <div className="flex gap-1">
                      <TimePickerInput
                        picker="hours"
                        date={schedule[day].start}
                        setDate={(date) => handleTimeChange(day, "start", date)}
                        id={`start-hours-${day}`}
                        onRightFocus={() =>
                          document
                            .getElementById(`start-minutes-${day}`)
                            ?.focus()
                        }
                      />
                      <TimePickerInput
                        picker="minutes"
                        date={schedule[day].start}
                        setDate={(date) => handleTimeChange(day, "start", date)}
                        id={`start-minutes-${day}`}
                        onRightFocus={() =>
                          document.getElementById(`end-hours-${day}`)?.focus()
                        }
                      />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center justify-between gap-2 rounded-sm bg-slate-200 p-1">
                    <Label
                      htmlFor={`end-${day}`}
                      className="w-full text-center text-sm font-medium"
                    >
                      End
                    </Label>
                    <div className="flex gap-1">
                      <TimePickerInput
                        picker="hours"
                        date={schedule[day].end}
                        setDate={(date) => handleTimeChange(day, "end", date)}
                        id={`end-hours-${day}`}
                        onLeftFocus={() =>
                          document
                            .getElementById(`start-minutes-${day}`)
                            ?.focus()
                        }
                      />
                      <TimePickerInput
                        picker="minutes"
                        date={schedule[day].end}
                        setDate={(date) => handleTimeChange(day, "end", date)}
                        id={`end-minutes-${day}`}
                        onLeftFocus={() =>
                          document.getElementById(`start-hours-${day}`)?.focus()
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="col-span-2 text-center font-medium">Closed</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between justify-items-end">
        <p className="place-content-end text-sm">
          <b>*</b>Start and End Time have the format HH:MM
        </p>
        <Button className="flex items-center justify-center gap-2 px-16 text-lg">
          <Save />
          <span>Save </span>
        </Button>
      </div>
    </div>
  );
}

export default OpeningHoursForm;
