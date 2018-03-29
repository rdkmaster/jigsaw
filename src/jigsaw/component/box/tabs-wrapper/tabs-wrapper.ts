import {Component, EventEmitter, NgModule, Output, ViewChild} from "@angular/core";
import {ComponentMetaData} from "jigsaw/core/data/layout-data";
import {JigsawTab} from "jigsaw/component/tabs/tab";
import {JigsawEditableBox} from "jigsaw/component/box/editable-box";
import {JigsawTabsModule} from "../../tabs/index";

@Component({
    selector: 'custom-tab',
    templateUrl: './tabs-wrapper.html',
    styleUrls: ['./tabs-wrapper.scss']
})
export class JigsawTabsWrapper {
    box: JigsawEditableBox;

    @ViewChild(JigsawTab) tabs: JigsawTab;

    @Output()
    public add = new EventEmitter();

    /**
     * @internal
     */
    public _$handleAdd() {
        this.add.emit(this);
    }

    public addTab(componentMetaData: ComponentMetaData) {
        this.tabs.addTab('New tab', componentMetaData.component, 'jigsaw');
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.push({
            title: 'New tab',
            content: [componentMetaData]
        });
        this.box.data.setComponentMetaData(this.box.data.componentMetaDataList);
    }

    public removeTabByIndex(index) {
        this.tabs.removeTab(index);
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.splice(0, 1);
        this.box.data.setComponentMetaData(this.box.data.componentMetaDataList);
    }
}

@NgModule({
    imports: [JigsawTabsModule],
    declarations: [JigsawTabsWrapper],
    exports: [JigsawTabsWrapper]
})
export class JigsawTabsWrapperModule {
}

