import {ChangeDetectorRef, Component, ComponentRef, EventEmitter, NgModule, OnDestroy, Output, ViewChild} from "@angular/core";
import {JigsawEditableBox} from "../editable-box";
import {JigsawTab} from "../../tabs/tab";
import {ComponentMetaData, TabsWrapperMetaData} from "../../../core/data/layout-data";
import {JigsawTabsModule} from "../../tabs/index";
import {JigsawInput, JigsawInputModule} from "../../input/input";
import {IDynamicInstantiatable} from "../../common";
import {CommonModule} from "@angular/common";
import {JigsawTabLabel} from "../../tabs/tab-item";

@Component({
    selector: 'j-tab-wrapper',
    templateUrl: './tabs-wrapper.html'
})
export class JigsawTabsWrapper implements OnDestroy{
    public editable: boolean;

    public box: JigsawEditableBox;

    @Output()
    public add = new EventEmitter();

    @ViewChild(JigsawTab)
    public _tabs: JigsawTab;

    /**
     * @internal
     */
    public _$handleAdd(tabs: JigsawTab) {
        this.add.emit(this);
    }

    /**
     * @internal
     */
    public _$removeTab(index) {
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.splice(index, 1);
    }

    /**
     * @internal
     */
    public _$changeTitle(changeInfo) {
        if (!this.box.data.componentMetaDataList[0].tabsMetaData.panes[changeInfo.key] ||
            this.box.data.componentMetaDataList[0].tabsMetaData.panes[changeInfo.key].title == changeInfo.title) return;
        this.box.data.componentMetaDataList[0].tabsMetaData.panes[changeInfo.key].title = changeInfo.title;
    }

    public addTab(componentMetaData: ComponentMetaData, title?: string) {
        title = <any>(title ? title : JigsawInternalEditableTabTitle);
        this._tabs.addTab(title, componentMetaData.component);
        let titleStr = '';
        if (typeof title == 'string') {
            titleStr = title;
        } else if (this._tabs._tabLabels.last._tabItemRef instanceof ComponentRef &&
            this._tabs._tabLabels.last._tabItemRef.instance instanceof JigsawInternalEditableTabTitle) {
            titleStr = this._tabs._tabLabels.last._tabItemRef.instance.title;
        }
        // 渲染后的组件保存起来
        componentMetaData.ref = this._tabs._tabContents.last._tabItemRef;
        this.box.data.componentMetaDataList[0].tabsMetaData.panes.push({
            title: titleStr,
            content: [componentMetaData]
        });
    }

    public renderTabByMetaData(metadata: TabsWrapperMetaData) {
        metadata.tabsMetaData.panes.forEach(pane => {
            this.addTab(pane.content[0], pane.title);
        })
    }

    ngOnDestroy() {
        this.add.unsubscribe();
    }
}

@Component({
    template: `
        <div *ngIf="!_$editable">
            <span>{{title}}</span>
            <span class="fa fa-edit jigsaw-editable-tab-title-bar" (click)="_handleEditable($event)"></span>
        </div>
        <j-input *ngIf="_$editable" [(value)]="title" (blur)="_$handleTitleChange()" class="jigsaw-editable-tab-title-input"></j-input>
    `
})
export class JigsawInternalEditableTabTitle implements IDynamicInstantiatable {
    constructor(private _tabLabel: JigsawTabLabel, private _changeDetectorRef: ChangeDetectorRef) {
    }

    public initData: any;
    public title: string = 'New Tab';

    @ViewChild(JigsawInput)
    public input: JigsawInput;

    /**
     * @internal
     */
    public _$editable: boolean;

    /**
     * @internal
     */
    public _handleEditable(e){
        e.preventDefault();
        e.stopPropagation();
        this._$editable = !this._$editable;
        setTimeout(() => {
            // 等待input渲染
            this.input.focus();
        });
    }

    /**
     * @internal
     */
    public _$handleTitleChange() {
        this._$editable = !this._$editable;
        this._tabLabel.change.emit({key: this._tabLabel.key, title: this.title});
        this._changeDetectorRef.detectChanges();
    }
}

@NgModule({
    imports: [JigsawTabsModule, JigsawInputModule, CommonModule],
    declarations: [JigsawTabsWrapper, JigsawInternalEditableTabTitle],
    exports: [JigsawTabsWrapper],
    entryComponents: [JigsawInternalEditableTabTitle]
})
export class JigsawTabsWrapperModule {
}

