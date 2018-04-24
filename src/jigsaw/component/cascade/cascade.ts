import {
    AfterViewInit, Component, EventEmitter, Input, NgModule, Optional, Output, TemplateRef, ViewChild
} from "@angular/core";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";
import {CommonModule} from "@angular/common";
import {IDynamicInstantiatable} from "../common";

export class CascadeData {
    label: string;
    list: any[];
    cascadingOver?: boolean;
}

export type CascadeDateGenerator = (level: number, selectedItem?: any) => CascadeData;

export class CascadeTabContentInitData {
    level: number;
    list: any[];
    multipleSelect: boolean
}

@Component({
    selector: 'jigsaw-cascade, j-cascade',
    templateUrl: './cascade.html'
})
export class JigsawCascade implements AfterViewInit {
    @ViewChild(JigsawTab) public tabs: JigsawTab;

    @ViewChild(TemplateRef) public tabContent: TemplateRef<any>;

    public data: CascadeData[] = [];

    @Input()
    public dataGenerator: CascadeDateGenerator;

    @Input()
    public selectedData = [];

    @Output()
    public selectedDataChange = new EventEmitter<any[]>();

    @Input()
    public labelField: string = 'label';

    @Input()
    public trackItemBy: string | string[];

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
            multipleSelect: this.data[level].cascadingOver && this.multipleSelect
        });
    }

    private _updateTabTitle(selectedItem: any, level: number) {
        if (!this.tabs._$tabPanes || !this.tabs._$tabPanes.toArray()[level]) return;
        this.tabs._$tabPanes.toArray()[level].title = selectedItem[this.labelField];
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

    ngAfterViewInit() {
        this._cascading(0);
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

    public initData: CascadeTabContentInitData;

    public _$selectedItem;

    /**
     * @internal
     */
    public _$handleSelect(selectedItems: any[]) {
        if(!this.initData.multipleSelect) {
            // 单选
            this._$cascade.handleSelect(selectedItems[0], this.initData.level);
        }else{
            // 多选，级联结束的tab
            this._$cascade.handleMultipleSelect(selectedItems, this.initData.level);
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
