import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public appUser$ = new BehaviorSubject<AppUser>(new AppUser());

  constructor(private http: HttpClient) {}

  addUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>('http://localhost:3000/Users', user).pipe(
      map((data) => {
        return data;
      })
    );
  }

  editUser(id: number, user: AppUser): Observable<AppUser> {
    return this.http
      .put<AppUser>(`http://localhost:3000/Users/${id}`, user)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  public changeAppUser(appUser: AppUser) {
    this.appUser$.next(appUser);
  }

  onViewUser(): Observable<any> {
    return this.appUser$.asObservable();
  }
}
