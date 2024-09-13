// src/app/hacker-news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getNewStories(page: number, limit: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/new-stories?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  }

  searchStories(query: string, page: number, limit: number): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
