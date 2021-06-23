import { TestBed, waitForAsync } from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AppModule} from "./app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    xit(`should have as title 'Jigsaw'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Jigsaw');
    }));

    xit('should render title in a a tag', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('header h4 a').textContent).toContain('Jigsaw');
    }));
});
