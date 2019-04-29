import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, NgModule, ViewChild} from "@angular/core";
import {JigsawEditableBox} from "../editable-box";
import {JigsawTab} from "../../tabs/tab";
import {ComponentInput, ComponentMetaData, LayoutComponentInfo, LayoutData} from "../../../common/core/data/layout-data";
import {JigsawTabsModule} from "../../tabs/index";
import {JigsawInputModule} from "../../input/input";
import {CommonModule} from "@angular/common";
import {JigsawEditableTabTitleRenderer} from "../../tabs/tab-renderer";
import {CommonUtils} from "../../../common/core/utils/common-utils";

export class TabsWrapperMetaData extends ComponentMetaData {
    tabsMetaData: TabsMetaData;
}

export class TabsMetaData extends ComponentMetaData {
    panes: TabPaneMetaData[];
}

export class TabPaneMetaData {
    title: string;
    content: ComponentMetaData[];
}

@Component({
    selector: 'j-tabs-wrapper',
    templateUrl: './tabs-wrapper.html',
    host: {
        '[class.jigsaw-tabs-wrapper]': 'true'
    }
})
export class JigsawTabsWrapper implements AfterViewInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    private _box: JigsawEditableBox;

    public get box(): JigsawEditableBox {
        return this._box;
    }

    public set box(value: JigsawEditableBox) {
        if (!(value instanceof JigsawEditableBox)) return;
        this._box = value;
        this._metadata = <TabsWrapperMetaData>this._box.data.componentMetaDataList[0];
        this._$editable = this._box.editable;
        this._box.showOptionBar = false; // 有tab时，外面的box不显示操作按钮
    }

    /**
     * tab内容的box实例，顺序按照tab的顺序
     * @type {Array}
     */
    public components: any[] = [];

    private _metadata: TabsWrapperMetaData;

    /**
     * @internal
     */
    public _$editable: boolean;

    /**
     * @internal
     */
    @ViewChild(JigsawTab)
    public _tabs: JigsawTab;

    /**
     * @internal
     */
    public _$handleAdd(tabs: JigsawTab) {
        this._addDefaultTab();
    }

    /**
     * @internal
     */
    public _$removeTab(index) {
        this._metadata.tabsMetaData.panes.splice(index, 1);
        this.components.splice(index, 1);
        if (this._tabs.length == 0) {
            this._box.clearContent();
            this._box.showOptionBar = true;
        }
    }

    /**
     * @internal
     */
    public _$changeTitle(changeInfo) {
        if (!this._metadata.tabsMetaData.panes[changeInfo.key] ||
            this._metadata.tabsMetaData.panes[changeInfo.key].title == changeInfo.title) return;
        this._metadata.tabsMetaData.panes[changeInfo.key].title = changeInfo.title;
    }

    public addTab(componentMetaData: ComponentMetaData, title?: string) {
        title = <any>(title ? title : JigsawEditableTabTitleRenderer);
        this._tabs.addTab(title, componentMetaData.component);
        // 渲染后的组件保存起来，
        const componentRef = this._tabs._tabContents.last._tabItemRef;
        this.components.push(componentRef);
        // 主要是为了保存editable box的实例
        componentMetaData.ref = componentRef;
        if (componentRef instanceof ComponentRef && componentMetaData.inputs) {
            // 给组件赋值初始化数据
            componentMetaData.inputs.forEach(input => {
                if (CommonUtils.isUndefined(input.property) || CommonUtils.isUndefined(input.default)) return;
                componentRef.instance[input.property] = input.default;
            })
        }
        // 监听tab里面box的fill/fillTabs事件
        this._listenEvents(componentRef);
    }

    private _renderTabByMetaData() {
        this._metadata.tabsMetaData.panes.forEach(pane => {
            this.addTab(pane.content[0], pane.title);
        });
        setTimeout(() => {
            this._tabs.selectedIndex = 0; // 默认选中第一个tab
        });
        // tab没有内容并且box是可编辑的，加入默认的tab
        if (this._metadata.tabsMetaData.panes.length == 0 && this._$editable) {
            this._addDefaultTab();
        }
    }

    /**
     * 补充 box in tab 的元数据信息
     * @private
     */
    private _refineMetaData() {
        this._metadata.tabsMetaData.panes.forEach(pane => {
            if (!pane.content || !pane.content.length) return;
            const contentMetaData = pane.content[0];
            if (contentMetaData.selector != 'j-editable-box') return;
            // 放在data属性的前面，data会调用box渲染内容的函数，需要在渲染前准备好其他属性
            contentMetaData.inputs.unshift({
                property: 'editable',
                default: this._$editable
            },{
                property: 'showTabBar',
                default: this._box.showTabBar
            });
        });
    }

    private _addDefaultTab() {
        const componentMetaData = {
            selector: 'j-editable-box',
            component: JigsawEditableBox,
            inputs: [
                {
                    property: 'showTabBar',
                    default: this._box.showTabBar
                }
            ]
        };
        this.addTab(componentMetaData);

        // 更新data的componentMetaData
        this._metadata.tabsMetaData.panes.push({
            title: 'New Tab',
            content: [componentMetaData]
        });
    }

    private _listenEvents(insertComponent) {
        if (!(insertComponent instanceof ComponentRef) ||
            !(insertComponent.instance instanceof JigsawEditableBox)) return;

        insertComponent.instance.fill.subscribe(box => {
            this._box.getRootBox().fill.emit(box);
        });
        insertComponent.instance.fillTabs.subscribe(box => {
            this._box.getRootBox().fillTabs.emit(box);
        });
        this._box.getRootBox().editableChange.subscribe(editable => {
            if(insertComponent.instance instanceof JigsawEditableBox) {
                insertComponent.instance.editable = editable;
            }
        })
    }

    ngAfterViewInit() {
        // 等待tab渲染
        this._refineMetaData();
        this._renderTabByMetaData();
        this._changeDetectorRef.detectChanges();
    }
}

@NgModule({
    imports: [JigsawTabsModule, JigsawInputModule, CommonModule],
    declarations: [JigsawTabsWrapper, JigsawEditableTabTitleRenderer],
    exports: [JigsawTabsWrapper],
    entryComponents: [JigsawEditableTabTitleRenderer, JigsawTabsWrapper, JigsawEditableBox]
})
export class JigsawTabsWrapperModule {
    constructor() {
        // 添加wrapper的解析补丁
        LayoutData.addParseApi('j-tabs',
            (element: Element, metaDataList: ComponentMetaData[], inputs: ComponentInput[]): ComponentMetaData => {
                const panes = Array.from(element.children).reduce((arr, paneNode) => {
                    if (paneNode.tagName.toLowerCase() != 'j-pane') return;
                    const ngTemplate = Array.from(paneNode.children)
                        .find(child => child.tagName.toLowerCase() == 'ng-template');
                    arr.push({
                        title: paneNode.getAttribute('title'),
                        content: ngTemplate ? LayoutData._parseChildrenToComponentMetaDataList(ngTemplate, metaDataList) : []
                    });
                    return arr;
                }, []);
                return {
                    component: JigsawTabsWrapper,
                    selector: 'j-tabs-wrapper',
                    inputs: inputs,
                    tabsMetaData: {
                        selector: 'j-tabs',
                        component: JigsawTab,
                        panes: panes
                    }
                }
            });

        LayoutData.addParseApi('j-box',
            (element: Element, metaDataList: ComponentMetaData[], inputs: ComponentInput[]): ComponentMetaData => {
                const layoutData = LayoutData.of(element.outerHTML, metaDataList);
                return {
                    component: JigsawEditableBox,
                    selector: 'j-editable-box',
                    inputs: [
                        {
                            property: 'data',
                            default: layoutData
                        }
                    ]
                }
            });

        LayoutData.addWrapperContentGetter(JigsawTabsWrapper, (component: any, arr: LayoutComponentInfo[]): LayoutComponentInfo[] => {
            if (!(component instanceof JigsawTabsWrapper)) return arr;
            const tabsWrapper = component;
            if (tabsWrapper.components) {
                tabsWrapper.components.forEach(box => {
                    if (box.instance instanceof JigsawEditableBox) {
                        arr.push(...box.instance.data.getAllInnerComponents());
                    }
                })
            }
            return arr;
        })
    }
}

