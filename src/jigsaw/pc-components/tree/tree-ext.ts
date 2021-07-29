import {AfterViewInit, Component, EventEmitter, Input, NgModule, OnDestroy, Output, ChangeDetectionStrategy} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ZTreeSettings, ZTreeIconSuit, IconTransformer} from "./ztree-types";
import {SimpleTreeData, TreeData} from "../../common/core/data/tree-data";

declare const $;

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
    private _customCallback;
    private _setting: ZTreeSettings = this._defaultSetting();
    private _removeRefreshCallback: CallbackRemoval;

    /**
     * @internal
     */
    public _$uniqueId: string = InternalUtils.createUniqueId();
    public ztree: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get setting(): ZTreeSettings {
        return this._setting;
    }

    public set setting(setting: ZTreeSettings) {
        if (!CommonUtils.isDefined(setting) || CommonUtils.isEmptyObject(setting)) {
            this._setting = this._defaultSetting();
        } else {
            this._customCallback = setting.callback;
            setting.callback = this._defaultSetting().callback;
            this._setting = setting;
        }
        this._updateTree();
    }

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

    /**
     * 这个函数用于将一个图标class转为对应的unicode值，目前的动态图标的实现只支持unicode，因此如果应用需要提供其他来源的图标，则必须覆盖此函数
     * 自行实现图标与unicode的映射关系。此函数默认支持两个风格图标的转换：
     * - iconfont风格的class名，比如iconfont-e5e2
     * - 不转换，即当给定的图标非iconfont风格的时候，这个函数认为图标的值即为unicode的值
     * @param icon
     * @NoMarkForCheckRequired
     * $demo = tree/icon
     */
    @Input()
    public iconTransformer: IconTransformer = (icon: string): string => {
        const match = (icon || '').match(/^\s*iconfont-(\w{4})\s*$/);
        return match ? match[1] : icon;
    }

    private _iconSuit: ZTreeIconSuit = {
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
    public get iconSuit(): ZTreeIconSuit {
        return this._iconSuit;
    }

    public set iconSuit(data: ZTreeIconSuit) {
        if (!data) {
            return;
        }
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this._iconSuit[key] = this.iconTransformer(data[key]);
            }
        }
        this._setZTreeIcon();
    }

    private _setZTreeIcon() {
        const iconData = this.iconSuit;
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
        this._setZTreeNodeIcon(sheet);
    }

    private _setZTreeNodeIcon(sheet: CSSStyleSheet) {
        const customIcon = [];
        this._getZTreeNodeIcon(this._data, customIcon);
        customIcon.filter((val, i) => customIcon.indexOf(val) === i).forEach((icon) => {
            sheet.insertRule(
                `.ztree#${this._$uniqueId} li span.button.${icon}_ico_open::after,
                .ztree#${this._$uniqueId} li span.button.${icon}_ico_close::after,
                .ztree#${this._$uniqueId} li span.button.${icon}_ico_docu::after {content: "\\${this.iconTransformer(icon)}"}`,
                sheet.cssRules.length
            );
        });
    }

    private _getZTreeNodeIcon(data: SimpleTreeData | TreeData, resArr: string[]) {
        if (!data.nodes) {
            return;
        }
        data.nodes.forEach((node: SimpleTreeData | TreeData) => {
            if (node.icon) {
                resArr.push(node.icon);
            }
            this._getZTreeNodeIcon(node, resArr);
        });
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
        this._setZTreeIcon();
    }

    ngOnDestroy() {
        this.ztree.destroy();
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
            this._removeRefreshCallback = null;
        }
    }

    private _updateTree() {
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

    private _callCustomCallbackEvent(eventName, event, ...para) {
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

        let setObj: ZTreeSettings = {
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
            that._setTreeEvent.call(that, "beforeAsync", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeAsync", undefined, treeId, treeNode);
        }

        function before_check(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeCheck", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeCheck", undefined, treeId, treeNode);
        }

        function before_click(treeId, treeNode, clickFlag) {
            that._setTreeEvent.call(that, "beforeClick", treeId, treeNode, undefined, {"clickFlag": clickFlag});
            return that._callCustomCallbackEvent("beforeClick", undefined, treeId, treeNode, clickFlag);
        }

        function before_collapse(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeCollapse", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeCollapse", undefined, treeId, treeNode);
        }

        function before_dblClick(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeDblClick", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeDblClick", undefined, treeId, treeNode);
        }

        function before_drag(treeId, treeNodes) {
            that._setTreeEvent.call(that, "beforeDrag", treeId, treeNodes);
            return that._callCustomCallbackEvent("beforeDrag", undefined, treeId, treeNodes);
        }

        function before_drag_open(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeDragOpen", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeDragOpen", undefined, treeId, treeNode);
        }

        function before_drop(treeId, treeNodes, targetNode, moveType, isCopy) {
            let extraInfo = {"targetNode": targetNode, "moveType": moveType, "isCopy": isCopy};
            that._setTreeEvent.call(that, "beforeDrop", treeId, treeNodes, undefined, extraInfo);
            return that._callCustomCallbackEvent("beforeDrop", undefined, treeId, treeNodes, targetNode, moveType, isCopy);
        }

        function before_editName(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeEditName", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeEditName", undefined, treeId, treeNode);
        }

        function before_expand(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeExpand", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeExpand", undefined, treeId, treeNode);
        }

        function before_mouseDown(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeMouseDown", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeMouseDown", undefined, treeId, treeNode);
        }

        function before_mouseUp(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeMouseUp", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeMouseUp", undefined, treeId, treeNode);
        }

        function before_remove(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeRemove", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeRemove", undefined, treeId, treeNode);
        }

        //todo tree before_rename事件的isCancel属性传不出来
        function before_rename(treeId, treeNode, newName, isCancel) {
            if (newName.length == 0) {
                alert("Node name can not be empty.");
                return false;
            } else {
                let extraInfo = {"newName": newName, "isCancel": isCancel};
                that._setTreeEvent.call(that, "beforeRename", treeId, treeNode, undefined, extraInfo);
                return that._callCustomCallbackEvent("beforeRename", undefined, treeId, treeNode, newName, isCancel);

            }

        }

        function before_rightClick(treeId, treeNode) {
            that._setTreeEvent.call(that, "beforeRightClick", treeId, treeNode);
            return that._callCustomCallbackEvent("beforeRightClick", undefined, treeId, treeNode);
        }


        function on_asyncError(event, treeId, treeNode, _XMLHttpRequest, textStatus, errorThrown) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onAsyncError", treeId, treeNode, event, {
                XMLHttpRequest: _XMLHttpRequest,
                textStatus: textStatus,
                errorThrown: errorThrown
            });
            that._callCustomCallbackEvent("onAsyncError", event, treeId, treeNode, _XMLHttpRequest, textStatus, errorThrown);
        }

        function on_asyncSuccess(event, treeId, treeNode, msg) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onAsyncSuccess", treeId, treeNode, event, {msg: msg});
            that._callCustomCallbackEvent("onAsyncSuccess", event, treeId, treeNode, msg);
        }

        function on_check(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onCheck", treeId, treeNode, event);
            that._callCustomCallbackEvent("onCheck", event, treeId, treeNode);
        }

        function on_click(event, treeId, treeNode, clickFlag) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onClick", treeId, treeNode, event, {clickFlag: clickFlag});
            that._callCustomCallbackEvent("onClick", event, treeId, treeNode, clickFlag);
        }

        function on_collapse(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onCollapse", treeId, treeNode, event);
            that._callCustomCallbackEvent("onCollapse", event, treeId, treeNode);
        }

        function on_dblclick(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onDblClick", treeId, treeNode, event);
            that._callCustomCallbackEvent("onDblClick", event, treeId, treeNode);
        }

        function on_drag(event, treeId, treeNodes) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onDrag", treeId, treeNodes, event);
            that._callCustomCallbackEvent("onDrag", event, treeId, treeNodes);
        }

        function on_dragMove(event, treeId, treeNodes) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onDragMove", treeId, treeNodes, event);
            that._callCustomCallbackEvent("onDragMove", event, treeId, treeNodes);
        }

        function on_drop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onDrop", treeId, treeNodes, event, {targetNode: targetNode, moveType: moveType, isCopy: isCopy});
            that._callCustomCallbackEvent("onDrop", event, treeId, treeNodes, targetNode, moveType, isCopy);
        }

        function on_expand(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onExpand", treeId, treeNode, event);
            that._callCustomCallbackEvent("onExpand", event, treeId, treeNode);
        }

        function on_mouseDown(event, treeId, treeNode) {
            // event.stopPropagation();
            that._setTreeEvent.call(that, "onMouseDown", treeId, treeNode, event);
            that._callCustomCallbackEvent("onMouseDown", event, treeId, treeNode);
        }

        function on_mouseUp(event, treeId, treeNode) {
            // event.stopPropagation();
            that._setTreeEvent.call(that, "onMouseUp", treeId, treeNode, event);
            that._callCustomCallbackEvent("onMouseUp", event, treeId, treeNode);
        }

        function on_nodeCreated(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onNodeCreated", treeId, treeNode, event);
            that._callCustomCallbackEvent("onNodeCreated", event, treeId, treeNode);
        }

        function on_remove(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onRemove", treeId, treeNode, event);
            that._callCustomCallbackEvent("onRemove", event, treeId, treeNode);
        }

        function on_rename(event, treeId, treeNode, isCancel) {
            that._setTreeEvent.call(that, "onRename", treeId, treeNode, event, {isCancel: isCancel});
            that._callCustomCallbackEvent("onRename", event, treeId, treeNode, isCancel);
        }

        function on_rightClick(event, treeId, treeNode) {
            event.stopPropagation();
            that._setTreeEvent.call(that, "onRightClick", treeId, treeNode, event);
            that._callCustomCallbackEvent("onRightClick", event, treeId, treeNode);
        }

        return setObj;
    }

    private _setTreeEvent(type: string, treeId: string, treeNodes: object, event?: Event, extraInfo?: object) {
        const treeEventData = new TreeEventData();
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
