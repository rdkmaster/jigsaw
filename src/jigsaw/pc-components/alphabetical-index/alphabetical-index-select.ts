import { AbstractJigsawComponent, WingsTheme } from '../../common/common';
import { ChangeDetectionStrategy, Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { JigsawAlphabeticalIndexModule } from './alphabetical-index';
import { RequireMarkForCheck } from '../../common/decorator/mark-for-check';
import { DropDownTrigger } from '../../common/directive/float/float';
import { JigsawComboSelectModule } from '../combo-select/index';
import { ArrayCollection } from '../../common/core/data/array-collection';
import { CommonUtils } from '../../common/core/utils/common-utils';

@WingsTheme('alphabetical-index-select.scss')
@Component({
    selector: 'jigsaw-alphabetical-index-select, j-alphabetical-index-select',
    templateUrl: 'alphabetical-index-select.html',
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-alphabetical-index-select-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlphabeticalIndexSelect extends AbstractJigsawComponent {
    private _data: ArrayCollection<string>;

    @Input()
    public get data() {
        return this._data;
    }

    public set data(value: ArrayCollection<string>) {
        this._data = value;
    }

    private _value: any;

    /**
     * 选择的结果，数组形式
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): ArrayCollection<string> {
        return this._value;
    }

    public set value(newValue: ArrayCollection<string>) {
        if (CommonUtils.compareValue(this._value, newValue)) {
            return;
        }
        this._value = newValue;
    }

    @Input()
    @RequireMarkForCheck()
    public placeholder: string = '';

    @Input()
    @RequireMarkForCheck()
    public disabled: boolean;

    @Input()
    @RequireMarkForCheck()
    public valid: boolean = true;

    @Input()
    @RequireMarkForCheck()
    public useDict: boolean = false;

    @Input()
    @RequireMarkForCheck()
    public openTrigger: 'mouseenter' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseenter;

    @Input()
    @RequireMarkForCheck()
    public closeTrigger: 'mouseleave' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseleave;

    @Output()
    public valueChange = new EventEmitter<any[]>();

    public _$valueChange($event) {
        this.valueChange.emit($event)
    }
}

@NgModule({
    imports: [JigsawAlphabeticalIndexModule, JigsawComboSelectModule],
    declarations: [JigsawAlphabeticalIndexSelect],
    exports: [JigsawAlphabeticalIndexSelect]
})
export class JigsawAlphabeticalIndexSelectModule { }