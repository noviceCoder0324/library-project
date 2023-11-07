import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
  }
  
  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }

  getUrl(): string {
    return `../../assets/covers/${this.book?.cover}`;
  }

  save(): void {
    if (this.book) {
      this.bookService.updateBook(this.book).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && this.book) {
        this.book.cover = file.name;
        this.bookService.updateBook(this.book).subscribe();
    }
  }
}
