import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, RouterModule.forRoot([])], // Import necessary modules
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "angular-app"', () => {
    expect(component.title).toEqual('angular-app');
  });

  it('should render the title in a h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('angular-app');
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="/new-stories"]')).toBeTruthy();
    expect(compiled.querySelector('a[href="/search-stories"]')).toBeTruthy();
  });
});
