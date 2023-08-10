import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    NgZone,
    Output,
    Renderer2,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {JigsawFloat, JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawListModule} from "../list-and-tile/list";
import {GroupOptionValue} from "../list-and-tile/group-common";

type Styles = {
    width: string,
    'border-top-right-radius'?: number, 'border-bottom-right-radius'?: number, 'border-right'?: 'none'
    'border-top-left-radius'?: number, 'border-bottom-left-radius'?: number, 'border-left'?: 'none'
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-prefix-suffix, j-prefix-suffix',
    template: `
        <div *ngIf="data" class="jigsaw-prefix-suffix" [ngStyle]="_$getStyles" [ngClass]="{'jigsaw-prefix-suffix-disabled': disabled, 'jigsaw-prefix-suffix-show-border': showBorder}">
            <span *ngIf="_$isUnique" style="padding: 0 5px;">{{data}}</span>
            <div *ngIf="!_$isUnique" class="jigsaw-prefix-suffix-list" [ngStyle]="{'cursor': disabled ? 'not-allowed' : 'pointer'}"
                 jigsawFloat [jigsawFloatTarget]="dropdownTemplate" [jigsawFloatOptions]="{useCustomizedBackground: true}"
                 [jigsawFloatOpenTrigger]="disabled ? 'none' : 'click'" jigsawFloatCloseTrigger="click">
                <div class="jigsaw-prefix-suffix-list-selected">
                    <span *ngIf="_$selected?.icon" class="{{_$selected?.icon}}"></span>
                    <span class="jigsaw-prefix-suffix-list-selected-text" *ngIf="_$showLabel(_$selected)">
                        {{_$showLabel(_$selected)}}
                    </span>
                    <span *ngIf="_$selected?.suffixIcon" class="{{_$selected?.suffixIcon}}"></span>
                </div>
                <i class="iconfont iconfont-e24c jigsaw-prefix-suffix-list-dropdown"></i>
            </div>
        </div>
        <ng-template #dropdownTemplate>
            <jigsaw-list [width]="_elementRef?.nativeElement.offsetWidth" [selectedItems]="_$selected" (selectedItemsChange)="_$selectedChange($event)">
                <j-list-option *ngFor="let item of data" [value]="item">
                    <p j-title>
                        <span *ngIf="item?.icon" class="{{item?.icon}}" style="position: relative; top: 2px;"></span>
                        <span>{{_$showLabel(item)}}</span>
                    </p>
                    <p j-sub-title *ngIf="item?.suffixIcon">
                        <i class="{{item?.suffixIcon}}"></i>
                    </p>
                </j-list-option>
            </jigsaw-list>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawPrefixSuffixComponent extends AbstractJigsawComponent {
    @ViewChild(JigsawFloat)
    private _jigsawFloat: JigsawFloat;

    constructor(private _renderer: Renderer2,
                /**
                 * @internal
                 */
                public _elementRef: ElementRef, protected _zone?: NgZone) {
        super(_zone);
    }

    /**
     * @internal
     */
    public get _$getStyles(): Styles {
        const radius: Styles = {
            width: this.contentWidth + 'px'
        };
        if (this.position == 'left') {
            Object.assign(radius, {'border-top-right-radius': 0, 'border-bottom-right-radius': 0, 'border-right': 'none'});
        }
        if (this.position == 'right') {
            Object.assign(radius, {'border-top-left-radius': 0, 'border-bottom-left-radius': 0, 'border-left': 'none'});
        }
        return radius;
    }

    /**
     * @internal
     */
    public _$showLabel(item: any): string {
        if (item && item[this.labelField]) {
            return item[this.labelField];
        }
        return typeof item == 'string' ? item : '';
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = 'label';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public position: 'left' | 'right';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean;

    /**
     * @NoMarkForCheckRequired
     */
     @Input()
     public showBorder: boolean;

    /**
     * @internal
     */
    public _$selected: GroupOptionValue;

    private _data: GroupOptionValue | GroupOptionValue[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): GroupOptionValue | GroupOptionValue[] {
        return this._data;
    }

    public set data(value: GroupOptionValue | GroupOptionValue[]) {
        this._data = value;
        if (this._data instanceof Array && this._data.length > 0) {
            this._$selected = this._data[0];
        }
    }

    /**
     * @internal
     * 判断是唯一的单位，还是多选的单位
     */
    public get _$isUnique(): boolean {
        return !(this._data instanceof Array);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public contentWidth: number;

    @Output()
    public change: EventEmitter<GroupOptionValue> = new EventEmitter<GroupOptionValue>();

    /**
     * @internal
     */
    public _$selectedChange(event: GroupOptionValue[]): void {
        if (!event) {
            return;
        }
        this._$selected = event[0];
        this._jigsawFloat.closeFloat();
        this.change.emit(this._$selected);
    }

}

/**
 * @internal
 */
@NgModule({
    imports: [CommonModule, FormsModule, JigsawFloatModule, JigsawListModule],
    declarations: [JigsawPrefixSuffixComponent],
    exports: [JigsawPrefixSuffixComponent],
})
export class JigsawPrefixSuffixModule {

}
