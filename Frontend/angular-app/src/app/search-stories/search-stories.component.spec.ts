import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchStoriesComponent } from './search-stories.component';
import { HackerNewsService } from '../hacker-news.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('SearchStoriesComponent', () => {
  let component: SearchStoriesComponent;
  let fixture: ComponentFixture<SearchStoriesComponent>;
  let mockHackerNewsService: jasmine.SpyObj<HackerNewsService>;

  beforeEach(async () => {
    mockHackerNewsService = jasmine.createSpyObj('HackerNewsService', [
      'searchStories',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [SearchStoriesComponent],
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty stories, query, page 1, and limit 20', () => {
    expect(component.stories).toEqual([]);
    expect(component.query).toBe('');
    expect(component.page).toBe(1);
    expect(component.limit).toBe(20);
  });

  it('should call searchStories when input changes', () => {
    const searchStoriesSpy = spyOn(
      component,
      'searchStories'
    ).and.callThrough();
    component.query = 'test';
    component.searchStories();
    expect(searchStoriesSpy).toHaveBeenCalled();
  });

  it('should fetch search results and update the stories property', () => {
    const mockData = [{ title: 'Story 1', url: 'http://example.com/1' }];
    mockHackerNewsService.searchStories.and.returnValue(of(mockData));
    component.searchStories();
    fixture.detectChanges();
    expect(component.stories).toEqual(mockData);
  });

  it('should call nextPage and fetch search results', () => {
    spyOn(component, 'searchStories').and.callThrough();
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.searchStories).toHaveBeenCalled();
  });

  it('should call prevPage and fetch search results if page is greater than 1', () => {
    component.page = 2;
    spyOn(component, 'searchStories').and.callThrough();
    component.prevPage();
    expect(component.page).toBe(1);
    expect(component.searchStories).toHaveBeenCalled();
  });

  it('should not call prevPage when page is 1', () => {
    spyOn(component, 'searchStories').and.callThrough();
    component.prevPage();
    expect(component.page).toBe(1);
    expect(component.searchStories).not.toHaveBeenCalled();
  });
});
