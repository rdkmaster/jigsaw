import {Component, EventEmitter, NgModule, Output, ViewChild} from "@angular/core";
import {JigsawEditableBox} from "../editable-box";
import {JigsawTab} from "../../tabs/tab";
import {ComponentMetaData, TabsWrapperMetaData} from "../../../core/data/layout-data";
import {JigsawTabsModule} from "../../tabs/index";

@Component({
    selector: 'custom-tab',
    templateUrl: './tabs-wrapper.html'
})
export class JigsawTabsWrapper {
    public box: JigsawEditableBox;

    @Output()
    public add = new EventEmitter();

    @ViewChild(JigsawTab)
    private _tabs: JigsawTab;

    /**
     * @internal
     */
    public _$handleAdd() {
        this.add.emit(this);
    }

    /**
     * @internal
     */
    public _$removeTab(index) {
        console.log(index);
        this._tabs.removeTab(index);
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.splice(index, 1);
        this.box.data.setComponentMetaData(this.box.data.componentMetaDataList);
    }

    public addTab(componentMetaData: ComponentMetaData, title?: string) {
        title = title ? title : 'New tab';
        this._tabs.addTab(title, componentMetaData.component, 'jigsaw');
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.push({
            title: title,
            content: [componentMetaData]
        });
        this.box.data.setComponentMetaData(this.box.data.componentMetaDataList);
    }

    public renderTabByMetaData(metadata: TabsWrapperMetaData) {
        metadata.tabsMetaData.panes.forEach(pane => {
            this.addTab(pane.content[0], pane.title);
        })
    }
}

@NgModule({
    imports: [JigsawTabsModule],
    declarations: [JigsawTabsWrapper],
    exports: [JigsawTabsWrapper]
})
export class JigsawTabsWrapperModule {
}

