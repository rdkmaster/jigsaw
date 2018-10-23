import {Component, Input, NgModule} from "@angular/core";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../core/data/array-collection";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawInputModule} from "../input/input";
import {GroupOptionValue} from "../list-and-tile/group-common";
import {AbstractJigsawGroupLiteComponent} from "jigsaw/component/list-and-tile/group-lite-common";
import {CommonUtils} from "../../core/utils/common-utils";

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
        if(frame == 'target') {
            this.selectedItems = this.selectedItems ? this.selectedItems : [];
            this.selectedItems.push(...this._$sourceSelectedItems);
            this.data = (<any[]>this.data).filter(item =>
                !this._$sourceSelectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)))
            this._$sourceSelectedItems = [];
        }
        if(frame == 'source') {
            this.data.push(...this._$targetSelectedItems);
            this.selectedItems = this.selectedItems.filter(item =>
                !this._$targetSelectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)))
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
export class JigsawTransferInternalList extends AbstractJigsawGroupLiteComponent {
    @Input()
    public data: ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | GroupOptionValue[];

    @Input()
    public subLabelField: string;

    @Input()
    public trackItemBy: string | string[];

    @Input()
    public searchable: boolean;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if (!(this.data instanceof LocalPageableArray) && !(this.data instanceof PageableArray)) {
            const data = new LocalPageableArray();
            data.fromArray(this.data);
            this.data = data;
        }
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
}


@NgModule({
    imports: [JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawInputModule],
    declarations: [JigsawTransfer, JigsawTransferInternalList],
    exports: [JigsawTransfer]
})
export class JigsawTransferModule {

}
