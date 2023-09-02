import { ScheduledSchema } from "../../../hooks/scheduled/types";

export interface CalendarViewProps {
  dataScheduled: ScheduledSchema[];
  getScheduled: () => Promise<void>;
  loading: boolean;
}
