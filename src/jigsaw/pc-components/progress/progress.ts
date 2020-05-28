import {ChangeDetectionStrategy, Component, NgModule, Input, ElementRef, ChangeDetectorRef} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {CommonModule} from '@angular/common';

@Component({
    selector: 'jigsaw-progress, j-progress',
    templateUrl: './progress.html',
    host: {
        '[class.jigsaw-progress]': 'true',
        '[class.jigsaw-progress-processing]': 'status == "processing"',
        '[class.jigsaw-progress-block]': 'status == "block"',
        '[class.jigsaw-progress-error]': 'status == "error"',
        '[class.jigsaw-progress-success]': 'status == "success"',
        '[class.jigsaw-progress-default]': 'preSize == "default"',
        '[class.jigsaw-progress-small]': 'preSize == "small"',
        '[class.jigsaw-progress-large]': 'preSize == "large"',
        '[style.width]': 'width',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawProgress extends AbstractJigsawComponent {
    constructor(private _hostElRef: ElementRef, private _cdr: ChangeDetectorRef) {
        super()
    }

    private _value: string = '0%';
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value) {
        if(value == this._value) return;
        this._value = value;
        Promise.resolve().then(() => {
            this._autoLabelPosition();
        })
    }

    @Input()
    public split: boolean;

    @Input()
    public labelPosition: 'left' | 'right' | 'top' |'followLeft' | 'followRight' = 'right';

    @Input() public status: 'processing' | 'block' | 'error' | 'success' = 'processing';

    @Input() public preSize: 'default' | 'small' | 'large' = 'default';

    public _$labelPositionBak: 'followLeft' | 'followRight' = 'followRight';
    private _autoLabelPosition() {
        if(this.labelPosition != 'followLeft' && this.labelPosition != 'followRight') return;
        let hostEl = this._hostElRef.nativeElement;
        let [trackEl, valueEl, labelEl] = [hostEl.querySelector('.jigsaw-progress-bar-track'),
            hostEl.querySelector('.jigsaw-progress-bar-track-value'),
            hostEl.querySelector('.jigsaw-progress-bar-track-label')];
        if(!trackEl || !valueEl || !labelEl) return;
        if(this.labelPosition == 'followLeft') {
            this._$labelPositionBak = labelEl.offsetWidth < valueEl.offsetWidth ? 'followLeft' : 'followRight';
        } else if (this.labelPosition == 'followRight' && labelEl.offsetWidth + valueEl.offsetWidth >= trackEl.offsetWidth) {
            this._$labelPositionBak = labelEl.offsetWidth + valueEl.offsetWidth < trackEl.offsetWidth ? 'followRight' : 'followLeft';
        }
        this._cdr.markForCheck();
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress],
    exports: [JigsawProgress]
})
export class JigsawProgressModule {

}
