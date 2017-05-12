import {Component, ViewChild} from '@angular/core';

import {RdkTooltip, TooltipBase} from "../../../../../../component/tooltip/tooltip";

@Component({
    templateUrl: 'use-tooltip.html',
    styleUrls: ['use-tooltip.scss']
})
export class UseTooltipComponent extends TooltipBase{
    @ViewChild(RdkTooltip) public tooltip: RdkTooltip;

}

