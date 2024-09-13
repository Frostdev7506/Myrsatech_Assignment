import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService],
    });

    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getNewStories', () => {
    it('should call the correct URL and return expected data', () => {
      const mockData = [{ title: 'New Story 1', url: 'http://example.com/1' }];
      const page = 1;
      const limit = 20;
      const url = `${apiUrl}/new-stories?page=${page}&limit=${limit}`;

      service.getNewStories(page, limit).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle errors', () => {
      const page = 1;
      const limit = 20;
      const url = `${apiUrl}/new-stories?page=${page}&limit=${limit}`;
      const errorMsg = 'Error fetching new stories';

      service.getNewStories(page, limit).subscribe(
        () => fail('expected an error, not stories'),
        (error) => expect(error.message).toContain(errorMsg)
      );

      const req = httpMock.expectOne(url);
      req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#searchStories', () => {
    it('should call the correct URL and return expected data', () => {
      const mockData = [
        { title: 'Search Story 1', url: 'http://example.com/1' },
      ];
      const query = 'test';
      const page = 1;
      const limit = 20;
      const url = `${apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`;

      service.searchStories(query, page, limit).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle errors', () => {
      const query = 'test';
      const page = 1;
      const limit = 20;
      const url = `${apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`;
      const errorMsg = 'Error searching stories';

      service.searchStories(query, page, limit).subscribe(
        () => fail('expected an error, not stories'),
        (error) => expect(error.message).toContain(errorMsg)
      );

      const req = httpMock.expectOne(url);
      req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
    });
  });
});
