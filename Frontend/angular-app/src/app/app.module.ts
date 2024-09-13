// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NewStoriesModule } from './new-stories/new-stories.module';
import { SearchStoriesModule } from './search-stories/search-stories.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NewStoriesModule,
    SearchStoriesModule,
  ],
  providers: [],
})
export class AppModule {}
