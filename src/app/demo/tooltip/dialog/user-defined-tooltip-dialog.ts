import {Component, ViewChild} from '@angular/core';

import {JigsawTooltipDialog, TooltipBase} from "jigsaw/component/tooltip/tooltip";

@Component({
    templateUrl: 'user-defined-tooltip-dialog.html',
})
export class UserTooltipDialogComponent extends TooltipBase{
    @ViewChild(JigsawTooltipDialog) public tooltip: JigsawTooltipDialog;

}

