import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewStoriesComponent } from './new-stories.component';
import { HackerNewsService } from '../hacker-news.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('NewStoriesComponent', () => {
  let component: NewStoriesComponent;
  let fixture: ComponentFixture<NewStoriesComponent>;
  let mockHackerNewsService: jasmine.SpyObj<HackerNewsService>;

  beforeEach(async () => {
    mockHackerNewsService = jasmine.createSpyObj('HackerNewsService', [
      'getNewStories',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [NewStoriesComponent],
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty stories and page 1', () => {
    expect(component.stories).toEqual([]);
    expect(component.page).toBe(1);
    expect(component.limit).toBe(20);
  });

  it('should call fetchNewStories on ngOnInit', () => {
    const fetchNewStoriesSpy = spyOn(
      component,
      'fetchNewStories'
    ).and.callThrough();
    component.ngOnInit();
    expect(fetchNewStoriesSpy).toHaveBeenCalled();
  });

  it('should fetch new stories and update the stories property', () => {
    const mockData = [{ title: 'Story 1', url: 'http://example.com/1' }];
    mockHackerNewsService.getNewStories.and.returnValue(of(mockData));
    component.fetchNewStories();
    fixture.detectChanges();
    expect(component.stories).toEqual(mockData);
  });

  it('should call nextPage and fetch new stories', () => {
    spyOn(component, 'fetchNewStories').and.callThrough();
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.fetchNewStories).toHaveBeenCalled();
  });

  it('should call prevPage and fetch new stories if page is greater than 1', () => {
    component.page = 2;
    spyOn(component, 'fetchNewStories').and.callThrough();
    component.prevPage();
    expect(component.page).toBe(1);
    expect(component.fetchNewStories).toHaveBeenCalled();
  });

  it('should not call prevPage when page is 1', () => {
    spyOn(component, 'fetchNewStories').and.callThrough();
    component.prevPage();
    expect(component.page).toBe(1);
    expect(component.fetchNewStories).not.toHaveBeenCalled();
  });
});
