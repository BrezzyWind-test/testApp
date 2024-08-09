import { Injectable } from '@angular/core';
import { AuthUser } from '../../models/auth';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ContextService } from '../context/context.service';
import { AppUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class JsonTakeService {
  constructor(
    private http: HttpClient,
    private contextService: ContextService
  ) {}

  takeLoginData(authData: AuthUser): Observable<boolean> {
    const context = this.contextService.authDataContext(authData);
    return this.http.get('http://localhost:3000/Users' + context).pipe(
      map((data) => {
        return Object.keys(data).length !== 0;
      })
    );
  }

  getUsersTable() {
    return this.http.get<AppUser[]>('http://localhost:3000/Users');
  }
}
