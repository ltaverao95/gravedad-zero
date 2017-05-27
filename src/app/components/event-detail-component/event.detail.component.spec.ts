/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EventDetailComponent } from './event.detail.component';

describe('App: GravedadZero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventDetailComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(EventDetailComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Error 404 - Page Not Found'`, async(() => {
    let fixture = TestBed.createComponent(EventDetailComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Error 404 - Page Not Found');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(EventDetailComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Error 404 - Page Not Found');
  }));
});
