// src/app/search-stories/search-stories.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-search-stories',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule here
  templateUrl: './search-stories.component.html',
  styleUrls: ['./search-stories.component.css'],
})
export class SearchStoriesComponent {
  stories: any[] = [];
  query: string = '';
  page: number = 1;
  limit: number = 20;

  constructor(private hackerNewsService: HackerNewsService) {}

  searchStories(): void {
    this.hackerNewsService
      .searchStories(this.query, this.page, this.limit)
      .subscribe((data) => {
        this.stories = data;
      });
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
