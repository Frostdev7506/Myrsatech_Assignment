import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getNewStories(
    page: number,
    limit: number,
    loadingCallback: (loading: boolean) => void
  ): Observable<any[]> {
    loadingCallback(true); // Set loading to true
    return this.http
      .get<any[]>(`${this.apiUrl}/new-stories?page=${page}&limit=${limit}`)
      .pipe(
        catchError(this.handleError),
        finalize(() => loadingCallback(false)) // Set loading to false after request completes
      );
  }

  searchStories(
    query: string,
    page: number,
    limit: number,
    loadingCallback: (loading: boolean) => void
  ): Observable<any[]> {
    loadingCallback(true); // Set loading to true
    return this.http
      .get<any[]>(
        `${this.apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`
      )
      .pipe(
        catchError(this.handleError),
        finalize(() => loadingCallback(false)) // Set loading to false after request completes
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
