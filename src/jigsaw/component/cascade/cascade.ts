import {AfterViewInit, Component, EventEmitter, Input, NgModule, Optional, Output, TemplateRef, ViewChild} from "@angular/core";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";
import {CommonModule} from "@angular/common";
import {IDynamicInstantiatable} from "../common";

export class CascadeData {
    label: string;
    list: any[];
}

export type CascadeDateGenerator = (level: number, selectedItem?: any) => CascadeData;

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

    public handleSelect(selectedItem: any, level: number) {
        this._updateTabTitle(selectedItem, level);
        this.selectedData[level] = selectedItem;
        this._cascading(level + 1, selectedItem);
    }

    private _addTab(level) {
        this.tabs.removeTab(level);
        this.tabs.addTab(this.data[level].label, JigsawInnerCascadeTabContent, {
            level: level,
            list: this.data[level].list
        });
    }

    private _updateTabTitle(selectedItem: any, level: number) {
        console.log(this.tabs._$tabPanes.toArray()[0]);
        if (!this.tabs._$tabPanes || !this.tabs._$tabPanes.toArray()[level]) return;
        this.tabs._$tabPanes.toArray()[level].title = selectedItem[this.labelField];
    }

    private _cascading(level: number, selectedItem?: any) {
        const levelData = this.dataGenerator(level, selectedItem);
        if (!levelData || !(levelData.list instanceof Array)) {
            this.selectedDataChange.emit(this.selectedData);
            return;
        }
        this.data[level] = levelData;
        this._addTab(level);
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
                [trackItemBy]="_$cascade?.trackItemBy" [multipleSelect]="_$multipleSelect">
            <j-tile-option *ngFor="let item of initData?.list" [value]="item">
                {{item[_$cascade?.labelField]}}
            </j-tile-option>
        </j-tile>
    `
})
export class JigsawInnerCascadeTabContent implements IDynamicInstantiatable {
    constructor(@Optional() public _$cascade: JigsawCascade) {
    }

    public initData: any;

    public _$selectedItem;
    public _$multipleSelect: boolean;

    /**
     * @internal
     */
    public _$handleSelect(selectedItems) {
        const currentSelectedItem = selectedItems[0];
        this._$cascade.handleSelect(currentSelectedItem, this.initData.level);
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
