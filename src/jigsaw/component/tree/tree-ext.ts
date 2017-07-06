import {Input, OnDestroy, AfterViewInit, Output, EventEmitter, NgModule, Component} from '@angular/core';
import {AbstractJigsawComponent} from "../core";
import {InternalUtils} from "../../core/utils/internal-utils";
import {CommonUtils} from "../../core/utils/common-utils";
import {ZTreeSettingSetting} from "./ztree-types";
import {TreeData} from "../../core/data/tree-data";
import {CallbackRemoval} from "../../core/data/component-data";

export class TreeEventData {
    treeId: string;
    treeNode: object;
    event?: Event;
    extraInfo?: object;
}


@Component({
    selector: 'jigsaw-tree-ext',
    template: `
        <div [id]="uniqueId" class="ztree"></div>`
})
export class JigsawTreeExt extends AbstractJigsawComponent implements AfterViewInit, OnDestroy {
    constructor() {
        super();
        this.uniqueId = InternalUtils.createUniqueId();
    }

    public uniqueId: string = '__unique_id__';

    public _setting: ZTreeSettingSetting = this._defaultSetting();
    @Input()
    public get setting(): ZTreeSettingSetting {
        return this._setting;
    }

    public set setting(setting: ZTreeSettingSetting) {
        this._setting = setting == null || CommonUtils.isEmptyObject(setting) ? this._defaultSetting() : setting;
        this._updateTree();
    }

    private _removeRefreshCallback: CallbackRemoval;
    public _data: TreeData;
    @Input()
    public get data(): TreeData {
        return this._data;
    }

    public set data(data: TreeData) {
        this._data = data;
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = data.onRefresh(() => {
            this._updateTree();
        });
    }

    @Output()
    public onClick = new EventEmitter<TreeEventData>();
    @Output()
    public onDblClick = new EventEmitter<TreeEventData>();
    @Output()
    public onCheck = new EventEmitter<TreeEventData>();
    @Output()
    public onRename = new EventEmitter<TreeEventData>();
    @Output()
    public beforeDrag = new EventEmitter<TreeEventData>();
    @Output()
    public beforeRename = new EventEmitter<TreeEventData>();
    @Output()
    public beforeRemove = new EventEmitter<TreeEventData>();
    @Output()
    public beforeCollapse = new EventEmitter<TreeEventData>();
    @Output()
    public beforeExpand = new EventEmitter<TreeEventData>();
    @Output()
    public beforeEditName = new EventEmitter<TreeEventData>();


    ngAfterViewInit() {
        this._updateTree();
    }

    ngOnDestroy() {
        $.fn.zTree.destroy();
    }

    private _updateTree() {
        if (!this._setting || !this._data) return;
        $.fn.zTree.init($('#' + this.uniqueId), this._setting, this._data.nodes);
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
                onClick: on_click,
                onDblClick: on_dblclick,
                onCheck: on_check,
                onRename: on_rename,
                beforeDrag: before_drag,
                beforeRename: before_rename,
                beforeRemove: before_remove,
                beforeCollapse: before_collapse,
                beforeExpand: before_expand,
                beforeEditName: before_editName
            },
            edit: {
                enable: true,
                removeTitle: '',
                renameTitle: ''
            },
            view: {
                fontCss: null,
                showLine: false
            }
        };

        function on_click(event, treeId, treeNode) {
            event.stopPropagation();
            that.setTreeEvent.call(that, "onClick", treeId, treeNode, event);
        }

        function on_dblclick(event, treeId, treeNode) {
            that.setTreeEvent.call(that, "onDblClick", treeId, treeNode, event);
        }

        function on_check(event, treeId, treeNode) {
            that.setTreeEvent.call(that, "onCheck", treeId, treeNode, event);
        }

        function on_rename(event, treeId, treeNode) {
            that.setTreeEvent.call(that, "onRename", treeId, treeNode, event);
        }

        function before_expand(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeExpand", treeId, treeNode);
        }

        function before_collapse(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeCollapse", treeId, treeNode);
        }

        //todo tree before_rename事件的isCancel属性传不出来
        function before_rename(treeId, treeNode, newName, isCancel) {
            if (newName.length == 0) {
                alert("Node name can not be empty.");
                return false;
            } else {
                let extraInfo = {"newName": newName, "isCancel": isCancel};
                that.setTreeEvent.call(that, "beforeRename", treeId, treeNode, undefined, extraInfo);
                return true;
            }

        }

        function before_remove(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeRemove", treeId, treeNode);
        }

        function before_editName(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeEditName", treeId, treeNode);
        }

        function before_drag(treeId, treeNode) {
            that.setTreeEvent.call(that, "beforeDrag", treeId, treeNode,);
        }

        return setObj;
    }

    public setTreeEvent(type: string, treeId: string, treeNode: object, event?: Event, extraInfo?: object) {
        let treeEventData = new TreeEventData();
        treeEventData.event = event;
        treeEventData.treeId = treeId;
        treeEventData.treeNode = treeNode;
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
