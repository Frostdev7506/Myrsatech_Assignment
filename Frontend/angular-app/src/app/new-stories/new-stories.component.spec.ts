import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoriesComponent } from './new-stories.component';

describe('NewStoriesComponent', () => {
  let component: NewStoriesComponent;
  let fixture: ComponentFixture<NewStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
