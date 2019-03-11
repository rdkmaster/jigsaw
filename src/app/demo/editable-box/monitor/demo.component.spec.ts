import { TestBed, async } from '@angular/core/testing';

import { MonitorComponent } from './demo.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MonitorComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(MonitorComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(MonitorComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('ADMA Monitor');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(MonitorComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to ADMA Monitor!!');
    }));
});
