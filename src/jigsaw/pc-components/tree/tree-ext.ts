import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnDestroy, Output} from '@angular/core';
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ZTreeIconSuit, ZTreeSettings} from "./ztree-types";
import {toClassName, rxIconUrl, SimpleTreeData, TreeData} from "../../common/core/data/tree-data";

declare const $;

type IconDataItem = { content?: string, url?: string };

type IconData = {
    edit?: IconDataItem;
    remove?: IconDataItem;
    open?: IconDataItem;
    close?: IconDataItem;
    document?: IconDataItem;
    checkboxChecked?: IconDataItem;
    checkboxNotCheck?: IconDataItem;
    checkboxHalf?: IconDataItem;
    nodeOpen?: IconDataItem;
    nodeClose?: IconDataItem;
}

export class TreeEventData {
    treeId: string;
    treeNodes: object;
    event?: Event;
    extraInfo?: object;
}

@WingsTheme('tree.scss')
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
    host: {
        '[class.jigsaw-tree-host]': 'true',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-tree-large]': 'size === "large"',
        '[class.jigsaw-tree-medium]': 'size === "medium"',
        '[class.jigsaw-tree-default]': 'size === "default"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTreeExt extends AbstractJigsawComponent implements AfterViewInit, OnDestroy {
    private _customCallback;
    private _setting: ZTreeSettings = this._defaultSetting();
    private _removeRefreshCallback: CallbackRemoval;

    /**
     * @internal
     */
    public _$uniqueId: string = InternalUtils.createUniqueId('ztree-');
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
     * @NoMarkForCheckRequired
     */
    @Input()
    public size: "default" | "medium" | "large" = "default";

    private _iconSuit: ZTreeIconSuit = {
        edit: "e166",
        remove: "e179",
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
                this._iconSuit[key] = data[key];
            }
        }
        this._setZTreeIcon();
    }

    private _getStyleNodeId(): string {
        return `internal-icon@${this._$uniqueId}`;
    }

    private _setZTreeIcon() {
        const iconData: IconData = {};
        for (let key in this.iconSuit) {
            iconData[key] = rxIconUrl.test(this.iconSuit[key]) ?
                {content: "", url: this.iconSuit[key]} : {content: `\\${this.iconSuit[key]}`, url: ""};
        }

        const id = this._getStyleNodeId();
        const zTreeIconStyle = document.getElementById(id) as HTMLLinkElement;
        if (zTreeIconStyle) {
            document.head.removeChild(zTreeIconStyle);
        }
        const style = document.createElement("style");
        style.id = id;
        document.head.appendChild(style);
        const sheet = style.sheet as CSSStyleSheet;
        sheet.insertRule(`.ztree#${this._$uniqueId}#${this._$uniqueId} li span.button.edit::after {content: "${iconData.edit.content}"; background: url(${iconData.edit.url}) no-repeat center;}`, sheet.cssRules.length);
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.remove::after {content: "${iconData.remove.content}"; background: url(${iconData.remove.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_open::after {content: "${iconData.open.content}"; background: url(${iconData.open.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_close::after {content: "${iconData.close.content}"; background: url(${iconData.close.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.ico_docu::after {content: "${iconData.document.content}"; background: url(${iconData.document.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_true_full::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_true_full_focus::after {content: "${iconData.checkboxChecked.content}"; background: url(${iconData.checkboxChecked.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_false_full::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_false_full_focus::after {content: "${iconData.checkboxNotCheck.content}"; background: url(${iconData.checkboxNotCheck.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.chk.checkbox_true_part::after,
            .ztree#${this._$uniqueId} li span.button.chk.checkbox_true_part_focus::after {content: "${iconData.checkboxHalf.content}"; background: url(${iconData.checkboxHalf.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.switch.noline_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.root_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.roots_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.center_open::after,
            .ztree#${this._$uniqueId} li span.button.switch.bottom_open::after {content: "${iconData.nodeOpen.content}"; background: url(${iconData.nodeOpen.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        sheet.insertRule(
            `.ztree#${this._$uniqueId} li span.button.switch.noline_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.root_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.roots_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.center_close::after,
            .ztree#${this._$uniqueId} li span.button.switch.bottom_close::after {content: "${iconData.nodeClose.content}"; background: url(${iconData.nodeClose.url}) no-repeat center;}`,
            sheet.cssRules.length
        );
        this._setZTreeNodeIcon(sheet);
    }

    private _setZTreeNodeIcon(sheet: CSSStyleSheet) {
        const customIcon = [];
        this._getZTreeNodeIcon(this.data, customIcon);
        customIcon.filter((val, i) => customIcon.indexOf(val) === i).forEach((iconOrUrl: string) => {
            const iconClass = toClassName(iconOrUrl);
            const rule = iconClass == iconOrUrl ? `{content: "\\${iconOrUrl}"}` : // iconClass和iconOrUrl相等意味着不是url
                `{content: ""; background: url(${iconOrUrl}) no-repeat center;}`;
            sheet.insertRule(
                `.ztree#${this._$uniqueId} li span.button.${iconClass}_ico_open::after,` +
                `.ztree#${this._$uniqueId} li span.button.${iconClass}_ico_close::after,` +
                `.ztree#${this._$uniqueId} li span.button.${iconClass}_ico_docu::after ${rule}`,
                sheet.cssRules.length
            );
        });
    }

    private _getZTreeNodeIcon(data: SimpleTreeData | TreeData, resArr: string[]) {
        if (!data.nodes) {
            return;
        }
        data.nodes.forEach((node: SimpleTreeData | TreeData) => {
            if (node.iconUnicode) {
                resArr.push(node.iconUnicode);
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
        const zTreeIconStyle = document.getElementById(this._getStyleNodeId()) as HTMLLinkElement;
        if (zTreeIconStyle) {
            document.head.removeChild(zTreeIconStyle);
        }
    }

    private _updateTree() {
        if (!this._setting || !this.data || !$) {
            return;
        }
        this.ztree = $.fn.zTree.init($("#" + this._$uniqueId), this._setting, this.data.nodes);
        this._setZTreeIcon()
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

    /**
     * 根据节点label宽度设置编辑状态下input的宽度
     * @param node
     */
    private _updateInputWidth(node): void {
        const spanEl = document.getElementById(`${node.tId}_span`);
        const zTree = this;
        $(`#${node.tId}_span`).on('focus', 'input', function () {
            zTree.runAfterMicrotasks(() => {
                this.select();
                $(`#${node.tId}_span`).off('focus', 'input');
            });
        });
        const inputWidth = (spanEl.offsetWidth + 16) >= 120 ? (spanEl.offsetWidth + 16) : 120;
        document.documentElement.style.setProperty("--jigsaw-zTree-input-width", `${inputWidth}px`);
    }

    public editName(node): void {
        if (!node) {
            return;
        }
        this._updateInputWidth(node);
        this.ztree.editName(node);
    }

    public getCheckedNodes(checked: boolean) {
        if (!this.ztree) {
            return;
        }
        return this.ztree.getCheckedNodes(checked);
    }

    public updateNode(node) {
        if (!this.ztree) {
            return;
        }
        this.ztree.updateNode(node);
        this._updateTree();
    }

    public hideNode(node) {
        if (!this.ztree) {
            return;
        }
        this.ztree.hideNode(node);
    }

    public showNode(node) {
        if (!this.ztree) {
            return;
        }
        this.ztree.showNode(node);
    }

    public getNodesByParam(key, value, parentNode?): [] {
        if (!this.ztree) {
            return;
        }
        return this.ztree.getNodesByParam(key, value, parentNode);
    }

    public checkNode(node, checked, checkTypeFlag, callbackFlag?) {
        if (!this.ztree) {
            return;
        }
        this.ztree.checkNode(node, checked, checkTypeFlag, callbackFlag);
    }

    public setEditable(editable) {
        if (!this.ztree) {
            return;
        }
        this.ztree.setEditable(editable);
    }

    public checkAllNodes(checked) {
        if (!this.ztree) {
            return;
        }
        this.ztree.checkAllNodes(checked);
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
            that._updateInputWidth(treeNode);
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

    public fuzzySearch(keyword: string, field?: string);
    public fuzzySearch(keyword: string, fields?: string[]);
    public fuzzySearch(keyword: string, fields: string | string[] = 'label') {
        const rexMeta = /[\[\]\\^$.|?*+()]/g;
        this.ztree.setting.view.nameIsHTML = true;
        const nodes = this.ztree.transformToArray(this.ztree.getNodes());

        let fieldArray: string[] = typeof fields == 'string' ? [fields] : fields;
        fieldArray = fieldArray.filter((field, index) => !!field && index === fieldArray.indexOf(field));
        // reset node label
        const hasLabel = fieldArray.find(f => f == 'label');
        if (hasLabel) {
            nodes.filter(node => CommonUtils.isDefined(node?.oldname) && node?.oldname != node.label)
                .filter(node => node.label.includes('jigsaw-tree-fuzzy-search-identification'))
                .forEach(node => {
                    node.label = node.oldname;
                    this.ztree.updateNode(node);
                });
        }

        keyword = (keyword || '').trim().toLowerCase();
        if (keyword.length === 0) {
            this.ztree.showNodes(nodes);
            return;
        }

        this.ztree.hideNodes(nodes);
        fieldArray.forEach(field => {
            nodes.filter(node => CommonUtils.isDefined(node[field]) && String(node[field]).toLowerCase().indexOf(keyword) != -1)
                .forEach(node => {
                    if (field == 'label') {
                        const regKeywords = keyword.replace(rexMeta, matchStr => `\\${matchStr}`);
                        node.oldname = node[field];
                        const rexGlobal = new RegExp(regKeywords, 'gi');
                        node[field] = String(node.oldname).replace(rexGlobal, originalText =>
                            `<span class="jigsaw-tree-fuzzy-search-identification" style="background-color: var(--primary-disabled);">${originalText}</span>`);
                        this.ztree.updateNode(node);
                    }
                    this.ztree.showNode(node);

                    const path = node.getPath();
                    if (!path || path.length == 0) {
                        return;
                    }
                    for (let i = 0; i < path.length - 1; i++) {
                        this.ztree.showNode(path[i]);
                        this.ztree.expandNode(path[i], true);
                    }
                });
        });
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawTreeExt],
    exports: [JigsawTreeExt]
})
export class JigsawTreeExtModule {
}
