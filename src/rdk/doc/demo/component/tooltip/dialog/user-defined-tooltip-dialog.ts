import {Component, ViewChild} from '@angular/core';

import {RdkTooltipDialog, TooltipBase} from "../../../../../component/tooltip/tooltip";

@Component({
    templateUrl: 'user-defined-tooltip-dialog.html',
})
export class UserTooltipDialogComponent extends TooltipBase{
    @ViewChild(RdkTooltipDialog) public tooltip: RdkTooltipDialog;

}

