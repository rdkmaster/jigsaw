//https://v9.angular.cn/guide/testing#component-dom-testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ButtonDisableDemoComponent} from "./demo.component";

describe('ButtonDisableDemoComponent', () => {
    let component: ButtonDisableDemoComponent;
    let fixture: ComponentFixture<ButtonDisableDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ButtonDisableDemoComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonDisableDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
        const testButton = fixture.nativeElement.querySelector('#test-button');
        expect(testButton.innerText).toBe('click me1 ');
    });
});
