//All the APIs from the backend are imported here and the URLs for all the components is defined here
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Book, Genre, Order, User, UserType } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  baseUrl = 'http://127.0.0.1:8000/auth/';
  baseURL2 = "http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  //API to register
  createAccount(user: User) {
    return this.http.post(this.baseUrl + 'signup/', user, {
      responseType: 'text',
    });
  }
//API to login
  login(login: any) {
    let params = {
      email:login.email,
      password:login.password
    };
    let headers = new HttpHeaders();
headers= headers.append('content-type', 'application/json');

return this.http.get(this.baseUrl + 'login/', {params: params}
      )
 }
//The functions that are used in many components and also in this file are defined here
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  getToken() {
    let token = localStorage.getItem('access_token');
    console.log(token);
    return token;
  }
  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }
  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      name: token.name,
      email: token.email,
      password: '',
      user_type: token.user_type === 'USER' ? UserType.STUDENT : UserType.ADMIN,
    };
    return user;
  }

  getAllBooks() {
    return this.http.get<Book[]>(this.baseURL2 + 'books/');
  }

  orderBook(userId: number, bookId: number) {
    return this.http.get(this.baseUrl + 'OrderBook/' + userId + '/' + bookId, {
      responseType: 'text',
    });
  }

  getOrdersOfUser(userid: number) {
    return this.http.get<Order[]>(this.baseURL2 + 'orders/' + userid);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.baseURL2 + 'orders/');
  }

  returnBook(bookId: string, userId: string) {
    return this.http.get(this.baseUrl + 'ReturnBook/' + bookId + '/' + userId, {
      responseType: 'text',
    });
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseURL2 + 'student/').pipe(
      map((users) =>
        users.map((user) => {
          let temp: User = user;
          temp.user_type = user.user_type == 0 ? UserType.STUDENT : UserType.ADMIN;
          return temp;
        })
      )
    );
  }

  blockUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeBlockStatus/1/' + id, {
      responseType: 'text',
    });
  }

  unblockUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeBlockStatus/0/' + id, {
      responseType: 'text',
    });
  }

  enableUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeEnableStatus/1/' + id, {
      responseType: 'text',
    });
  }

  disableUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeEnableStatus/0/' + id, {
      responseType: 'text',
    });
  }

  getGenre() {
    return this.http.get<Genre[]>(this.baseURL2 + 'genres/');
  }

  insertBook(book: any) {
    let headers = {
      Authorization: 'Token 589b51f220fe4690d484d519ff12b1c3cd6c2762'
    }
    return this.http.post(this.baseURL2 + 'books/', book, 
    {headers : headers} 
    );
  }

  deleteBook(slug : string) {
    return this.http.delete(this.baseURL2 + 'books/' + slug, {
      responseType: 'text',
    });
  }

  insertGenre(genre: string,) {
    return this.http.post(
      this.baseURL2 + 'genres/',
      { genre : genre},
      { responseType: 'text' }
    );
  }
  insertCategory(category: string,) {
    return this.http.post(
      this.baseURL2 + 'InsertCategory',
      { category : category},
      { responseType: 'text' }
    );
  }
}
