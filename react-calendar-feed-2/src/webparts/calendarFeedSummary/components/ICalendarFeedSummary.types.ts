import { ICalendarEvent } from "../../../shared/services/CalendarService";

export interface ICalendarFeedSummaryProps {
  description: string;
}

export interface ICalendarFeedSummaryState {
  isLoading: boolean;
   events: ICalendarEvent[];
   }
