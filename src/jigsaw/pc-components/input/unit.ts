import {ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, NgZone, Output, Renderer2, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {JigsawFloat, JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawListModule} from "../list-and-tile/list";
import {GroupOptionValue} from "../list-and-tile/group-common";

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-unit, j-unit',
    template: `
        <div *ngIf="data" class="jigsaw-input-unit"
             [ngStyle]="{width: unitWidth, 'border-left': position == 'right' ? 'none' : '', 'border-right': position == 'left' ? 'none' : ''}">
            <span *ngIf="uniqueUnit">{{data}}</span>
            <div *ngIf="!uniqueUnit" class="jigsaw-input-units" [ngClass]="{'jigsaw-input-disabled': disabled}"
                 jigsawFloat [jigsawFloatTarget]="unitTemplate" [jigsawFloatOptions]="{useCustomizedBackground: true}"
                 [jigsawFloatOpenTrigger]="disabled ? 'none' : 'click'" jigsawFloatCloseTrigger="click"
                 (jigsawFloatOpenChange)="_$autoWidth()">
                <div class="jigsaw-input-units-selected">
                    <span *ngIf="_$selectUnit?.icon" class="{{_$selectUnit?.icon}}"></span>
                    <span class="jigsaw-input-units-selected-text" *ngIf="showLabel(_$selectUnit)">
                        {{showLabel(_$selectUnit)}}
                    </span>
                    <span *ngIf="_$selectUnit?.suffixIcon" class="{{_$selectUnit?.suffixIcon}}"></span>
                </div>
                <i class="iconfont iconfont-e24c jigsaw-input-units-dropdown"></i>
            </div>
        </div>
        <ng-template #unitTemplate>
            <jigsaw-list [selectedItems]="_$selectUnit" (selectedItemsChange)="_$selectUnitChange($event)">
                <j-list-option *ngFor="let item of data" [value]="item">
                    <p j-title>
                        <span *ngIf="item?.icon" class="{{item?.icon}}"></span>
                        <span>{{showLabel(item)}}</span>
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
export class JigsawUnitComponent extends AbstractJigsawComponent {
    @ViewChild(JigsawFloat)
    private _jigsawFloat: JigsawFloat;

    constructor(private _renderer: Renderer2, protected _zone?: NgZone) {
        super(_zone);
    }

    public showLabel(item: any): string {
        if (item && item[this.labelField]) {
            return item && item[this.labelField];
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
    public position: 'left' | 'right' = 'right';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean;

    private _data: GroupOptionValue | GroupOptionValue[];

    /**
     * @internal
     */
    public _$selectUnit: GroupOptionValue;

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
            this._$selectUnit = this._data[0];
        }
    }

    /**
     * @internal
     * 判断是唯一的单位，还是多选的单位
     */
    public get uniqueUnit(): boolean {
        return !(this._data instanceof Array);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public unitWidth: string;

    @Output()
    public unitChange: EventEmitter<GroupOptionValue> = new EventEmitter<GroupOptionValue>();

    /**
     * @internal
     */
    public _$selectUnitChange(event: GroupOptionValue[]): void {
        if (!event) {
            return;
        }
        this._$selectUnit = event[0];
        this._jigsawFloat.closeFloat();
        this.unitChange.emit(this._$selectUnit);
    }

    /**
     * @internal
     */
    public _$autoWidth(): void {
        if (!this.data || !this._jigsawFloat || !this._jigsawFloat.popupElement) {
            return;
        }
        this.runAfterMicrotasks(() => {
            if (!this._jigsawFloat || !this._jigsawFloat.popupElement) {
                return;
            }
            this._renderer.setStyle(this._jigsawFloat.popupElement, 'width', this.unitWidth);
        });
    }
}

/**
 * @internal
 */
@NgModule({
    imports: [CommonModule, FormsModule, JigsawFloatModule, JigsawListModule],
    declarations: [JigsawUnitComponent],
    exports: [JigsawUnitComponent],
})
export class JigsawPrefixUnitModule {

}
