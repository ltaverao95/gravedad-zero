/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found-component';

describe('App: GravedadZero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageNotFoundComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(PageNotFoundComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Error 404 - Page Not Found'`, async(() => {
    let fixture = TestBed.createComponent(PageNotFoundComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Error 404 - Page Not Found');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Error 404 - Page Not Found');
  }));
});
