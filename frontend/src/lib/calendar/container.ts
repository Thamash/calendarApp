import { CalendarService } from '../services/CalendarService';
import { AppointmentPositioner } from './managers/AppointmentPositioner';
import { AppointmentStyleCalculator } from './managers/AppointmentStyleCalculator';
import { AppointmentTimeManager } from './managers/AppointmentTimeManager';
import { CalendarManager } from './managers/CalendarManager';
import { OverlapCalculator } from './managers/OverlapCalculator';

export class CalendarContainer {
  private static instance: CalendarContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.setupServices();
  }

  static getInstance(): CalendarContainer {
    if (!CalendarContainer.instance) {
      CalendarContainer.instance = new CalendarContainer();
    }
    return CalendarContainer.instance;
  }

  private setupServices() {
    const timeManager = new AppointmentTimeManager();
    const overlapCalculator = new OverlapCalculator(timeManager);
    const styleCalculator = new AppointmentStyleCalculator(overlapCalculator);
    const positioner = new AppointmentPositioner(timeManager, overlapCalculator);
    const calendarManager = new CalendarManager(timeManager, styleCalculator, positioner)

    const calendarService = new CalendarService(
      calendarManager
    );

    this.services.set('calendarService', calendarService);
  }

  getCalendarService(): CalendarService {
    return this.services.get('calendarService');
  }
}