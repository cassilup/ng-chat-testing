import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

type Credentials = {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  loggedIn = false;
  serverUrl = "http://localhost:3000"

  login(credentials: Credentials) {
    return this.http.post(`${this.serverUrl}/login`, credentials).subscribe((result: any) => {
      if (result.success) {
        this.loggedIn = true;
        this.router.navigate(['/home']);
      }
    });
  }
}
