/**
 * Created by 10177553 on 2017/3/23.
 */
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";

import {AbstractGraphData} from "../../common/core/data/graph-data";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent} from "../../common/common";
import {EchartOptions} from "../../common/core/data/echart-types";
import {JigsawTheme} from "../../common/core/theming/theme";

import echarts from "echarts";

// 某些情况，需要把Jigsaw在服务端一起编译，直接使用window对象，会导致后端编译失败
declare const window: any;
try {
    window.echarts = window.echarts || echarts;
} catch(e) {
}

@Component({
    selector: 'jigsaw-graph, j-graph',
    templateUrl: 'graph.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawGraph extends AbstractJigsawComponent implements OnInit, OnDestroy, AfterViewInit {
    // TODO 当前属性判断不正确, 当前判断是是否option为空
    /**
     * @internal
     */
    public _$dataValid: boolean = false;

    private get _dataValid(): boolean {
        return this._$dataValid
    }

    private set _dataValid(value: boolean) {
        if (this._$dataValid == value) return;
        this._$dataValid = value;
        if (this._$dataValid) {
            this.resize();
        }
    }

    // 通过 echarts.init 创建的实例
    private _graph: any;

    /**
     * 获取图形的echart实例
     */
    public get echarts(): any {
        return this._graph;
    }

    /**
     * @internal
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

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this._renderer.setStyle(this._host, 'width', this._width);
        if (this.initialized) {
            this.resize();
            this._listenWindowResize();
        }
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
        this._renderer.setStyle(this._host, 'height', this._height);
        if (this.initialized) {
            this.resize();
            this._listenWindowResize();
        }
    }

    private _globalTheme: any;

    @Input()
    public get globalTheme() {
        if (!this._globalTheme) {
            this._globalTheme = JigsawTheme.getGraphTheme();
        }
        return this._globalTheme;
    };

    public set globalTheme(value) {
        if (!value) return;
        this._globalTheme = value;
        if (this._graph) {
            this._graph._theme = value;
            this.data.refresh();
        }
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2, protected _zone: NgZone,
                private _changeDetectorRef: ChangeDetectorRef) {
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

    public setOption(option: EchartOptions, lazyUpdate?: boolean) {
        if (!this._graph) {
            return;
        }
        this._dataValid = this._isOptionsValid(this.data.options);
        // 若数据非法，那么不能给graph赋值，故直接返回
        if (!this._dataValid) {
            return;
        }
        this._graph.setOption(option, true, lazyUpdate);
        this._registerEvent();
        this._changeDetectorRef.markForCheck();
    }

    public resize(): void {
        // 宿主元素没有尺寸就不resize
        if (!this._graph || !this._host.offsetWidth || !this._host.offsetHeight) {
            return;
        }
        this._graph.resize({
            width: this._host.offsetWidth + 'px',
            height: this._host.offsetHeight + 'px',
            silence: true
        });
    }

    private _resizeEventRemoval: Function;

    private _listenWindowResize(): void {
        if (!this._needListenWindowResize() || this._resizeEventRemoval) {
            return;
        }
        this._zone.runOutsideAngular(() => {
            // 所有的全局事件应该放到zone外面，不一致会导致removeEvent失效，见#286
            this._resizeEventRemoval = this._renderer.listen("window", "resize", () => {
                this.resize();
            });
        });
    }

    private _needListenWindowResize(): boolean {
        return !!((this.width && this.width[this.width.length - 1] == '%') ||
            (this.height && this.height[this.height.length - 1] == '%') || !this.width);
    }

    private _host: HTMLElement;
    private _graphContainer: HTMLElement;

    ngOnInit() {
        super.ngOnInit();
        if (this.data) {
            this._dataValid = this._isOptionsValid(this.data.options);
        }
        this.init.emit();
    }

    ngAfterViewInit() {
        this._renderer.addClass(this._host, 'jigsaw-graph-host');
        this._graphContainer = <HTMLElement>this._host.querySelector(".jigsaw-graph");
        this._zone.runOutsideAngular(() => {
            // echarts的Animation对象里的_startLoop方法有个递归调用requestAnimationFrame,会触发变更检查，见#289
            this._graph = echarts.init(this._graphContainer);
            this._graph._theme = this.globalTheme;
        });
        this._listenWindowResize();
        if (this.data) {
            this.setOption(this.data.options);
        }
    }

    ngOnDestroy() {
        if (this._resizeEventRemoval) {
            this._resizeEventRemoval();
            this._resizeEventRemoval = null;
        }

        if (this._graph) {
            this._graph.dispose();
            this._graph = null;
        }
    }

    // 注册封装的echarts事件.
    private _registerEvent() {
        this._eventArr.forEach(eventStr => {
            this._graph.off(eventStr);
            this._graph.on(eventStr, params => this._handleEvent(params, eventStr));
        })
    }

    private _handleEvent(params: any, eventType?: string) {
        // 防止和ng2 事件冲突，响应两遍.
        if (!!event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this._zone.run(() => {
            this[eventType].emit(params)
        });
    }

    /**
     * @internal
     */
    public getMapMap(mapName: string): Object {
        return this.getMap(mapName);
    }

    /* ********************** echarts api 封装区 start  ******************************** */
    public registerMap(mapName: string, geoJson: Object, specialAreas?: Object): void {
        echarts.registerMap(mapName, geoJson, specialAreas);
    }

    public getMap(mapName: string): Object {
        return echarts.getMap(mapName);
    }

    public registerTheme(themeName: string, theme: Object): void {
        echarts.registerTheme(themeName, theme);
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

    // 将onInit 暴露给外面
    @Output()
    public init = new EventEmitter<any>();


    /* *************** 事件声明 end ***************************** */
}
