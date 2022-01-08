const MILLISECOND = 1
const SECOND = MILLISECOND * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const fromNow = (
  days?: number,
  hours?: number,
  minutes?: number,
  seconds?: number
) => {
  return new Date().getTime() 
    + (days ? days * DAY : 0)
    + (hours ? hours * HOUR : 0)
    + (minutes ? minutes * MINUTE : 0)
    + (seconds ? seconds * SECOND : 0)
};
