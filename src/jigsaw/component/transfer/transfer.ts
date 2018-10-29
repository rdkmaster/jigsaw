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

const transferFilterFunction = function(item) {
    function compareWithKeyProperty(item1, item2, trackItemBy) {
        if (trackItemBy && trackItemBy.length > 0) {
            for (var i = 0; i < trackItemBy.length; i++) {
                if(!item1 || !item2) {
                    // 过滤掉 typeof null == 'object'
                    return false;
                } else if (typeof item1 === 'object' && typeof item2 === 'object') {
                    if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 !== 'object' && typeof item2 === 'object') {
                    if (item1 != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 === 'object' && typeof item2 !== 'object') {
                    if (item1[trackItemBy[i]] != item2) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return item1 == item2;
        }
    }

    var listResult = true;
    var keyResult = true;
    if(this.selectedItems) {
        for (var i = 0; i < this.selectedItems.length; i++) {
            if(compareWithKeyProperty(item, this.selectedItems[i], this.trackItemBy)) {
                listResult = false;
                break;
            }
        }
    }
    if (this.keyword !== null && this.keyword !== undefined) {
        if (typeof item == 'string') {
            keyResult = item.toLowerCase().includes(this.keyword.toLowerCase())
        } else if (this.fields) {
            keyResult = (<any[]>this.fields).find(field => {
                const value: string = !item || item[field] === undefined || item[field] === null ? '' : item[field].toString();
                return value.toLowerCase().includes(this.keyword.toLowerCase())
            })
        } else {
            keyResult = false
        }
    }
    return listResult && keyResult;
};

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
    private _data: LocalPageableArray<GroupOptionValue> | PageableArray;

    @Input()
    public get data() {
        return this._data;
    }

    public set data(value) {
        if(!value || value == this.data) return;
        if((value instanceof LocalPageableArray || value instanceof PageableArray)  && value.pagingInfo) {
            this._data = value;
            setTimeout(() => {
                this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
            });
            value.onAjaxComplete(() => {
                this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
            })
        } else if(value instanceof Array || value instanceof ArrayCollection) {
            this._data = new LocalPageableArray();
            this._data.pagingInfo.pageSize = Infinity;
            this._data.fromArray(value);
            setTimeout(() => {
                this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
            });
            if(value instanceof ArrayCollection) {
                value.onAjaxSuccess(res => {
                    (<LocalPageableArray<GroupOptionValue>>this._data).fromArray(res);
                    this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
                })
            }
        }
    }

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
     * @Internal
     *
     * data和selectedItems不和list里数据双绑，list里面要做一些转换
     *
     * @param {string} frame
     * @private
     */
    public _$transferTo(frame: string) {
        if (frame == 'target') {
            if (!this._$sourceSelectedItems || !this._$sourceSelectedItems.length) return;
            this.selectedItems = this.selectedItems ? this.selectedItems : [];
            this.selectedItems.push(...this._$sourceSelectedItems);
            this.selectedItems = this.selectedItems.concat();
            if(this.data instanceof LocalPageableArray && this.data.pagingInfo) {
                this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
            }
            this._$sourceSelectedItems = [];
        }
        if (frame == 'source') {
            if (!this._$targetSelectedItems || !this._$targetSelectedItems.length) return;
            this.selectedItems = this.selectedItems.filter(item =>
                !this._$targetSelectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)));
            if(this.data instanceof LocalPageableArray && this.data.pagingInfo) {
                this._data.filter(transferFilterFunction, {selectedItems: this.selectedItems, trackItemBy: this.trackItemBy});
            }
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
    constructor(@Optional() private _transfer: JigsawTransfer) {
        super();
        this._removeHostSubscribe = _transfer.selectedItemsChange.subscribe(() => {
            this._$searchKey = '';
        })
    }

    @Input()
    public isTarget: boolean;

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
        if((value instanceof LocalPageableArray || value instanceof PageableArray) && value.pagingInfo) {
            this._data = value;
        } else if(value instanceof Array || value instanceof ArrayCollection) {
            this._updateData(value);
            if(value instanceof ArrayCollection) {
                value.onAjaxSuccess(res => {
                    this._updateData(res);
                })
            }
        }
    }

    /**
     * 这边把transfer过来的数组转成分页数据，中间变量data主要用于消除数据闪动
     * @param {GroupOptionValue[] | ArrayCollection<GroupOptionValue>} value
     * @private
     */
    private _updateData(value: GroupOptionValue[] | ArrayCollection<GroupOptionValue>) {
        if(!(value instanceof Array) && !(value instanceof ArrayCollection)) return;
        const data = new LocalPageableArray();
        if(this.isTarget && this._transfer.data && (<LocalPageableArray<GroupOptionValue>>this._transfer.data).pagingInfo) {
            // target列同步用户给的data的pageSize
            data.pagingInfo.pageSize = (<LocalPageableArray<GroupOptionValue>>this._transfer.data).pagingInfo.pageSize;
        } else {
            data.pagingInfo.pageSize =  Infinity;
        }
        data.fromArray(value);
        const removeDataOnRefresh = data.onRefresh(() => {
            removeDataOnRefresh();
            this._data = data;
            // 用于刷新分页
            this._data.refresh();
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
        this._data.filter(transferFilterFunction, {
            selectedItems: this.isTarget ? null : this._transfer.selectedItems,
            trackItemBy: this._transfer.trackItemBy,
            keyword: filterKey,
            fields: [this.labelField]
        });
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
