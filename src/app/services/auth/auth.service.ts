import { Injectable } from '@angular/core';
import { AuthUser } from '../../models/auth';
import { Observable, of, throwError } from 'rxjs';
import { JsonTakeService } from '../json-take/json-take.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth?: boolean;
  constructor(
    private jsonTakeService: JsonTakeService,
    private router: Router
  ) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: AuthUser): Observable<string | boolean> {
    return new Observable((subscriber) => {
      this.jsonTakeService.takeLoginData(userInfo).subscribe((res) => {
        if (res) {
          this.setToken('aaaa');
          subscriber.next(res);
        } else {
          subscriber.error('User not found');
        }
        subscriber.complete();
      });
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
