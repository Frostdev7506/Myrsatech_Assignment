import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService],
    });

    service = TestBed.inject(HackerNewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get new stories', (done) => {
    const mockStories = [{ title: 'Story 1' }, { title: 'Story 2' }];
    const loadingCallback = jasmine.createSpy('loadingCallback');

    service.getNewStories(1, 20, loadingCallback).subscribe((stories) => {
      expect(stories).toEqual(mockStories);

      done();
    });

    const req = httpTestingController.expectOne((req) =>
      req.url.includes('/new-stories?page=1&limit=20')
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockStories); // Simulate a successful response
  });

  it('should handle error when getting new stories ', (done) => {
    const loadingCallback = jasmine.createSpy('loadingCallback');

    service.getNewStories(1, 20, loadingCallback).subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual(
          'Something went wrong; please try again later.'
        );

        done();
      }
    );

    const req = httpTestingController.expectOne((req) =>
      req.url.includes('/new-stories?page=1&limit=20')
    );
    expect(req.request.method).toEqual('GET');

    req.flush('Error', { status: 404, statusText: 'Not Found' }); // Simulate error response
  });

  it('should search stories', (done) => {
    const mockStories = [{ title: 'Story 3' }, { title: 'Story 4' }];
    const loadingCallback = jasmine.createSpy('loadingCallback');

    service
      .searchStories('test', 1, 20, loadingCallback)
      .subscribe((stories) => {
        expect(stories).toEqual(mockStories);

        done();
      });

    const req = httpTestingController.expectOne((req) =>
      req.url.includes('/search-stories?query=test&page=1&limit=20')
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockStories); // Simulate a successful response
  });

  it('should handle error when searching stories ', (done) => {
    const loadingCallback = jasmine.createSpy('loadingCallback');

    service.searchStories('test', 1, 20, loadingCallback).subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual(
          'Something went wrong; please try again later.'
        );
        done();
      }
    );

    const req = httpTestingController.expectOne((req) =>
      req.url.includes('/search-stories?query=test&page=1&limit=20')
    );
    expect(req.request.method).toEqual('GET');

    req.flush('Error', { status: 404, statusText: 'Not Found' }); // Simulate error response
  });
});
