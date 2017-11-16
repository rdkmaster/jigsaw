/**
 * Created by 10177553 on 2017/3/23.
 */
import {
    Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    Renderer2
} from "@angular/core";
import {AbstractGraphData} from "../../core/data/graph-data";

import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawComponent} from "../common";
import {EchartOptions} from "../../core/data/echart-types";
import {CallbackRemoval} from "../../core/utils/common-utils";

/**
 * @description graph 图标组件
 * ### 封装的eCharts, 属性具体值参考eCharts 官方文档.
 * <br /> <a href="http://echarts.baidu.com/api.html#echarts" target="_blank"> eCharts 文档</a>
 */
@Component({
    selector: 'jigsaw-graph, j-graph',
    templateUrl: 'graph.html',
})
export class JigsawGraph extends AbstractJigsawComponent implements OnInit, OnDestroy {
    // TODO 当前属性判断不正确, 当前判断是是否option为空
    public dataValid: boolean = false;

    // 通过 echarts.init 创建的实例
    private _graph: any;

    /**
     * internal
     */
    public _$noDataSrc = CommonUtils.noDataImageSrc;

    // 由数据服务提供的数据.
    private _data: AbstractGraphData;

    @Input()
    public get data(): AbstractGraphData {
        return this._data;
    }

    private _removeRefreshCallback: CallbackRemoval;

    public set data(value: AbstractGraphData) {
        if (!value) return;
        this._data = value;

        const opt = value.options;
        this.setOption(opt);

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = value.onRefresh(() => {
            this.setOption(value.options);
        });
    }

    private _autoResize: boolean = true;

    @Input()
    public get autoResize(): boolean {
        return this._autoResize;
    }

    public set autoResize(value: boolean) {
        this._autoResize = value;
        if (this._needSetupResizeEvent()) {
            this._setupResizeEvent()
        } else {
            this._clearResizeEvent();
        }
    }

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this._renderer.setStyle(this._host, 'width', this._width);
        if(this.initialized){
            this._handleResize();
        }
    }

    private _handleResize() {
        if (this._graph) {
            this.resize();
        }
        if (this._needSetupResizeEvent()) {
            this._setupResizeEvent();
        } else {
            this._clearResizeEvent();
        }
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
        this._renderer.setStyle(this._host, 'height', this._height);
        if(this.initialized){
            this._handleResize();
        }
    }

    private _needSetupResizeEvent(): boolean {
        if (this.width && this.height) { // 防止没有数据时页面报错；
            return this.autoResize && (this.width[this.width.length - 1] == '%' || this.height[this.height.length - 1] == '%')
        } else {
            return this.autoResize;
        }
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._host = this._elementRef.nativeElement;
    }

    /**
     * 判断对象是否为空
     * @param obj
     */
    private _isOptionsValid(obj): boolean {
        return !CommonUtils.isEmptyObject(obj);
    }

    private _host: HTMLElement;
    private _graphContainer: HTMLElement;

    ngOnInit() {
        this._renderer.addClass(this._host, 'jigsaw-graph-host');
        this._graphContainer = <HTMLElement>this._host.querySelector(".jigsaw-graph");

        this._graph = echarts.init(this._graphContainer);

        if (this.data) this.setOption(this.data.options);

        if (this.autoResize) {
            // 默认跟随窗口变化自动变化
            this._setupResizeEvent();
        }
    }

    // 组件销毁, 注销实例
    ngOnDestroy() {
        // 销毁注册的全局事件;
        this._clearResizeEvent();
        if (this._graph) {
            this._graph.dispose();
            this._graph = null;
        }
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
        echarts.registerMap(mapName, geoJson, specialAreas);
    }

    public getMapMap(mapName: string): Object {
        return echarts.getMap(mapName);
    }

    public registerTheme(themeName: string, theme: Object): void {
        echarts.registerTheme(themeName, theme);
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

        this._graph.setOption(option, true, lazyUpdate);
        this._registerEvent();
    }

    public resize(): void {
        if (this._graph) {
            this._graph.resize({width: this._host.offsetWidth + 'px', height: this._host.offsetHeight + 'px', silence: true});
        }
    }

    private _resizeEventRemoval: Function;

    // 自动注册windows 事件;
    private _setupResizeEvent(): void {
        this._clearResizeEvent();
        this._resizeEventRemoval = this._renderer.listen("window", "resize", () => {
            this.resize();
        });
    }

    private _clearResizeEvent(): void {
        if (this._resizeEventRemoval) {
            this._resizeEventRemoval();
            this._resizeEventRemoval = null;
        }
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
