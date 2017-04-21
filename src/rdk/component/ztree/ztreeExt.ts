import {Input, OnDestroy, OnInit, AfterViewInit, Output, EventEmitter, NgModule, Component} from '@angular/core';
import {AbstractRDKComponent} from "rdk/component/core";
import {CommonUtils} from "rdk/core/utils/common-utils";

export class TreeData {
    [index: string]: any;
    label: string;
    nodes?: TreeData[];
}
export class TreeEventData {
    event?: Event;
    treeId: string;
    treeNode: object;
    extraInfo: object;
}
@Component({
    selector: 'rdk-tree-ext',
    template: `
        <div [id]="uniqueId" class="ztree"></div>`
})
export class RdkTreeExt extends AbstractRDKComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor() {
        super();
        this.uniqueId = CommonUtils.createUniqueId();
    }

    public uniqueId: string = '__unique_id__';

    public _setting: object;
    @Input()
    public get setting(): object {
        return this._setting;
    }

    public set setting(setting: object) {
        this._setting = setting==null || CommonUtils.isEmptyObject(setting) ? this._defaultSetting() : setting;
        this._updateTree();
    }

    public _data: object[] = [];
    @Input()
    public get data(): object[] {
        return this._data;
    }

    public set data(data: object[]) {
        this._data = data;
        this._updateTree();
    }

    public nodeField: string = 'nodes';
    public labelField: string = 'label';
    public checkable: boolean = false;
    public editable: boolean = false;

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

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._updateTree();
    }

    ngOnDestroy() {
        $.fn.zTree.destroy();
    }

    private _updateTree() {
        if (!this._setting || !this._data) return;
        $.fn.zTree.init($('#' + this.uniqueId), this._setting, this._data);
    }

    private _defaultSetting() {
        let that = this;
        var setObj = {
            data: {
                key: {
                    children: that.nodeField || 'nodes',
                    name: that.labelField || 'label'
                }
            },
            check: {
                enable: that.checkable || true
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
                enable: that.editable || true,
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

        //todo ztree before_rename事件的isCancel属性传不出来
        function before_rename(treeId, treeNode, newName, isCancel) {
            let extraInfo = {"newName": newName, "isCancel": isCancel};
            that.setTreeEvent.call(that, "beforeRename", treeId, treeNode, undefined, extraInfo);
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
    declarations: [RdkTreeExt],
    exports: [RdkTreeExt]
})
export class RdkTreeExtModule {
}
