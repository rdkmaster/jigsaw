import {Component, Input, NgModule, OnDestroy, Optional} from "@angular/core";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../core/data/array-collection";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawInputModule} from "../input/input";
import {GroupOptionValue} from "../list-and-tile/group-common";
import {AbstractJigsawGroupLiteComponent} from "jigsaw/component/list-and-tile/group-lite-common";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {JigsawPaginationModule} from "../pagination/pagination";
import {InternalUtils} from "../../core/utils/internal-utils";

@Component({
    selector: 'jigsaw-transfer, j-transfer',
    templateUrl: './transfer.html',
    host: {
        '[class.jigsaw-transfer]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class JigsawTransfer extends AbstractJigsawGroupLiteComponent {
    @Input()
    public data: ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | GroupOptionValue[];

    @Input()
    public subLabelField: string;

    @Input()
    public searchable: boolean;

    /**
     * @internal
     */
    public _$sourceSelectedItems: ArrayCollection<GroupOptionValue> | GroupOptionValue[];
    /**
     * @internal
     */
    public _$targetSelectedItems: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    /**
     * @internal
     */
    public _$transferTo(frame: string) {
        if (frame == 'target') {
            if (!this._$sourceSelectedItems || !this._$sourceSelectedItems.length) return;
            this.selectedItems = this.selectedItems ? this.selectedItems : [];
            this.selectedItems.push(...this._$sourceSelectedItems);
            this.selectedItems = this.selectedItems.concat();
            this.data = (<GroupOptionValue[]>this.data).filter(item =>
                !this._$sourceSelectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)));
            this._$sourceSelectedItems = [];
        }
        if (frame == 'source') {
            if (!this._$targetSelectedItems || !this._$targetSelectedItems.length) return;
            this.data.push(...this._$targetSelectedItems);
            this.data = (<GroupOptionValue[]>this.data).concat();
            this.selectedItems = this.selectedItems.filter(item =>
                !this._$targetSelectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)));
            this._$targetSelectedItems = [];
        }
        this.selectedItemsChange.emit(this.selectedItems);
    }
}

@Component({
    selector: 'jigsaw-transfer-list, j-transfer-list',
    templateUrl: './transfer-list.html',
    host: {
        '[class.jigsaw-transfer-list-frame]': 'true'
    }
})
export class JigsawTransferInternalList extends AbstractJigsawGroupLiteComponent implements OnDestroy {
    constructor(@Optional() transfer: JigsawTransfer) {
        super();
        this._removeHostSubscribe = transfer.selectedItemsChange.subscribe(() => {
            this._$searchKey = '';
        })
    }

    public get _$trackByFn() {
        return InternalUtils.trackByFn(this.trackItemBy);
    };

    private _data: LocalPageableArray<GroupOptionValue> | PageableArray;

    @Input()
    public get data(): LocalPageableArray<GroupOptionValue> | PageableArray {
        return this._data;
    }

    public set data(value) {
        if(!value || this._data == value) return;
        if(value instanceof Array || value instanceof ArrayCollection) {
            this._updateData(value);
            if(value instanceof ArrayCollection) {
                value.onAjaxSuccess(res => {
                    this._updateData(res);
                })
            }
        } else if(value instanceof LocalPageableArray || value instanceof PageableArray) {
            this._data = value;
        }
    }

    private _updateData(value: GroupOptionValue[] | ArrayCollection<GroupOptionValue>) {
        if(!(value instanceof Array) && !(value instanceof ArrayCollection)) return;
        const data = new LocalPageableArray();
        data.pagingInfo.pageSize = Infinity;
        data.fromArray(value);
        const removeDataOnRefresh = data.onRefresh(() => {
            removeDataOnRefresh();
            this._data = data;
        })
    }

    @Input()
    public subLabelField: string;

    @Input()
    public trackItemBy: string | string[];

    @Input()
    public searchable: boolean;

    public _$searchKey: string;

    private _removeHostSubscribe: CallbackRemoval;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this.data).filter(filterKey, [this.labelField]);
    }

    /**
     * @internal
     */
    public _$handleHeadSelect($event) {
        this.selectedItems = $event ? this.data : [];
        this.selectedItemsChange.emit(this.selectedItems);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeHostSubscribe) {
            this._removeHostSubscribe();
            this._removeHostSubscribe = null;
        }
    }
}


@NgModule({
    imports: [JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawInputModule, JigsawPaginationModule],
    declarations: [JigsawTransfer, JigsawTransferInternalList],
    exports: [JigsawTransfer]
})
export class JigsawTransferModule {

}
