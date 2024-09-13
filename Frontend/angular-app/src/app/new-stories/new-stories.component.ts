// src/app/new-stories/new-stories.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-new-stories',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './new-stories.component.html',
  styleUrls: ['./new-stories.component.css'],
})
export class NewStoriesComponent implements OnInit {
  stories: any[] = [];
  page: number = 1;
  limit: number = 20;

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.fetchNewStories();
  }

  fetchNewStories(): void {
    this.hackerNewsService
      .getNewStories(this.page, this.limit)
      .subscribe((data) => {
        this.stories = data;
      });
  }

  nextPage(): void {
    this.page++;
    this.fetchNewStories();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchNewStories();
    }
  }
}
