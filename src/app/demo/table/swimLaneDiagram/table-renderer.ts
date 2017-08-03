import {Component} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";

/*
 * 泳道流程图
 * */
@Component({
    template: `
        <div *ngIf="cellData" class="lane-box">
            <p class="signal-desc">{{cellData.signaldesc}}</p>
            <b class="arrow {{getArrowDirect()}}-arrow"></b>
            <p class="from-to">
                <span>{{cellData.fromnedesc}}</span>
                <span>{{cellData.tonedesc}}</span>
            </p>
            <i *ngIf="cellData.usetime" class="use-time {{getArrowDirect()}}">+{{cellData.usetime}}ms</i>
        </div>
        <div *ngIf="!cellData" class="dashed-line"></div>
    `,
    styleUrls: ['./table-renderer.scss']
})
export class TableSwimLaneCell extends TableCellRenderer {
    getArrowDirect(){
        const fromNeIndex = this.cellData.neList.findIndex(ne => ne.desc === this.cellData.fromnedesc);
        const toNeIndex = this.cellData.neList.findIndex(ne => ne.desc === this.cellData.tonedesc);
        return fromNeIndex - toNeIndex < 0 ? 'left' : 'right';
    }
}



