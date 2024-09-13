// src/app/new-stories/new-stories.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewStoriesComponent } from './new-stories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewStoriesComponent],
  imports: [CommonModule, FormsModule],
  exports: [NewStoriesComponent],
})
export class NewStoriesModule {}
