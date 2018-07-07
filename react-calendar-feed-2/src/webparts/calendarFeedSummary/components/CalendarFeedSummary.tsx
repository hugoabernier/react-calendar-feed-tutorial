import * as React from 'react';
import styles from './CalendarFeedSummary.module.scss';
import { ICalendarFeedSummaryProps, ICalendarFeedSummaryState } from './ICalendarFeedSummary.types';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICalendarService, ICalendarEvent } from '../../../shared/services/CalendarService';
import { MockCalendarService } from '../../../shared/services/CalendarService/MockCalendarService';

export default class CalendarFeedSummary extends React.Component<ICalendarFeedSummaryProps, ICalendarFeedSummaryState> {
  constructor(props: ICalendarFeedSummaryProps) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
    };
  }

  public componentDidMount(): void { this._loadEvents(); }

  public render(): React.ReactElement<ICalendarFeedSummaryProps> {
    return (
      <div className={styles.calendarFeedSummary}>
        {this.state.events.map(e => {
          return <li>{e.title}</li>;
        })}
      </div>
    );
  }

  private _loadEvents(): void {
    const dataProvider: ICalendarService = new MockCalendarService();
    if (dataProvider) {
      this.setState(
        {
          isLoading: true
        });
      dataProvider.getEvents()
        .then((events: ICalendarEvent[]) => {
          this.setState({
            isLoading: false,
            events: events
          });
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
