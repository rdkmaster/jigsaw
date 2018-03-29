import {Component, EventEmitter, Output, Type, ViewChild} from "@angular/core";
import {ComponentMetaData} from "jigsaw/core/data/layout-data";
import {JigsawTab} from "jigsaw/component/tabs/tab";
import {JigsawEditableBox} from "jigsaw/component/box/editable-box";

@Component({
    selector: 'custom-tab',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CustomTabComponent {
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

