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
        console.log(111111,testButton.innerText);
        expect(!!testButton).toBe(true);
        /*expect(testButton.classList.contains('jigsaw-button-disabled')).toBe(true);
        const checkbox = fixture.nativeElement.querySelector('jigsaw-checkbox');
        checkbox.dispatchEvent(new Event('click'));
        expect(testButton.classList.contains('jigsaw-button-disabled')).toBe(false);*/
    });
});
