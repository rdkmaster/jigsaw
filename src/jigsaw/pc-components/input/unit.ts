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

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-unit, j-unit',
    template: `
        <div *ngIf="data" class="jigsaw-input-unit" [ngStyle]="_$getStyles">
            <span *ngIf="_$uniqueUnit" style="padding: 0 5px;">{{data}}</span>
            <div *ngIf="!_$uniqueUnit" class="jigsaw-input-units" [ngClass]="{'jigsaw-input-disabled': disabled}"
                 jigsawFloat [jigsawFloatTarget]="unitTemplate" [jigsawFloatOptions]="{useCustomizedBackground: true}"
                 [jigsawFloatOpenTrigger]="disabled ? 'none' : 'click'" jigsawFloatCloseTrigger="click"
                 (jigsawFloatOpenChange)="_$autoWidth($event)">
                <div class="jigsaw-input-units-selected">
                    <span *ngIf="_$selectedUnit?.icon" class="{{_$selectedUnit?.icon}}"></span>
                    <span class="jigsaw-input-units-selected-text" *ngIf="_$showLabel(_$selectedUnit)">
                        {{_$showLabel(_$selectedUnit)}}
                    </span>
                    <span *ngIf="_$selectedUnit?.suffixIcon" class="{{_$selectedUnit?.suffixIcon}}"></span>
                </div>
                <i class="iconfont iconfont-e24c jigsaw-input-units-dropdown"></i>
            </div>
        </div>
        <ng-template #unitTemplate>
            <jigsaw-list [selectedItems]="_$selectedUnit" (selectedItemsChange)="_$selectedUnitChange($event)">
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
export class JigsawUnitComponent extends AbstractJigsawComponent {
    @ViewChild(JigsawFloat)
    private _jigsawFloat: JigsawFloat;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, protected _zone?: NgZone) {
        super(_zone);
    }

    /**
     * @internal
     */
    public get _$getStyles(): any {
        let radius = {
            width: this.unitWidth + 'px'
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
    public position: 'left' | 'right';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean;

    private _data: GroupOptionValue | GroupOptionValue[];

    /**
     * @internal
     */
    public _$selectedUnit: GroupOptionValue;

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
            this._$selectedUnit = this._data[0];
        }
    }

    /**
     * @internal
     * 判断是唯一的单位，还是多选的单位
     */
    public get _$uniqueUnit(): boolean {
        return !(this._data instanceof Array);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public unitWidth: number;

    @Output()
    public unitChange: EventEmitter<GroupOptionValue> = new EventEmitter<GroupOptionValue>();

    /**
     * @internal
     */
    public _$selectedUnitChange(event: GroupOptionValue[]): void {
        if (!event) {
            return;
        }
        this._$selectedUnit = event[0];
        this._jigsawFloat.closeFloat();
        this.unitChange.emit(this._$selectedUnit);
    }

    /**
     * @internal
     */
    public _$autoWidth(event: boolean): void {
        if (!event || !this.data || !this._jigsawFloat || !this._jigsawFloat.popupElement) {
            return;
        }
        this.runAfterMicrotasks(() => {
            if (!this._jigsawFloat || !this._jigsawFloat.popupElement) {
                return;
            }
            this._renderer.setStyle(this._jigsawFloat.popupElement, 'width', this._elementRef.nativeElement.offsetWidth + 'px');
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
