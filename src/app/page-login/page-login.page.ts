import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
})
export class PageLoginPage implements OnInit {
  credentials = {
    username: 'camilo',
    password: '1234',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.validateCredentials()) {
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.credentials.username,
          password: this.credentials.password,
        },
      };

      this.router.navigate(['/home'], navigationExtras);
    }
  }

  validateCredentials() {
    const usernamePattern = /^[a-zA-Z0-9]{3,8}$/;
    const passwordPattern = /^\d{4}$/;

    return (
      usernamePattern.test(this.credentials.username) &&
      passwordPattern.test(this.credentials.password)
    );
  }
}
