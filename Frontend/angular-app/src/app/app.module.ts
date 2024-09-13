// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Correct import
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { AppComponent } from './app.component';
import { NewStoriesComponent } from './new-stories/new-stories.component';
import { SearchStoriesComponent } from './search-stories/search-stories.component';

@NgModule({
  declarations: [AppComponent, NewStoriesComponent, SearchStoriesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure this is imported
    HttpClientModule, // Ensure this is imported
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
