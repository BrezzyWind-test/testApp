import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['home']);
        this.loginForm.reset();
      },
      error: (error) => alert(error),
    });
  }
}
