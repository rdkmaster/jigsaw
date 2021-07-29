import {AfterViewInit, Component, EventEmitter, Input, NgModule, OnDestroy, Output, ChangeDetectionStrategy} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ZTreeSettingSetting, ZTreeIcon} from "./ztree-types";
import {SimpleTreeData, TreeData} from "../../common/core/data/tree-data";
import { copySync } from 'fs-extra';

export class TreeEventData {
    treeId: string;
    treeNodes: object;
    event?: Event;
    extraInfo?: object;
}

@Component({
    selector: 'jigsaw-tree-ext, j-tree-ext',
    template: `
        <div [id]="_$uniqueId" class="ztree"></div>`,
    styles: [`
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTreeExt extends AbstractJigsawComponent implements AfterViewInit, OnDestroy {
    constructor() {
        super();
    }

    /**
     * @internal
     */
    private _customCallback;
    /**
     * @internal
     */
    public _$uniqueId: string = InternalUtils.createUniqueId();

    /**
     * @internal
     */
    private _setting: ZTreeSettingSetting = this._defaultSetting();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get setting(): ZTreeSettingSetting {
        return this._setting;
    }

    public set setting(setting: ZTreeSettingSetting) {
        if (!CommonUtils.isDefined(setting) || CommonUtils.isEmptyObject(setting)) {
            this._setting = this._defaultSetting();
        } else {
            this._customCallback = setting.callback;
            setting.callback = this._defaultSetting().callback;
            this._setting = setting;
        }
        this._updateTree();
    }

    private _removeRefreshCallback: CallbackRemoval;

    private _data: SimpleTreeData | TreeData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): SimpleTreeData | TreeData {
        return this._data;
    }

    public set data(data: SimpleTreeData | TreeData) {
        if (!(data instanceof SimpleTreeData) && !(data instanceof TreeData)) {
            return;
        }
        this._data = data;
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = data.onRefresh(() => {
            this._updateTree();
        });
    }

    private _iconData: ZTreeIcon = {
        edit: "ea0c",
        remove: "e9c3",
        open: "e4e4",
        close: "e4e3",
        document: "e9d5",
        checkboxChecked: "e140",
        checkboxNotCheck: "e141",
        checkboxHalf: "e47a",
        nodeOpen: "ea09",
        nodeClose: "ea1c"
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get iconData(): ZTreeIcon {
        return this._iconData;
    }

    public set iconData(data: ZTreeIcon){
        if (!data) {
            return;
        }
        for (const key in data) {
            this._iconData[key] = data[key].split("-")[1];
        }
        this.setZTreeIcon();
    }

    private setZTreeIcon(){
        const iconData = this._iconData;
        const head = document.getElementsByTagName("head")[0];
        const zTreeIconStyle = document.getElementById(this._$uniqueId + "style") as HTMLLinkElement;
        if (zTreeIconStyle) {
            head.removeChild(zTreeIconStyle);
        }
        const style = document.createElement("style");
        style.id = this._$uniqueId + "style";
        document.head.appendChild(style);
        const sheet = style.sheet as CSSStyleSheet;
        sheet.insertRule(`.ztree#${this._$uniqueId}#${this._$uniqueId} li span.button.edit::after {content: "\\${iconData.edit}"}`, sheet.cssRules.length);
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.remove::after {content: "\\${iconData.remove}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_open::after {content: "\\${iconData.open}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_close::after {content: "\\${iconData.close}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_docu::after {content: "\\${iconData.document}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_true_full::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_true_full_focus::after {content: "\\${iconData.checkboxChecked}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_false_full::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_false_full_focus::after {content: "\\${iconData.checkboxNotCheck}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_true_part::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_true_part_focus::after {content: "\\${iconData.checkboxHalf}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.switch.noline_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.roots_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.center_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.bottom_open::after {content: "\\${iconData.nodeOpen}"}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.switch.noline_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.roots_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.center_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.bottom_close::after {content: "\\${iconData.nodeClose}"}`,
            sheet.cssRules.length
        );
        this.setZTreeNodeIcon(sheet);
    }

    private setZTreeNodeIcon(sheet){
        let customIcon = [];
        this.getZTreeNodeIcon(this._data,customIcon);
        customIcon = customIcon.filter((val,i)=>customIcon.indexOf(val) === i);
        customIcon.forEach((icon)=>{
            const content = icon.split("-")[1]; 
            sheet.insertRule(
                `.ztree#${this._$uniqueId} li span.button.${icon}_ico_open::after,
                .ztree#${this._$uniqueId} li span.button.${icon}_ico_close::after,
                .ztree#${this._$uniqueId} li span.button.${icon}_ico_docu::after {content: "\\${content}"}`,
                sheet.cssRules.length
            );
        })
    }

    private getZTreeNodeIcon(data,resArr){
        if (data.hasOwnProperty("nodes")) {
            data["nodes"].forEach(node => {
                if (node.hasOwnProperty("iconSkin")) {
                    resArr.push(node["iconSkin"]);
                }
                if (node.hasOwnProperty("nodes")) {
                    this.getZTreeNodeIcon(node, resArr);
                }
            });
        }
    }

    @Output()
    public beforeAsync = new EventEmitter<TreeEventData>();
    @Output()
    public beforeCheck = new EventEmitter<TreeEventData>();
    @Output()
    public beforeClick = new EventEmitter<TreeEventData>();
    @Output()
    public beforeCollapse = new EventEmitter<TreeEventData>();
    @Output()
    public beforeDblClick = new EventEmitter<TreeEventData>();
    @Output()
    public beforeDrag = new EventEmitter<TreeEventData>();
    @Output()
    public beforeDragOpen = new EventEmitter<TreeEventData>();
    @Output()
    public beforeDrop = new EventEmitter<TreeEventData>();
    @Output()
    public beforeEditName = new EventEmitter<TreeEventData>();
    @Output()
    public beforeExpand = new EventEmitter<TreeEventData>();
    @Output()
    public beforeMouseDown = new EventEmitter<TreeEventData>();
    @Output()
    public beforeMouseUp = new EventEmitter<TreeEventData>();
    @Output()
    public beforeRemove = new EventEmitter<TreeEventData>();
    @Output()
    public beforeRename = new EventEmitter<TreeEventData>();
    @Output()
    public beforeRightClick = new EventEmitter<TreeEventData>();

    @Output()
    public onAsyncError = new EventEmitter<TreeEventData>();
    @Output()
    public onAsyncSuccess = new EventEmitter<TreeEventData>();
    @Output()
    public onCheck = new EventEmitter<TreeEventData>();
    @Output()
    public onClick = new EventEmitter<TreeEventData>();
    @Output()
    public onCollapse = new EventEmitter<TreeEventData>();
    @Output()
    public onDblClick = new EventEmitter<TreeEventData>();
    @Output()
    public onDrag = new EventEmitter<TreeEventData>();
    @Output()
    public onDragMove = new EventEmitter<TreeEventData>();
    @Output()
    public onDrop = new EventEmitter<TreeEventData>();
    @Output()
    public onExpand = new EventEmitter<TreeEventData>();
    @Output()
    public onMouseDown = new EventEmitter<TreeEventData>();
    @Output()
    public onMouseUp = new EventEmitter<TreeEventData>();
    @Output()
    public onNodeCreated = new EventEmitter<TreeEventData>();
    @Output()
    public onRemove = new EventEmitter<TreeEventData>();
    @Output()
    public onRename = new EventEmitter<TreeEventData>();
    @Output()
    public onRightClick = new EventEmitter<TreeEventData>();

    ngAfterViewInit() {
        this._updateTree();
        this.setZTreeIcon();
    }

    ngOnDestroy() {
        this.ztree.destroy();
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
            this._removeRefreshCallback = null;
        }
    }

    public ztree: any;

    private _updateTree() {
        const $ = window["$"];
        if (!this._setting || !this._data || !$) {
            return;
        }
        this.ztree = $.fn.zTree.init($("#" + this._$uniqueId), this._setting, this._data.nodes);
    }

    public selectNodes(key: string, value: any, parentNode: any) {
        if (!this.ztree) {
            return;
        }
        let nodes = this.ztree.getNodesByParam(key, value, parentNode);
        if (nodes.length > 0) {
            this.ztree.selectNode(nodes[0]);
        }
    }

    callCustomCallbackEvent(eventName, event, ...para) {
        if (CommonUtils.isDefined(this._customCallback) && CommonUtils.isDefined(this._customCallback[eventName])) {
            if (event) {
                this._customCallback[eventName](event, ...para);
            } else {
                return this._customCallback[eventName](...para);
            }

        } else {
            if (!event) {
                return true;
            }
        }

    }

    private _defaultSetting() {
        let that = this;

        let setObj: ZTreeSettingSetting = {
            data: {
                key: {
                    children: 'nodes',
                    name: 'label'
                }
            },
            check: {
                enable: true
            },

            callback: {
                beforeAsync: before_async,
                beforeCheck: before_check,
                beforeClick: before_click,
                beforeCollapse: before_collapse,
                beforeDblClick: before_dblClick,
                beforeDrag: before_drag,
                beforeDragOpen: before_drag_open,
                beforeDrop: before_drop,
                beforeEditName: before_editName,
                beforeExpand: before_expand,
                beforeMouseDown: before_mouseDown,
                beforeMouseUp: before_mouseUp,
                beforeRemove: before_remove,
                beforeRename: before_rename,
                beforeRightClick: before_rightClick,
                //
                onAsyncError: on_asyncError,
                onAsyncSuccess: on_asyncSuccess,
                onCheck: on_check,
                onClick: on_click,
                onCollapse: on_collapse,
                onDblClick: on_dblclick,
                onDrag: on_drag,
                onDragMove: on_dragMove,
                onDrop: on_drop,
                onExpand: on_expand,
                onMouseDown: on_mouseDown,
                onMouseUp: on_mouseUp,
                onNodeCreated: on_nodeCreated,
                onRemove: on_remove,
                onRename: on_rename,
                onRightClick: on_rightClick
            },
            edit: {
                enable: true,
                removeTitle: '',
                renameTitle: ''
            },
            view: {
                fontCss: undefined,
                showLine: true
            }
        };

        function before_async(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeAsync", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeAsync", undefined, treeId, treeNode);
        }

        function before_check(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeCheck", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeCheck", undefined, treeId, treeNode);
        }

        function before_click(treeId, treeNode, clickFlag) {
            that.setTreeEvent.call(that, "beforeClick", treeId, treeNode, undefined, {"clickFlag": clickFlag});
            return that.callCustomCallbackEvent("beforeClick", undefined, treeId, treeNode, clickFlag);
        }

        function before_collapse(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeCollapse", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeCollapse", undefined, treeId, treeNode);
        }

        function before_dblClick(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeDblClick", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeDblClick", undefined, treeId, treeNode);
        }

        function before_drag(treeId, treeNodes) {
            that.setTreeEvent.call(that, "beforeDrag", treeId, treeNodes);
            return that.callCustomCallbackEvent("beforeDrag", undefined, treeId, treeNodes);
        }

        function before_drag_open(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeDragOpen", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeDragOpen", undefined, treeId, treeNode);
        }

        function before_drop(treeId, treeNodes, targetNode, moveType, isCopy) {
            let extraInfo = {"targetNode": targetNode, "moveType": moveType, "isCopy": isCopy};
            that.setTreeEvent.call(that, "beforeDrop", treeId, treeNodes, undefined, extraInfo);
            return that.callCustomCallbackEvent("beforeDrop", undefined, treeId, treeNodes, targetNode, moveType, isCopy);
        }

        function before_editName(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeEditName", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeEditName", undefined, treeId, treeNode);
        }

        function before_expand(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeExpand", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeExpand", undefined, treeId, treeNode);
        }

        function before_mouseDown(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeMouseDown", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeMouseDown", undefined, treeId, treeNode);
        }

        function before_mouseUp(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeMouseUp", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeMouseUp", undefined, treeId, treeNode);
        }

        function before_remove(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeRemove", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeRemove", undefined, treeId, treeNode);
        }

        //todo tree before_rename事件的isCancel属性传不出来
        function before_rename(treeId, treeNode, newName, isCancel) {
            if (newName.length == 0) {
                alert("Node name can not be empty.");
                return false;
            } else {
                let extraInfo = {"newName": newName, "isCancel": isCancel};
                that.setTreeEvent.call(that, "beforeRename", treeId, treeNode, undefined, extraInfo);
                return that.callCustomCallbackEvent("beforeRename", undefined, treeId, treeNode, newName, isCancel);

            }

        }

        function before_rightClick(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeRightClick", treeId, treeNode);
            return that.callCustomCallbackEvent("beforeRightClick", undefined, treeId, treeNode);
        }


        function on_asyncError(event, treeId, treeNode, _XMLHttpRequest, textStatus, errorThrown) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onAsyncError", treeId, treeNode, event, {
                XMLHttpRequest: _XMLHttpRequest,
                textStatus: textStatus,
                errorThrown: errorThrown
            });
            that.callCustomCallbackEvent("onAsyncError", event, treeId, treeNode, _XMLHttpRequest, textStatus, errorThrown);
        }

        function on_asyncSuccess(event, treeId, treeNode, msg) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onAsyncSuccess", treeId, treeNode, event, {msg: msg});
            that.callCustomCallbackEvent("onAsyncSuccess", event, treeId, treeNode, msg);
        }

        function on_check(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onCheck", treeId, treeNode, event);
            that.callCustomCallbackEvent("onCheck", event, treeId, treeNode);
        }

        function on_click(event, treeId, treeNode, clickFlag) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onClick", treeId, treeNode, event, {clickFlag: clickFlag});
            that.callCustomCallbackEvent("onClick", event, treeId, treeNode, clickFlag);
        }

        function on_collapse(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onCollapse", treeId, treeNode, event);
            that.callCustomCallbackEvent("onCollapse", event, treeId, treeNode);
        }

        function on_dblclick(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onDblClick", treeId, treeNode, event);
            that.callCustomCallbackEvent("onDblClick", event, treeId, treeNode);
        }

        function on_drag(event, treeId, treeNodes) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onDrag", treeId, treeNodes, event);
            that.callCustomCallbackEvent("onDrag", event, treeId, treeNodes);
        }

        function on_dragMove(event, treeId, treeNodes) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onDragMove", treeId, treeNodes, event);
            that.callCustomCallbackEvent("onDragMove", event, treeId, treeNodes);
        }

        function on_drop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onDrop", treeId, treeNodes, event, {targetNode: targetNode, moveType: moveType, isCopy: isCopy});
            that.callCustomCallbackEvent("onDrop", event, treeId, treeNodes, targetNode, moveType, isCopy);
        }

        function on_expand(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onExpand", treeId, treeNode, event);
            that.callCustomCallbackEvent("onExpand", event, treeId, treeNode);
        }

        function on_mouseDown(event, treeId, treeNode) {
            // event.stopPropagation();
            that.setTreeEvent.call(that, "onMouseDown", treeId, treeNode, event);
            that.callCustomCallbackEvent("onMouseDown", event, treeId, treeNode);
        }

        function on_mouseUp(event, treeId, treeNode) {
            // event.stopPropagation();
            that.setTreeEvent.call(that, "onMouseUp", treeId, treeNode, event);
            that.callCustomCallbackEvent("onMouseUp", event, treeId, treeNode);
        }

        function on_nodeCreated(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onNodeCreated", treeId, treeNode, event);
            that.callCustomCallbackEvent("onNodeCreated", event, treeId, treeNode);
        }

        function on_remove(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onRemove", treeId, treeNode, event);
            that.callCustomCallbackEvent("onRemove", event, treeId, treeNode);
        }

        function on_rename(event, treeId, treeNode, isCancel) {
            that.setTreeEvent.call(that, "onRename", treeId, treeNode, event, {isCancel: isCancel});
            that.callCustomCallbackEvent("onRename", event, treeId, treeNode, isCancel);
        }

        function on_rightClick(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onRightClick", treeId, treeNode, event);
            that.callCustomCallbackEvent("onRightClick", event, treeId, treeNode);
        }

        return setObj;
    }

    public setTreeEvent(type: string, treeId: string, treeNodes: object, event?: Event, extraInfo?: object) {
        let treeEventData = new TreeEventData();
        treeEventData.event = event;
        treeEventData.treeId = treeId;
        treeEventData.treeNodes = treeNodes;
        treeEventData.extraInfo = extraInfo;
        this[type].emit(treeEventData);
    }

}

@NgModule({
    imports: [],
    declarations: [JigsawTreeExt],
    exports: [JigsawTreeExt]
})
export class JigsawTreeExtModule {
}
