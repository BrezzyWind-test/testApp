import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContextService } from '../context/context.service';
import { map, Observable } from 'rxjs';

import { FilterUser } from '../../models/filter';
import { AppUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(
    private http: HttpClient,
    private contextService: ContextService
  ) {}

  filterUsers(filterData: FilterUser): Observable<AppUser[]> {
    const context = this.contextService.filterDataContext(filterData);
    return this.http
      .get<AppUser[]>('http://localhost:3000/Users' + context)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
