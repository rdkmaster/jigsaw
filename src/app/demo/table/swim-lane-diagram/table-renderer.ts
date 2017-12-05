import {Component} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";

/*
 * 泳道流程图
 * */
@Component({
    template: `
        <div *ngIf="cellData.haveSignal" class="lane-box">
            <p class="signal-desc" (mouseover)="hover=true" (mouseleave)="hover=false">{{cellData.signaldesc}}</p>
            <b class="arrow {{getArrowDirect()}}-arrow"></b>
            <p class="from-to">
                <span class="{{getArrowDirect()==='right' ? 'right' : 'left'}}" (mouseover)="fromNeHover=true"
                      (mouseleave)="fromNeHover=false">{{cellData.fromnedesc}}</span>
                <span class="{{getArrowDirect()==='right' ? 'left' : 'right'}}" (mouseover)="toNeHover=true"
                      (mouseleave)="toNeHover=false">{{cellData.tonedesc}}</span>
            </p>
            <i *ngIf="cellData.usetime" class="use-time {{getArrowDirect()}}">+{{cellData.usetime}}ms</i>
        </div>
        <div *ngIf="cellData&&hover" class="signal-desc-title">{{cellData.signaldesc}}</div>
        <div *ngIf="cellData&&fromNeHover" class="ne-desc-title {{getArrowDirect()==='right' ? 'right' : 'left'}}">
            {{cellData.fromneip}}<br/>{{cellData.fromnedesc}}
        </div>
        <div *ngIf="cellData&&toNeHover" class="ne-desc-title {{getArrowDirect()==='right' ? 'left' : 'right'}}">
            {{cellData.toneip}}<br/>{{cellData.tonedesc}}
        </div>
        <div *ngIf="!cellData.haveSignal&&cellData.isDashed" class="dashed-line"></div>
    `,
    styleUrls: ['./table-renderer.css']
})
export class TableSwimLaneCell extends TableCellRendererBase {
    hover: boolean;
    fromNeHover: boolean;
    toNeHover: boolean;

    getArrowDirect() {
        const fromNeIndex = this.cellData.neList.findIndex(ne => ne.desc === this.cellData.fromnedesc);
        const toNeIndex = this.cellData.neList.findIndex(ne => ne.desc === this.cellData.tonedesc);
        return fromNeIndex - toNeIndex < 0 ? 'left' : 'right';
    }
}



