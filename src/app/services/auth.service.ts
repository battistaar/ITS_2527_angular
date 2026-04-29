import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { JwtService } from './jwt.service';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);

  login(username: string, password: string) {
    return this.http.post<{ user: User, token: string }>('/api/login', { username, password })
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        map(res => res.user)
      );
  }

}
