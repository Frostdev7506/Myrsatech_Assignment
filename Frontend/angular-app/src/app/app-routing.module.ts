import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStoriesComponent } from './new-stories/new-stories.component';
import { SearchStoriesComponent } from './search-stories/search-stories.component';

export const routes: Routes = [
  { path: 'new-stories', component: NewStoriesComponent },
  { path: 'search-stories', component: SearchStoriesComponent },
  { path: '', redirectTo: '/new-stories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
