const DEFAULT_TIMEZONE = "Europe/Moscow";

let userTimezone = DEFAULT_TIMEZONE;

const convertUTCToIANA = (timezone: string): string => {
  const offsetMap: { [key: string]: string } = {
    "UTC+00:00": "Etc/UTC",
    "UTC+01:00": "Europe/London",
    "UTC+02:00": "Europe/Kiev",
    "UTC+03:00": "Europe/Moscow",
    "UTC+04:00": "Asia/Dubai",
    "UTC+05:00": "Asia/Tashkent",
    "UTC+06:00": "Asia/Almaty",
    "UTC+07:00": "Asia/Bangkok",
    "UTC+08:00": "Asia/Singapore",
    "UTC+09:00": "Asia/Tokyo",
    "UTC+10:00": "Australia/Sydney",
    "UTC+11:00": "Pacific/Noumea",
    "UTC+12:00": "Pacific/Auckland",
    "UTC-01:00": "Atlantic/Azores",
    "UTC-02:00": "Atlantic/South_Georgia",
    "UTC-03:00": "America/Sao_Paulo",
    "UTC-04:00": "America/Barbados",
    "UTC-05:00": "America/New_York",
    "UTC-06:00": "America/Mexico_City",
    "UTC-07:00": "America/Denver",
    "UTC-08:00": "America/Los_Angeles",
    "UTC-09:00": "America/Anchorage",
    "UTC-10:00": "Pacific/Honolulu",
    "UTC-11:00": "Pacific/Midway",
    "UTC-12:00": "Etc/GMT+12",
  };

  return offsetMap[timezone] || timezone;
};

export const setTimezone = (timezone: string) => {
  userTimezone = convertUTCToIANA(timezone) || DEFAULT_TIMEZONE;
};

export const getTimezone = () => userTimezone;

export class ReadableDate extends Date {
  constructor(...args: ConstructorParameters<typeof Date>) {
    super(...args);
  }

  toReadable(): string {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      timeZone: userTimezone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log("Converted to: " + formatter.format(this));
    return formatter.format(this);
  }
}
