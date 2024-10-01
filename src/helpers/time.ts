import { DateTime } from "luxon";

export const formatTimeStamp = (timestamp: string) => {
  const convertedDate = DateTime.fromMillis(
    parseInt(timestamp)
  );

  return convertedDate.toFormat('MMMM dd')
}