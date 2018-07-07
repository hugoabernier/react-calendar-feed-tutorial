import { ICalendarEvent } from '.';



export interface ICalendarService {

    getEvents: () => Promise<ICalendarEvent[]>;

}
