import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SearchStoriesComponent } from './search-stories.component';
import { HackerNewsService } from '../hacker-news.service';

describe('SearchStoriesComponent', () => {
  let component: SearchStoriesComponent;
  let fixture: ComponentFixture<SearchStoriesComponent>;
  let hackerNewsService: jasmine.SpyObj<HackerNewsService>;

  beforeEach(async () => {
    const hackerNewsServiceSpy = jasmine.createSpyObj('HackerNewsService', [
      'searchStories',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SearchStoriesComponent,
        { provide: HackerNewsService, useValue: hackerNewsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStoriesComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(
      HackerNewsService
    ) as jasmine.SpyObj<HackerNewsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search stories on search', () => {
    const mockStories = [{ title: 'Story 1' }, { title: 'Story 2' }];
    hackerNewsService.searchStories.and.returnValue(of(mockStories));

    component.query = 'test';
    component.searchStories();

    expect(hackerNewsService.searchStories).toHaveBeenCalledWith(
      'test',
      1,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should search stories on next page', () => {
    const mockStories = [{ title: 'Story 3' }, { title: 'Story 4' }];
    hackerNewsService.searchStories.and.returnValue(of(mockStories));

    component.query = 'test';
    component.nextPage();

    expect(hackerNewsService.searchStories).toHaveBeenCalledWith(
      'test',
      2,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should search stories on previous page', () => {
    component.page = 2;
    const mockStories = [{ title: 'Story 5' }, { title: 'Story 6' }];
    hackerNewsService.searchStories.and.returnValue(of(mockStories));

    component.query = 'test';
    component.prevPage();

    expect(hackerNewsService.searchStories).toHaveBeenCalledWith(
      'test',
      1,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should not search stories on previous page if page is 1', () => {
    component.page = 1;
    hackerNewsService.searchStories.and.returnValue(of([]));

    component.query = 'test';
    component.prevPage();

    expect(hackerNewsService.searchStories).not.toHaveBeenCalled();
  });

  it('should set loading state correctly', () => {
    const mockStories = [{ title: 'Story 7' }, { title: 'Story 8' }];
    hackerNewsService.searchStories.and.callFake(
      (query, page, limit, loadingCallback) => {
        loadingCallback(true);
        return of(mockStories);
      }
    );

    component.query = 'test';
    component.searchStories();

    expect(component.loading).toBeTrue();

    hackerNewsService.searchStories.and.callFake(
      (query, page, limit, loadingCallback) => {
        loadingCallback(false);
        return of(mockStories);
      }
    );

    component.searchStories();

    expect(component.loading).toBeFalse();
  });
});
