import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser () {
    return this.http.get('assets/users.json')
  }

  createUser(user: User){
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<User>(JSON.stringify(user), {headers: myHeaders}); 
  }

  updateUser(user: User) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<User>(JSON.stringify(user), {headers:myHeaders});
  }

  deleteUser(id: string){
    return this.http.delete<User>('/' + id);
  }

}