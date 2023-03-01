import { Component, OnInit } from '@angular/core';
import { Book, GenreBooks, Genre } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  availableBooks: Book[] = [];
  booksToDisplay: GenreBooks[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllBooks().subscribe({
      next: (res: Book[]) => {
        this.availableBooks = [];
        console.log(res);
        for (var book of res) this.availableBooks.push(book);
        this.updateList();
      },
      error: (err: any) => console.log(err),
    });
  }

  updateList() {
    this.booksToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let genreBooks of this.booksToDisplay) {
        if (
          book.genre === genreBooks.genre //&&
          // book.subgenre === genreBooks.subgenre
        )
          exist = true;
      }

      if (exist) {
        for (let genreBooks of this.booksToDisplay) {
          if (
            book.genre === genreBooks.genre //&&
            // book.subgenre === genreBooks.subgenre
          )
            genreBooks.books.push(book);
        }
      } else {
        this.booksToDisplay.push({
          genre: book.genre,
          // subgenre: book.subgenre,
          books: [book],
        });
      }
    }
  }

  getBookCount() {
    return this.booksToDisplay.reduce((pv, cv) => cv.books.length + pv, 0);
  }

  search(value: string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.booksToDisplay = this.booksToDisplay.filter((genreBooks) => {
        genreBooks.books = genreBooks.books.filter(
          (book) =>
            book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value)
        );
        return genreBooks.books.length > 0;
      });
    }
  }

  orderBook(book: Book) {
    let userid = this.api.getTokenUserInfo()?.id ?? 0;
    this.api.orderBook(userid, book.id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          book.available = false;
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  isBlocked() {
    let blocked = this.api.getTokenUserInfo()?.blocked ?? true;
    return blocked;
  }
}
