import {Component, ViewChild} from '@angular/core';

import {RdkTooltipDialog, TooltipBase} from "../../../../../../component/tooltip/tooltip";

@Component({
    templateUrl: 'use-tooltip.html',
    styleUrls: ['use-tooltip.scss']
})
export class UseTooltipComponent extends TooltipBase{
    @ViewChild(RdkTooltipDialog) public tooltip: RdkTooltipDialog;

}

