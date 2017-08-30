import {Component, ViewChild} from '@angular/core';

import {JigsawTooltipDialog, TooltipBase} from "jigsaw/component/tooltip/tooltip";

@Component({
    templateUrl: 'user-defined-tooltip-dialog.html',
    styles: [`.tooltip-content{line-height: 1;font-size: 12px}
    .tooltip-content h3{margin-bottom: 8px;font-size: 14px;}
    .tooltip-content h3 span{margin-right: 5px}
    .tooltip-content p{line-height: 1.4;}`]
})
export class UserTooltipDialogComponent extends TooltipBase{
    @ViewChild(JigsawTooltipDialog) public tooltip: JigsawTooltipDialog;

}

