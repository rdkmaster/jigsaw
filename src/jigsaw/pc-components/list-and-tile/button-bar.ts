import {ChangeDetectionStrategy, Component, forwardRef, Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";
import {WingsTheme} from "../../common/common";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {GroupOptionValue} from "./group-common";
import {CallbackRemoval} from "../../common/core/utils/common-utils";

@WingsTheme('button-bar.scss')
@Component({
    selector: 'jigsaw-button-bar, j-button-bar',
    template: `
        <j-tile [theme]="theme" [(selectedItems)]="selectedItems" [trackItemBy]="trackItemBy"
                [multipleSelect]="multipleSelect" [height]="'100%'" [valid]="valid"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <j-tile-option #tileOpt *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [ngClass]="{'jigsaw-button-bar-one-option': data && data.length == 1,
                                       'jigsaw-button-bar-no-min-width': !!optionWidth}"
                           [width]="optionWidth" [height]="'100%'" [disabled]="item?.disabled"
                           title="{{item?.title == null ? '' : item.title}}">
                <span *ngIf="item?.icon" [class]="item?.icon"
                      [ngClass]="{'jigsaw-button-bar-icon-only': item === '' || item[labelField] === ''}"></span>
                <p>{{item == null ? "" : (item[labelField] != null ? item[labelField] : item)}}</p>
            </j-tile-option>
        </j-tile>`,
    host: {
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-button-bar-host]': 'true',
        '[class.jigsaw-button-bar-default]': "colorType === 'default'",
        '[class.jigsaw-button-bar-primary]': "colorType === 'primary'",
        '[class.jigsaw-button-bar-warning]': "colorType === 'warning'",
        '[class.jigsaw-button-bar-error]': "colorType === 'error' || colorType === 'danger'",
        '[class.jigsaw-button-bar-size-small]': "preSize === 'small'",
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawButtonBar), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawButtonBar extends AbstractJigsawGroupLiteComponent {
    private _removeOnRefresh: CallbackRemoval;

    private _data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<GroupOptionValue> | GroupOptionValue[] {
        return this._data;
    }

    public set data(value: ArrayCollection<GroupOptionValue> | GroupOptionValue[]) {
        if (!value || this.data == value) {
            return;
        }
        this._data = value;
        if (this._data instanceof ArrayCollection) {
            if (this._removeOnRefresh) {
                this._removeOnRefresh();
                this._removeOnRefresh = null;
            }
            this._removeOnRefresh = this._data.onRefresh(() => {
                this._cdr.markForCheck();
            })
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionWidth: number | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' = 'primary';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public preSize: 'default' | 'small' = 'default';

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
            this._removeOnRefresh = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawTileSelectModule],
    declarations: [JigsawButtonBar],
    exports: [JigsawButtonBar]
})
export class JigsawButtonBarModule {

}
