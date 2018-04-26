import {
    AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Optional, Output, ViewChild
} from "@angular/core";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";
import {CommonModule} from "@angular/common";
import {IDynamicInstantiatable} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";
import {ArrayCollection} from "../../core/data/array-collection";
import {Observable} from "rxjs/Observable";

export class CascadeData {
    label: string;
    list: any[] | Observable<Object>;
    cascadingOver?: boolean;
    showAll?: boolean;
}

export type CascadeDateGenerator = (level: number, selectedItem?: any) => CascadeData;

export class CascadeTabContentInitData {
    level: number;
    list: any[] | Observable<Object>;
    cascadingOver: boolean;
    multipleSelect: boolean;
    showAll: boolean;
}

@Component({
    selector: 'jigsaw-cascade, j-cascade',
    templateUrl: './cascade.html',
    host: {
        '[class.jigsaw-cascade]': 'true'
    }
})
export class JigsawCascade implements AfterViewInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    @ViewChild(JigsawTab) public tabs: JigsawTab;

    public data: CascadeData[] = [];

    @Input()
    public dataGenerator: CascadeDateGenerator;

    @Input()
    public selectedData = [];

    @Output()
    public selectedDataChange = new EventEmitter<any[]>();

    @Input()
    public labelField: string = 'label';

    /**
     * @internal
     */
    public _trackItemBy: string[] = [];

    @Input()
    public get trackItemBy(): string | string[] {
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        if (!value) {
            return;
        }
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    @Input()
    public multipleSelect: boolean;

    @Input()
    public multidimensionalSelect: boolean;

    /**
     * @internal
     */
    public _handleMultipleSelect(selectedItems: any[], level: number) {
        if (this.multidimensionalSelect && this.selectedData[level]) {
            // 支持多维
            // 过滤掉已有的但是现在不选的
            this.selectedData[level] = this.selectedData[level].filter(item => {
                // 不是此维度的保留
                if (!(<any[]>this.data[level].list)
                        .find(it => CommonUtils.compareWithKeyProperty(item, it, this._trackItemBy))) return true;
                // 在选中项里的保留，不在选中项里的去掉
                return selectedItems.find(it => CommonUtils.compareWithKeyProperty(item, it, this._trackItemBy));
            });
            // 添加原来没选的但是现在选中的
            selectedItems.forEach(item => {
                if (!this.selectedData[level].find(it => CommonUtils.compareWithKeyProperty(item, it, this._trackItemBy))) {
                    this.selectedData[level].push(item);
                }
            })
        } else {
            this.selectedData[level] = [...selectedItems];
        }

        // 多选的tab是级联结束的地方，在这更新选中的数据
        this.selectedDataChange.emit(this.selectedData);
    }

    /**
     * @internal
     */
    public _handleSelect(selectedItem: any, level: number) {
        this._updateTabTitle(selectedItem, level);
        this.selectedData[level] = selectedItem;
        if (this.data[level].cascadingOver) {
            this.selectedDataChange.emit(this.selectedData);
        } else {
            this._cascading(level + 1, selectedItem);
        }
    }

    /**
     * @internal
     */
    public _handleSelectAll(level: number) {
        if (this.multipleSelect && this.multidimensionalSelect) {
            console.warn('multidimensional select can not select all');
            return;
        }
        this._removeCascadingTabs(level);
        this.tabs.selectedIndex = this.tabs.length - 1;
        this.selectedData = this.selectedData.slice(0, level);
        this.selectedDataChange.emit(this.selectedData);
    }

    private _addCascadingTab(level: number) {
        this._removeCascadingTabs(level);
        this.tabs.addTab(this.data[level].label, JigsawInnerCascadeTabContent, {
            level: level,
            list: this.data[level].list,
            cascadingOver: this.data[level].cascadingOver,
            multipleSelect: this.data[level].cascadingOver && this.multipleSelect,
            showAll: this.data[level].showAll
        });
    }

    private _removeCascadingTabs(level: number) {
        if (this.tabs.length > level) {
            for (let i = this.tabs.length - 1; i >= level; i--) {
                this.tabs.removeTab(i)
            }
        }
    }

    private _updateTabTitle(selectedItem: any, level: number) {
        if (!this.tabs._$tabPanes || !this.tabs._$tabPanes.toArray()[level]) return;
        this.tabs._$tabPanes.toArray()[level].title = selectedItem[this.labelField];
        this._changeDetectorRef.detectChanges();
    }

    private _cascading(level: number, selectedItem?: any) {
        const levelData = this.dataGenerator(level, selectedItem);
        if (!levelData) {
            // 取不到下一级的数据，级联到此结束，更新选中的数据
            this.selectedDataChange.emit(this.selectedData);
            return;
        }
        this.data[level] = levelData;
        this._addCascadingTab(level);
    }

    private _fillBack() {
        this.selectedData.forEach((item, index) => {
            this._cascading(index, this.selectedData[index - 1]);
            if (this.data[index].cascadingOver && this.multipleSelect) return; // 多选时的最后一个tab采用默认title
            this._updateTabTitle(item, index);
        })
    }

    ngAfterViewInit() {
        // 等待tabs渲染
        if (!this.selectedData || this.selectedData.length == 0) {
            // 没有初始数据
            this._cascading(0);
        } else {
            this._fillBack();
        }
    }
}

/**
 * @internal
 */
@Component({
    template: `
        <j-tile [(selectedItems)]="_$selectedItems" (selectedItemsChange)="_$handleSelect($event)"
                [trackItemBy]="_$cascade?.trackItemBy" [multipleSelect]="initData.multipleSelect">
            <div *ngIf="initData?.showAll" class="jigsaw-tile-show-all" (click)="_$selectAll()">全部</div>
            <j-tile-option *ngFor="let item of _$list" [value]="item" (click)="_$handleOptionClick()">
                {{item[_$cascade?.labelField]}}
            </j-tile-option>
        </j-tile>
    `
})
export class JigsawInnerCascadeTabContent implements IDynamicInstantiatable {
    constructor(@Optional() public _$cascade: JigsawCascade) {
    }

    private _initData: CascadeTabContentInitData;

    public get initData(): CascadeTabContentInitData {
        return this._initData;
    }

    public set initData(value: CascadeTabContentInitData) {
        if (!value) return;
        this._initData = value;

        let allSelectedData = this._$cascade.selectedData[this._initData.level];
        if (CommonUtils.isDefined(allSelectedData)) {
            allSelectedData = (allSelectedData instanceof ArrayCollection || allSelectedData instanceof Array) ?
                allSelectedData : [allSelectedData];
        }
        const list = this._initData.list;
        if (list instanceof Observable) {
            list.subscribe((data: any[]) => {
                this._init(data, allSelectedData);
            })
        } else if (list instanceof Array) {
            this._init(list, allSelectedData);
        }
    }

    /**
     * @internal
     */
    public _$selectedItems;

    public _$list: any[] = [];

    private _init(data: any[], allSelectedData: any[]) {
        this._$list = data;
        if (allSelectedData instanceof Array || allSelectedData instanceof ArrayCollection) {
            this._$selectedItems = allSelectedData.filter(item => {
                return this._$list.find(it =>
                    CommonUtils.compareWithKeyProperty(item, it, this._$cascade._trackItemBy))
            })
        }
    }

    /**
     * @internal
     */
    public _$handleSelect(selectedItems: any[]) {
        if (!this._initData.multipleSelect) {
            // 单选
            this._$cascade._handleSelect(selectedItems[0], this._initData.level);
        } else {
            // 多选，级联结束的tab
            this._$cascade._handleMultipleSelect(selectedItems, this._initData.level);
        }
    }

    /**
     * @internal
     */
    public _$selectAll() {
        this._$cascade._handleSelectAll(this.initData.level);
    }

    /**
     * @internal
     */
    public _$handleOptionClick() {
        // 补充已选中的option不触发selectedItemsChange
        if (this.initData.cascadingOver || this._$cascade.tabs.selectedIndex != this.initData.level) return;
        if (this._$cascade.tabs.selectedIndex < this._$cascade.tabs.length - 1) {
            this._$cascade.tabs.selectedIndex += 1;
        } else {
            this._$handleSelect(this._$selectedItems);
        }
    }
}

@NgModule({
    imports: [JigsawTabsModule, JigsawTileSelectModule, CommonModule],
    declarations: [JigsawCascade, JigsawInnerCascadeTabContent],
    exports: [JigsawCascade],
    entryComponents: [JigsawInnerCascadeTabContent]
})
export class JigsawCascadeModule {

}
