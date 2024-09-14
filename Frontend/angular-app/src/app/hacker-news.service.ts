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

  /**
   * Fetches new stories from the server with pagination
   * @param page Page number for pagination
   * @param limit Number of items per page
   * @param loadingCallback Callback to handle loading state
   * @returns Observable of new stories array
   */
  getNewStories(
    page: number,
    limit: number,
    loadingCallback: (loading: boolean) => void
  ): Observable<any[]> {
    loadingCallback(true); // Set loading to true before the request starts
    return this.http
      .get<any[]>(`${this.apiUrl}/new-stories?page=${page}&limit=${limit}`)
      .pipe(
        catchError((error) => this.handleError(error)),
        finalize(() => loadingCallback(false)) // Ensure loading is set to false after the request completes, regardless of success or error
      );
  }

  /**
   * Searches stories based on a query with pagination
   * @param query Search query
   * @param page Page number for pagination
   * @param limit Number of items per page
   * @param loadingCallback Callback to handle loading state
   * @returns Observable of search result stories array
   */
  searchStories(
    query: string,
    page: number,
    limit: number,
    loadingCallback: (loading: boolean) => void
  ): Observable<any[]> {
    loadingCallback(true); // Set loading to true before the request starts
    return this.http
      .get<any[]>(
        `${this.apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        finalize(() => loadingCallback(false)) // Ensure loading is set to false after the request completes, regardless of success or error
      );
  }

  /**
   * Error handling for HTTP requests
   * @param error The HTTP error response
   * @returns Observable throwing an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
