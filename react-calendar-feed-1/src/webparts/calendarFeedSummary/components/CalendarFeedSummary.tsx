import * as React from 'react';
import { ICalendarEvent, ICalendarService } from '../../../shared/services/CalendarService';
import { MockCalendarService } from '../../../shared/services/CalendarService/MockCalendarService';
import styles from './CalendarFeedSummary.module.scss';
import { ICalendarFeedSummaryProps, ICalendarFeedSummaryState } from './CalendarFeedSummary.types';

export default class CalendarFeedSummary extends React.Component<ICalendarFeedSummaryProps, ICalendarFeedSummaryState> {
  constructor(props: ICalendarFeedSummaryProps) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
    };
  }

  public componentDidMount(): void {
      this._loadEvents();
  }

  public render(): React.ReactElement<ICalendarFeedSummaryProps> {
    return (
      <div className={ styles.calendarFeedSummary }>
      <ul>
       { this.state.events.map(e=>{
         return <li>{e.title}</li>;
       })}
       </ul>
      </div>
    );
  }

  private _loadEvents(): Promise<void> {

    // nothing in cache, load fresh
    const dataProvider: ICalendarService = new MockCalendarService();
    if (dataProvider) {
      this.setState({
        isLoading: true
      });

      return dataProvider.getEvents().then((events: ICalendarEvent[]) => {
        // don't cache in the case of errors
        this.setState({
          isLoading: false,
          events: events
        });
        return;
      }).catch((error: any) => {
        console.log("Exception returned by getEvents", error.message);
        this.setState({
          isLoading: false,
          events: []
        });
      });
    }
  }

}
