// src/app/search-stories/search-stories.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStoriesComponent } from './search-stories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchStoriesComponent],
  imports: [CommonModule, FormsModule],
  exports: [SearchStoriesComponent],
})
export class SearchStoriesModule {}
