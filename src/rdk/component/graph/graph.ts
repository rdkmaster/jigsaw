/**
 * Created by 10177553 on 2017/3/23.
 */
import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
    Renderer2, SimpleChanges
} from "@angular/core";
import {AbstractGraphData} from "../../core/data/graph-data";

import * as echarts from "echarts";
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractRDKComponent} from "../core";
import {EchartOptions} from "../../core/data/echart-types";
import {CallbackRemoval} from "../../core/data/component-data";

@Component({
    selector: 'rdk-graph',
    templateUrl: 'graph.html',
    styleUrls: ['./graph.scss'],
    host: {
        "[style.width]": "width",
        "[style.height]": "height"
    }
})
export class RdkGraph extends AbstractRDKComponent implements OnInit, OnDestroy {
    // 全局 echarts 对象
    public static echarts: any = echarts;

    public dataValid: boolean = false;

    // 由数据服务提供的数据.
    private _data: AbstractGraphData;

    // 通过 echarts.init 创建的实例
    private _graph: any;

    @Input()
    public get data(): AbstractGraphData {
        return this._data;
    }

    private _removeRefreshCallback: CallbackRemoval;

    public set data(value: AbstractGraphData) {
        if (!value) return;
        this._data = value;

        const opt = value.options;
        if (opt instanceof Promise) {
            this.setPromiseOption(opt);
        } else {
            this.setOption(opt);
        }

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = value.onRefresh(() => {
            this.setOption(value.options);
        });
    }

    constructor(private _elf: ElementRef, private _renderer: Renderer2) {
        super();
    }

    /**
     * 判断对象是否为空
     * @param obj
     */
    private _isOptionsValid(obj): boolean {
        return !CommonUtils.isEmptyObject(obj);
    }

    ngOnInit() {
        const container = this._elf.nativeElement.querySelector(".rdk-graph");
        this._renderer.setStyle(container, 'width', this._width);
        this._renderer.setStyle(container, 'height', this._height);
        this._graph = echarts.init(container);

        if (this.data) this.setOption(this.data.options);
    }

    // 组件销毁, 注销实例
    ngOnDestroy() {
        RdkGraph.echarts.dispose();
    }

    // 注册封装的echarts事件.
    private _registerEvent() {
        for (let index in this._eventArr) {
            this._graph.on(this._eventArr[index], params => this._handleEvent(params, this._eventArr[index]));
        }
    }

    private _handleEvent(params: any, eventType?: string) {
        // 防止和ng2 事件冲突，响应两遍.
        event.preventDefault();
        event.stopPropagation();

        this[eventType].emit(params);
    }

    /* ********************** echarts api 封装区 start  ******************************** */
    public registerMap(mapName: string, geoJson: Object, specialAreas?: Object): void {
        RdkGraph.echarts.registerMap(mapName, geoJson, specialAreas);
    }

    public getMapMap(mapName: string): Object {
        return RdkGraph.echarts.getMap(mapName);
    }

    public registerTheme(themeName: string, theme: Object): void {
        RdkGraph.echarts.registerMap(themeName, theme);
    }

    public setOption(option: EchartOptions, lazyUpdate?: boolean) {
        if (!this._graph) {
            return;
        }
        if (!this._isOptionsValid(option)) {
            this.dataValid = false;
            return;
        }
        this.dataValid = true;

        console.info(option);
        this._graph.setOption(option, true, lazyUpdate);
        this._registerEvent();
    }

    protected setPromiseOption(optionPromise: Promise<EchartOptions>, lazyUpdate?: boolean):void {
        optionPromise.then(options => {
            this.setOption(options, lazyUpdate);
        }, rejectReason => {
            this.dataValid = false;
        });
    }

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        console.log(value);
        const match = value ? value.match(/^\s*(\d+)(%|px)\s*$/) : null;

        if (match && match[2] == '%') {
            this._width = parseInt(match[1]) / 100 * this._elf.nativeElement.offsetWidth + 'px';
        } else {
            this._width = value + 'px';
        }

        if (this._graph) {
            this._graph.resize({width: this._width, silent: true});
        }
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        const match = value ? value.match(/^\s*(\d+)(%|px)\s*$/) : null;

        if (match && match[2] == '%') {
            this._height = parseInt(match[1]) / 100 * this._elf.nativeElement.offsetHeight + 'px';
        } else {
            this._height = value + 'px';
        }

        if (this._graph) {
            this._graph.resize({height: this._height, silent: true});
        }
    }

    public resize(opts?: {
                      width?: number | string,
                      height?: number | string,
                      silent?: boolean
                  }): void {
        this._graph.resize(opts);
    }

    public dispatchAction(payload: Object): void {
        this._graph.dispatchAction(payload);
    }

    public on(eventName: string, handler: Function, context?: Object): void {
        this._graph.on(eventName, handler, context);
    }

    public off(eventName: string, handler?: Function): void {
        this._graph.off(eventName, handler);
    }

    public showLoading(type?: string, opts?: Object): void {
        this._graph.showLoading(type, opts);
    }

    public hideLoading(): void {
        this._graph.hideLoading();
    }

    public clear(): void {
        this._graph.clear();
    }

    public isDisposed(): boolean {
        return this._graph.isDisposed();
    }

    public dispose(): void {
        this._graph.dispose();
    }

    /* ********************** echarts api 封装区 end  ******************************** */

    /* *************** 事件声明 start ***************************** */
    // 1. 像饼图的事件等放到对应的组件中
    private _eventArr = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout',
        'globalout', 'contextmenu', 'legendselectchanged', 'legendselected', 'legendunselected',
        'datazoom', 'datarangeselected', 'timelinechanged', 'timelineplaychanged', 'restore',
        'dataviewchanged', 'magictypechanged', 'geoselectchanged', 'geoselected', 'geounselected',
        'pieselectchanged', 'pieselected', 'pieunselected', 'mapselectchanged', 'mapselected',
        'brush', 'brushselected'];

    // **************** 鼠标事件 start
    @Output()
    public click = new EventEmitter<any>();

    @Output()
    public dblclick = new EventEmitter<any>();

    @Output()
    public mousedown = new EventEmitter<any>();

    @Output()
    public mouseup = new EventEmitter<any>();

    @Output()
    public mouseover = new EventEmitter<any>();

    @Output()
    public mouseout = new EventEmitter<any>();

    @Output()
    public globalout = new EventEmitter<any>();

    @Output()
    public contextmenu = new EventEmitter<any>();
    // **************** 鼠标事件 end

    @Output()
    public legendselectchanged = new EventEmitter<any>();

    @Output()
    public legendselected = new EventEmitter<any>();

    @Output()
    public legendunselected = new EventEmitter<any>();

    @Output()
    public datazoom = new EventEmitter<any>();
    @Output()
    public datarangeselected = new EventEmitter<any>();
    @Output()
    public timelinechanged = new EventEmitter<any>();
    @Output()
    public timelineplaychanged = new EventEmitter<any>();
    @Output()
    public restore = new EventEmitter<any>();
    // 工具栏
    @Output()
    public dataviewchanged = new EventEmitter<any>();
    @Output()
    public magictypechanged = new EventEmitter<any>();
    // 地图
    @Output()
    public geoselectchanged = new EventEmitter<any>();
    @Output()
    public geoselected = new EventEmitter<any>();
    @Output()
    public geounselected = new EventEmitter<any>();
    // 饼图
    @Output()
    public pieselectchanged = new EventEmitter<any>();
    @Output()
    public pieselected = new EventEmitter<any>();
    @Output()
    public pieunselected = new EventEmitter<any>();
    // 地图:
    @Output()
    public mapselectchanged = new EventEmitter<any>();
    @Output()
    public mapselected = new EventEmitter<any>();
    @Output()
    public mapunselected = new EventEmitter<any>();
    // 平行坐标轴
    @Output()
    public axisareaselected = new EventEmitter<any>();
    // basic
    @Output()
    public focusNodeAdjacency = new EventEmitter<any>();
    @Output()
    public unfocusNodeAdjacency = new EventEmitter<any>();

    // 区域选择
    @Output()
    public brush = new EventEmitter<any>();
    @Output()
    public brushselected = new EventEmitter<any>();

    /* *************** 事件声明 end ***************************** */
}
