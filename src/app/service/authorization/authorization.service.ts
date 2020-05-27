import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  // 用户登陆
  login(params): Observable<any> {
    const url = 'http://192.168.1.11:8081/login?userName=' + params.userName + '&password=' + params.password;
    return this.http.get(url);
  }

  // 用户登陆
  regist(params): Observable<any> {
      const url = 'http://192.168.1.11:8081/regist';
      return this.http.post(url, params);
  }

}
