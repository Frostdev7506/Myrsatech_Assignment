import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NewStoriesComponent } from './new-stories.component';
import { HackerNewsService } from '../hacker-news.service';

describe('NewStoriesComponent', () => {
  let component: NewStoriesComponent;
  let fixture: ComponentFixture<NewStoriesComponent>;
  let hackerNewsService: jasmine.SpyObj<HackerNewsService>;

  beforeEach(async () => {
    const hackerNewsServiceSpy = jasmine.createSpyObj('HackerNewsService', [
      'getNewStories',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewStoriesComponent,
        { provide: HackerNewsService, useValue: hackerNewsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewStoriesComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(
      HackerNewsService
    ) as jasmine.SpyObj<HackerNewsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch new stories on init', () => {
    const mockStories = [{ title: 'Story 1' }, { title: 'Story 2' }];
    hackerNewsService.getNewStories.and.returnValue(of(mockStories));

    component.ngOnInit();

    expect(hackerNewsService.getNewStories).toHaveBeenCalledWith(
      1,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should fetch new stories on next page', () => {
    const mockStories = [{ title: 'Story 3' }, { title: 'Story 4' }];
    hackerNewsService.getNewStories.and.returnValue(of(mockStories));

    component.nextPage();

    expect(hackerNewsService.getNewStories).toHaveBeenCalledWith(
      2,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should fetch new stories on previous page', () => {
    component.page = 2;
    const mockStories = [{ title: 'Story 5' }, { title: 'Story 6' }];
    hackerNewsService.getNewStories.and.returnValue(of(mockStories));

    component.prevPage();

    expect(hackerNewsService.getNewStories).toHaveBeenCalledWith(
      1,
      20,
      jasmine.any(Function)
    );
    expect(component.stories).toEqual(mockStories);
  });

  it('should not fetch new stories on previous page if page is 1', () => {
    component.page = 1;
    hackerNewsService.getNewStories.and.returnValue(of([]));

    component.prevPage();

    expect(hackerNewsService.getNewStories).not.toHaveBeenCalled();
  });

  it('should set loading state correctly', () => {
    const mockStories = [{ title: 'Story 7' }, { title: 'Story 8' }];
    hackerNewsService.getNewStories.and.callFake(
      (page, limit, loadingCallback) => {
        loadingCallback(true);
        return of(mockStories);
      }
    );

    component.fetchNewStories();

    expect(component.loading).toBeTrue();

    hackerNewsService.getNewStories.and.callFake(
      (page, limit, loadingCallback) => {
        loadingCallback(false);
        return of(mockStories);
      }
    );

    component.fetchNewStories();

    expect(component.loading).toBeFalse();
  });
});
