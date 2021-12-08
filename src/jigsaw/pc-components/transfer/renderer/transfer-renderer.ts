import { Component, ChangeDetectionStrategy, Injector, NgModule, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArrayCollection } from '../../../common/core/data/array-collection';
import { JigsawListModule } from '../../../pc-components/list-and-tile/list';
import { JigsawCheckBoxModule } from '../../../pc-components/checkbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JigsawPaginationModule } from '../../../pc-components/pagination/pagination';
import { JigsawSearchInputModule } from '../../../pc-components/input/search-input';
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';

export type listOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    [field: string]: string | boolean;
}

export interface transferRenderer {
    data: any;
    selectedItems: ArrayCollection<listOption>;
    transferSelectedItems: ArrayCollection<listOption>;
    transferOut(selectedItems: ArrayCollection<listOption>);
    transferIn(selectedItems: ArrayCollection<listOption>);
}
@Component({
    templateUrl: './transfer-list.html'
})
export class TransferSourceListRenderer implements transferRenderer {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    private _data: ArrayCollection<listOption>;

    /**
     * 提供选择的数据集合
     *
     */
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        console.log(11111, value)
        this._data = value;
    }

    public selectedItems: ArrayCollection<listOption>;

    public transferSelectedItems: ArrayCollection<listOption>;

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 设置数据的副显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public subLabelField: string = "subLabel";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.trackItemBy);
    };

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        console.log(this.selectedItems)
    }

    public transferOut(selectedItems) {

    }

    public transferIn(selectedItems) {

    }
}
@NgModule({
    declarations: [TransferSourceListRenderer],
    imports: [CommonModule, JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawPaginationModule, JigsawSearchInputModule]
})
export class JigsawTransferRendererModule {

}
