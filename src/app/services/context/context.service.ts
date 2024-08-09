import { Injectable } from '@angular/core';
import { AuthUser } from '../../models/auth';
import { FilterUser } from '../../models/filter';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  constructor() {}

  authDataContext(authData: AuthUser): string {
    return `?login=${authData.login}&password=${authData.password}`;
  }

  filterDataContext(filterData: FilterUser): string {
    const dateFromContext = filterData.pickerDateFrom
      ? new Date(filterData.pickerDateFrom).toISOString()
      : '';
    const dateToContext = filterData.pickerDateTo
      ? new Date(filterData.pickerDateTo).toISOString()
      : '';
    let dateContext = '';
    if (dateFromContext) {
      dateContext += `dateFrom=${dateFromContext}&`;
    }
    if (dateToContext) {
      dateContext += `dateTo=${dateToContext}&`;
    }
    if (filterData.ageFrom) {
      dateContext += `ageFrom=${filterData.ageFrom}&`;
    }
    if (filterData.ageTo) {
      dateContext += `ageTo=${filterData.ageTo}&`;
    }
    if (filterData.fullName) {
      dateContext += `fullname=${filterData.fullName}`;
    }
    if (dateContext?.substring(dateContext.length - 1) === '&') {
      dateContext = dateContext.substring(0, dateContext.length - 1);
    }

    return `?${dateContext}`;
  }
}
