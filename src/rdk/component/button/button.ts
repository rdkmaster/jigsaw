import {NgModule, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractRDKComponent} from '../../core/api/component-api';

@Component({
    selector: 'rdk-button, a[rdk-button]',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    host: {
        '[class.rdk-button-disabled]': 'disabled',
        '(click)': '_onClick()',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.rdk-button-clicked]': "_clicked"
    }
})
export class RdkButton extends AbstractRDKComponent {

    //按钮不可点击状态
    @Input() public disabled: boolean = false;

    //按钮动画执行状态
    private _clicked: boolean = false;

    private _onClick(): void {
        if (!this.disabled && !this._clicked) {
            this._clicked = true;
            setTimeout(() => this._clicked = false, 360);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkButton],
    exports: [RdkButton]
})
export class RdkButtonModule {

}
