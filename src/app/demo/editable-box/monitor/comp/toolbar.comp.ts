import {Component, EventEmitter, Input, Output, Type} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/common/service/popup.service";
import {MonitorService} from "../monitors/monitor-service";

@Component({
    selector: 'jx-toolbar',
    template: `
        <div class="wrapper" *ngIf="visible">
            <div class="toolbar">
                <span class="fa fa-times" (click)="remove.emit()" *ngIf="showRemove"></span>
                <span class="fa fa-compress" (click)="compress()" *ngIf="expanded"></span>
                <span class="fa fa-expand" (click)="expand()" *ngIf="!expanded"></span>
            </div>
        </div>
    `,
    styles: [`
        .wrapper {
            position: relative;
        }

        .toolbar {
            margin-left: -2px;
            width: 100%;
            position: absolute;
            color: #fff;
            left: 0;
            top: 0;
            font-size: 20px;
            z-index: 11;
            cursor: pointer;
            background-color: cornflowerblue;
            opacity: 0.8;
        }

        span {
            margin-left: 12px;
        }
    `]
})
export class ToolbarComp {
    constructor(private _ps: PopupService, private _ms: MonitorService) {
    }

    public popupInfo: PopupInfo;
    public expanded = false;

    @Input() data: any;
    @Input() visible = true;
    @Input() component: () => Type<any>;
    @Input() showRemove = true;
    @Input() chartId = 0;

    @Output() remove = new EventEmitter<any>();

    expand() {

        if (this.popupInfo) {
            this.popupInfo.dispose();
        }
        this.popupInfo = this._ps.popup(this.component(), {size: {width: '99%', height: '99%'}, modal: true});
        this.popupInfo.instance.data = this.data;

        // 这里有点小绕，要注意全屏出来的监控组件和在宫格里的组件不是同一个实例，这也就导致里他们的toolbar对象也不是同一个
        // 理解了这一点，下面的赋值就好理解了
        this.popupInfo.instance.toolbar.popupInfo = this.popupInfo;
        this.popupInfo.instance.toolbar.expanded = true;
        this.popupInfo.instance.toolbar.showRemove = false;
        this.popupInfo.instance.chartId = this.chartId;

        this._ms.events.emit({
            type: 'toggle-full-screen', frozen: true, chartId: this.chartId, component: this.popupInfo.instance
        });
    }

    compress() {
        this._ms.events.emit({type: 'toggle-full-screen', frozen: false});
        if (this.popupInfo) {
            this.popupInfo.dispose();
            this.popupInfo = null;
        }
    }
}
