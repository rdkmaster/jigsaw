export interface ZTreeSettingAsync {
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
export interface ZTreeSettingView {
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


export interface ZTreeSettingDataKey {
    children?: string;
    name?: string;
    title?: string;
    url?: string;
    icon?: string;
}
export interface ZTreeSettingDataKeep {
    parent?: boolean;
    leaf?: boolean;
}
export interface ZTreeSettingDataSimpleData {
    enable?: boolean;
    idKey?: string;
    pIdKey?: string;
    rootPId?: string | number;
}
export interface ZTreeSettingData {
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
export interface ZTreeSettingCheck {
    autoCheckTrigger?: boolean;
    chkBoxType?: JSON;
    chkStyle?: ZTreeSettingCheckStyle;
    enable?: boolean;
    nocheckInherit?: boolean;
    chkDisabledInherit?: boolean;
    radioType?: ZTreeSettingCheckRadioType;
}

export interface ZTreeSettingCallback {
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

export interface ZTreeSettingEditDrag {
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
export interface ZTreeSettingEdit {
    drag?: ZTreeSettingEditDrag;
    editNameSelectAll?: boolean;
    enable?: boolean;
    removeTitle?: string | Function;
    renameTitle?: string | Function;
    showRemoveBtn?: boolean | Function;
    showRenameBtn?: boolean | Function;
}

export interface ZTreeSettingSetting {
    async ?: ZTreeSettingAsync;
    callback?: ZTreeSettingCallback;
    check?: ZTreeSettingCheck;
    data?: ZTreeSettingData;
    edit?: ZTreeSettingEdit;
    view?: ZTreeSettingView;
}
