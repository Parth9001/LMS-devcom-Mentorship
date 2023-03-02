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

  createAccount(user: User) {
    return this.http.post(this.baseUrl + 'signup/', user, {
      responseType: 'text',
    });
  }

  login(login: any) {
    // let params = new HttpParams()
    // .append("email", login.email)
    // .append("password", login.password);
    let params = {
      email:login.email,
      password:login.password
    };
    let headers = new HttpHeaders();
headers= headers.append('content-type', 'application/json');

return this.http.post(this.baseUrl + 'login/', params,
      
      {headers : headers}
      )
    //   function f(param) {
    //     console.log(param);
    // }
    
    // alert( String(f) );
 }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
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
      mobile: token.mobile,
      password: '',
      blocked: token.blocked.toLowerCase() === 'true',
      active: token.active.toLowerCase() === 'true',
      createdOn: token.createdAt,
      fine: 0,
      userType: token.userType === 'USER' ? UserType.USER : UserType.ADMIN,
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
          temp.userType = user.userType == 0 ? UserType.USER : UserType.ADMIN;
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
    return this.http.post(this.baseUrl + 'InsertBook', book, {
      responseType: 'text',
    });
  }

  deleteBook(slug : string) {
    return this.http.delete(this.baseURL2 + 'books/' + slug, {
      responseType: 'text',
    });
  }

  insertGenre(genre: string,) {
    return this.http.post(
      this.baseURL2 + 'InsertGenre',
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
