// src/app/hacker-news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getNewStories(page: number, limit: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/new-stories?page=${page}&limit=${limit}`
    );
  }

  searchStories(query: string, page: number, limit: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`
    );
  }
}
