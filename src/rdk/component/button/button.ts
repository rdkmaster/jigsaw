import {NgModule, Component, Input, OnChanges, SimpleChanges, Renderer, ElementRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'rdk-btn, button[rdk-btn], a[rdk-btn]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.disabled]': 'disabled',
        '(click)': '_onClick()'
    }
})
export class ButtonComponent implements OnChanges, OnInit{
    @Input()
    label: string;

    @Input()
    width: number;

    @Input()
    disabled: boolean = false;

    isClicked: boolean = false;

    constructor(private renderer: Renderer, private el: ElementRef) {

    }

    ngOnInit(){
        this.width && this.renderer.setElementStyle(this.el.nativeElement.querySelector('.btn-box'), 'width', this.width + 'px');
    }

    _onClick() {
        if (!this.disabled) {
            this.isClicked = true;
            setTimeout(() => this.isClicked = false, 360);
        }
    }

    //监测输入属性变化
    @Input()
    queryValue: string;
    ngOnChanges(changes: SimpleChanges) {
        /*for (let propName in changes) {//迭代changes对象
         let chng = changes[propName];
         let cur  = JSON.stringify(chng.currentValue);//变更属性当前值
         let prev = JSON.stringify(chng.previousValue);//变更属性之前的值
         console.log(propName + " cur: " + cur +", and prev: " + prev);
         }*/
    };

    //按钮不可用时，阻止点击事件
    /*_haltDisabledEvents(event: Event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
        return false;
    }*/

}

@NgModule({
    imports: [CommonModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent]
})
export class ButtonModule {

}
