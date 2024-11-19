import {
  CalendarActions,
  CalendarAsyncActions,
  CalendarState,
  CalendarStore,
} from './calendar.types';

const allSelector = (state: CalendarStore) => state;

const actions = (state: CalendarActions & CalendarAsyncActions) => state;

const state = (state: CalendarState) => state;

const appointments = (state: CalendarState) => state.appointments;

const loading = (state: CalendarState) => state.loading;

const color = (state: CalendarState) => state.color;

const date = (state: CalendarState) => state.date;

const language = (state: CalendarState) => state.language;

export const calendarSelectors = {
  allSelector,
  actions,
  state,
  appointments,
  loading,
  color,
  date,
  language,
};
