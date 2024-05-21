import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
})
export class PageLoginPage implements OnInit {
  credentials = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.validateCredentials()) {
      // Pasar los datos del formulario al Page Home
      this.router.navigate(['/home'], { queryParams: this.credentials });
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
