import {
    AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Optional, Output, TemplateRef, ViewChild
} from "@angular/core";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";
import {CommonModule} from "@angular/common";
import {IDynamicInstantiatable} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";
import {ArrayCollection} from "../../core/data/array-collection";

export class CascadeData {
    label: string;
    list: any[];
    cascadingOver?: boolean;
}

export type CascadeDateGenerator = (level: number, selectedItem?: any) => CascadeData;

export class CascadeTabContentInitData {
    level: number;
    list: any[];
    cascadingOver: boolean;
    multipleSelect: boolean;
}

@Component({
    selector: 'jigsaw-cascade, j-cascade',
    templateUrl: './cascade.html'
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

    //设置对象的标识
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

    public handleMultipleSelect(selectedItems: any[], level: number) {
        this.selectedData[level] = selectedItems;
        // 多选的tab是级联结束的地方，在这更新选中的数据
        this.selectedDataChange.emit(this.selectedData);
    }

    public handleSelect(selectedItem: any, level: number) {
        this._updateTabTitle(selectedItem, level);
        this.selectedData[level] = selectedItem;
        this._cascading(level + 1, selectedItem);
    }

    private _addCascadingTab(level: number) {
        if (this.tabs.length > level) {
            for (let i = this.tabs.length - 1; i >= level; i--) {
                this.tabs.removeTab(i)
            }
        }
        this.tabs.addTab(this.data[level].label, JigsawInnerCascadeTabContent, {
            level: level,
            list: this.data[level].list,
            cascadingOver: this.data[level].cascadingOver,
            multipleSelect: this.data[level].cascadingOver && this.multipleSelect
        });
    }

    private _updateTabTitle(selectedItem: any, level: number) {
        if (!this.tabs._$tabPanes || !this.tabs._$tabPanes.toArray()[level]) return;
        this.tabs._$tabPanes.toArray()[level].title = selectedItem[this.labelField];
        this._changeDetectorRef.detectChanges();
    }

    private _cascading(level: number, selectedItem?: any) {
        const levelData = this.dataGenerator(level, selectedItem);
        if (!levelData || !(levelData.list instanceof Array)) {
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
        <j-tile [(selectedItems)]="_$selectedItem" (selectedItemsChange)="_$handleSelect($event)"
                [trackItemBy]="_$cascade?.trackItemBy" [multipleSelect]="initData.multipleSelect">
            <j-tile-option *ngFor="let item of initData?.list" [value]="item">
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

        if (!this._initData.cascadingOver) return;
        let lastLevelData = this._$cascade.selectedData[this._initData.level];
        if (!lastLevelData) return;
        lastLevelData = (lastLevelData instanceof ArrayCollection || lastLevelData instanceof Array) ?
            lastLevelData : [lastLevelData];
        this._$selectedItem = lastLevelData.filter(item => {
            return this._initData.list.find(it =>
                CommonUtils.compareWithKeyProperty(item, it, this._$cascade._trackItemBy))
        })
    }

    public _$selectedItem;

    /**
     * @internal
     */
    public _$handleSelect(selectedItems: any[]) {
        if (!this._initData.multipleSelect) {
            // 单选
            this._$cascade.handleSelect(selectedItems[0], this._initData.level);
        } else {
            // 多选，级联结束的tab
            this._$cascade.handleMultipleSelect(selectedItems, this._initData.level);
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
