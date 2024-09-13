// src/app/search-stories/search-stories.component.ts
import { Component } from '@angular/core';
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-search-stories',
  templateUrl: './search-stories.component.html',
  styleUrls: ['./search-stories.component.css'],
})
export class SearchStoriesComponent {
  query: string = '';
  stories: any[] = [];
  page: number = 1;
  limit: number = 20;

  constructor(private hackerNewsService: HackerNewsService) {}

  searchStories(): void {
    if (this.query) {
      this.hackerNewsService
        .searchStories(this.query, this.page, this.limit)
        .subscribe((data) => {
          this.stories = data;
        });
    }
  }

  nextPage(): void {
    this.page++;
    this.searchStories();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.searchStories();
    }
  }
}
