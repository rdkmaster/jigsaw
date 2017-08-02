import {Component} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";

/*
 * 泳道流程图
 * */
@Component({
    template: `<div class="lane-box">
        <p>{{cellData.signaldesc}}</p>
        <b [ngClass]="arrow"></b>
        <p>
            <span>{{cellData.fromnedesc}}</span>
            <span>{{cellData.tonedesc}}</span>
        </p>
    </div>`,
    styles: [`
        b.arrow{display: block;height: 0;border-top: 2px solid #333;position: relative}
        b.arrow:after{
            display: block;content: ' ';width: 8px; height: 8px;border-top: 1px solid #333; border-right: 1px solid #333;
            position: absolute;
        }
        b.left-arrow:after{top: -5px;transform: rotate(225deg);}
        b.right-arrow:after{top: -5px;right: 0;transform: rotate(45deg);}
    `]
})
export class TableSwimLaneCell extends TableCellRenderer {
    arrow = {
        'arrow': true,
        'left-arrow': true,
        'right-arrow': false
    }
}



