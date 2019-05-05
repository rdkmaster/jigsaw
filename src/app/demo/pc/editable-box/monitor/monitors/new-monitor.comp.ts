import {Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DialogBase, JigsawDialog} from "jigsaw/pc-components/dialog/dialog";
import {PopupService} from "jigsaw/common/service/popup.service";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";
import {MonitorService} from "./monitor-service";

@Component({
    template: `
        <jigsaw-dialog width="600px" (close)="dispose()">
            <div jigsaw-title>
                <span class="fa fa-desktop"></span> 构建图表
            </div>
            <div jigsaw-body style="margin: 6px">
                <div>
                    <span>图表名称</span>
                    <jigsaw-input [(value)]="name" width="355px" placeholder="输入名称"></jigsaw-input>
                    <span style="margin-left: 2px;">图表类型</span>
                    <jigsaw-select [(value)]="type" [data]="[{label: '折线图', value: 'line'}, {label: '柱状图', value: 'bar'}]">
                    </jigsaw-select>
                </div>
                <div style="height:380px; margin-top:6px;">
                    <p style="display:inline-block; height: 100%; vertical-align: top">选择指标</p>
                    <jigsaw-list height="100%" width="150px" trackItemBy="regionname"
                                 (selectedItemsChange)="onRegionSelected($event)">
                        <jigsaw-list-option *ngFor="let region of regions" [value]="region">
                            {{region.regionname}}
                        </jigsaw-list-option>
                    </jigsaw-list>
                    <jigsaw-list height="100%" width="200px" [multipleSelect]="true" trackItemBy="indicatorid"
                                 [(selectedItems)]="selectedKPIs" (selectedItemsChange)="checkKPI()">
                        <jigsaw-list-option *ngFor="let kpi of selectedRegion?.series" [value]="kpi">
                            {{kpi.indicatorname}}
                        </jigsaw-list-option>
                    </jigsaw-list>
                    <div class="kpi-box">
                        <jigsaw-tag [closable]="true" *ngFor="let kpi of selectedKPIs" (close)="removeKPI(kpi)">
                            {{kpi.regionname + ' - ' + kpi.indicatorname}}
                        </jigsaw-tag>
                    </div>
                </div>
            </div>
            <div jigsaw-button-bar>
                <span style="color: red;" *ngIf="hasError">请至少选中一个KPI！</span>
                <jigsaw-button colorType="primary" (click)="createNewChart()">
                    确定
                </jigsaw-button>
                <jigsaw-button (click)="dispose()">
                    取消
                </jigsaw-button>
            </div>
        </jigsaw-dialog>
    `,
    styles: [`
        jigsaw-list {
            vertical-align: top;
        }

        jigsaw-tag {
            display: block;
            margin: 6px;
        }

        .kpi-box {
            display: inline-block;
            width: 177px;
            height: 100%;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            transition: 0.7s;
        }

        .kpi-error {
            border: 1px solid red;
        }
    `]
})
export class NewChartPanel extends DialogBase {
    constructor(private _ms: MonitorService, private _ps: PopupService,
                private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    @ViewChild(JigsawDialog) dialog: JigsawDialog;
    name: string = '';
    type: any = {label: '折线图', value: 'line'};

    hasError = false;

    selectedKPIs: ArrayCollection<any>;
    selectedRegion: any;

    get regions(): any[] {
        const indicators = this._ms.indicators;
        if (!indicators) {
            return;
        }
        if (indicators instanceof Observable) {
            indicators.subscribe(data => this._ms.indicators = data);
        } else {
            return indicators;
        }
    }

    set regions(v: any[]) {
        this._ms.indicators = v;
    }

    onRegionSelected(region) {
        this.selectedRegion = region[0];
    }

    removeKPI(kpi) {
        const idx = this.selectedKPIs.indexOf(kpi);
        if (idx == -1) {
            console.error(`kpi[id=${kpi.indicators}] not found!`);
            return;
        }
        this.selectedKPIs.splice(idx, 1);
        this.selectedKPIs.refresh();

        this.checkKPI();
    }

    createNewChart() {
        if (this.checkKPI()) {
            this.dispose();
            this._ms.createIndicator(this.name, this.type.value, this.selectedKPIs);
        }
    }

    checkKPI() {
        const ele = this._elementRef.nativeElement.querySelector('.kpi-box');
        if (!this.selectedKPIs || this.selectedKPIs.length == 0) {
            this._renderer.addClass(ele, 'kpi-error');
            this.hasError = true;
        } else {
            this._renderer.removeClass(ele, 'kpi-error');
            this.hasError = false;
        }
        return !this.hasError;
    }
}

@Component({
    selector: 'new-monitor',
    template: '<p><span (click)="onClick()">+</span></p>',
    styles: [`
        p {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        span {
            font-size: 50px;
            cursor: pointer;
        }
    `]
})
export class NewMonitorComponent {
    constructor(private _ps: PopupService) {
    }

    onClick() {
        this._ps.popup(NewChartPanel);
    }
}
