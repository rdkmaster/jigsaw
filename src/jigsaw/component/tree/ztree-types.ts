export class ZTreeSettingAsync {
    enable?: boolean;
    contentType?: string;
    type?: string;
    dataType?: string;
    url?: string | Function;
    autoParam?: string[] | object;
    otherParam?: string[] | object;
    dataFilter?: Function;
}


export enum ZTreeSettingViewSpeedLevel{
    slow, normal, fast
}
export class ZTreeSettingView {
    addDiyDom?: Function;
    autoCancelSelected?: boolean;
    dblClickExpand?: boolean;
    expandSpeed?: ZTreeSettingViewSpeedLevel;
    fontCss?: object;
    nameIsHTML?: boolean;
    selectedMulti?: boolean;
    showIcon?: boolean;
    showLine?: boolean;
    showTitle?: boolean;
    txtSelectedEnable?: boolean;
}


export class ZTreeSettingDataKey {
    children?: string;
    name?: string;
    title?: string;
    url?: string;
    icon?: string;
}
export class ZTreeSettingDataKeep {
    parent?: boolean;
    leaf?: boolean;
}
export class ZTreeSettingDataSimpleData {
    enable?: boolean;
    idKey?: string;
    pIdKey?: string;
    rootPId?: string | number;
}
export class ZTreeSettingData {
    key?: ZTreeSettingDataKey;
    simpleData?: ZTreeSettingDataSimpleData;
    keep?: ZTreeSettingDataKeep;
}


export enum ZTreeSettingCheckStyle{
    checkbox, radio
}
export enum ZTreeSettingCheckRadioType{
    level, all
}
export class ZTreeSettingCheck {
    autoCheckTrigger?: boolean;
    chkBoxType?: JSON;
    chkStyle?: ZTreeSettingCheckStyle;
    enable?: boolean;
    nocheckInherit?: boolean;
    chkDisabledInherit?: boolean;
    radioType?: ZTreeSettingCheckRadioType;

}


export class ZTreeSettingCallback {
    beforeAsync?: Function;
    beforeCheck?: Function;
    beforeClick?: Function;
    beforeCollapse?: Function;
    beforeDblClick?: Function;
    beforeDrag?: Function;
    beforeDragOpen?: Function;
    beforeDrop?: Function;
    beforeEditName?: Function;
    beforeExpand?: Function;
    beforeMouseDown?: Function;
    beforeMouseUp?: Function;
    beforeRemove?: Function;
    beforeRename?: Function;
    beforeRightClick?: Function;

    onAsyncError?: Function;
    onAsyncSuccess?: Function;
    onCheck?: Function;
    onClick?: Function;
    onCollapse?: Function;
    onDblClick?: Function;
    onDrag?: Function;
    onDragMove?: Function;
    onDrop?: Function;
    onExpand?: Function;
    onMouseDown?: Function;
    onMouseUp?: Function;
    onNodeCreated?: Function;
    onRemove?: Function;
    onRename?: Function;
    onRightClick?: Function;


}

export class ZTreeSettingEditDrag {
    autoExpandTrigger?: boolean;
    isCopy?: boolean;
    isMove?: boolean;
    prev?: boolean;
    next?: boolean;
    inner?: boolean;
    borderMax?: number;
    borderMin?: number;
    minMoveSize?: number;
    maxShowNodeNum?: number;
    autoOpenTime?: number;
}
export class ZTreeSettingEdit {
    drag?: ZTreeSettingEditDrag;
    editNameSelectAll?: boolean;
    enable?: boolean;
    removeTitle?: string | Function;
    renameTitle?: string | Function;
    showRemoveBtn?: boolean | Function;
    showRenameBtn?: boolean | Function;
}


export class ZTreeSettingSetting {
    async ?: ZTreeSettingAsync;
    callback?: ZTreeSettingCallback;
    check?: ZTreeSettingCheck;
    data?: ZTreeSettingData;
    edit?: ZTreeSettingEdit;
    view?: ZTreeSettingView;
}
