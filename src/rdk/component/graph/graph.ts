/**
 * Created by 10177553 on 2017/3/23.
 */
import {Component, OnInit, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AbstractGraphData} from "../../core/data/graph-data";

import * as echarts from 'echarts';
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-graph',
    templateUrl: 'graph.html',
    styleUrls: ['./graph.scss']
})

export class RdkGraph extends AbstractRDKComponent implements OnInit, OnDestroy {
    // 全局 echarts 对象
    public echart: any = echarts;

    // 通过 echarts.init 创建的实例
    public graph: any;

    // 由数据服务提供的数据.
    private _data: AbstractGraphData;

    @Input()
    public get data(): AbstractGraphData {
        return this._data;
    }

    public set data(value: AbstractGraphData) {
        this._data = value;
        this._setOption(value.options)
    }

    private _setOption(option: Object, notMerge?: boolean, lazyUpdate?: boolean) {
        if (!this.graph) return;

        if (!this._isOptionsValid(option)) return;
        console.info(option);
        this.graph.setOption(option, true, lazyUpdate);
        this._registerEvent();
    }

    /**
     * 判断对象是否为空 {}
     * @param obj
     */
    private _isOptionsValid(obj): boolean {
        return !CommonUtils.isEmptyObject(obj);
    }

    constructor(private _elf: ElementRef) {
        super();
    }

    ngOnInit() {
        this.graph = echarts.init(this._elf.nativeElement);

        this._setOption(this.data.options)
    }

    // 组件销毁, 注销实例
    ngOnDestroy() {
        this.graph.dispose();
    }

    // 注册封装的echarts事件.
    private _registerEvent() {
        for (let index in this._eventArr) {
            this.graph.on(this._eventArr[index], params => this._handleEvent(params, this._eventArr[index]));
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
        this.echart.registerMap(mapName, geoJson, specialAreas);
    }

    public getMapMap(mapName: string): Object {
        return this.echart.getMap(mapName);
    }

    public registerTheme(themeName: string, theme: Object): void {
        this.echart.registerMap(themeName, theme);
    }

    public setOption(option: Object, notMerge?: boolean, lazyUpdate?: boolean) {
        this._setOption(option, notMerge, lazyUpdate)
    }

    @Input()
    public get width():string {
        return this.graph.getWidth();
    }

    public set width(value: string) {
        this.graph.resize({width: value, silent: true});
    }

    public get height():string {
        return this.graph.getHeight();
    }

    public set height(value: string) {
        this.graph.resize({height: value, silent: true});
    }

    public resize(opts?: {
        width?: number|string,
        height?: number|string,
        silent?: boolean
    }): void {
        this.graph.resize(opts);
    }

    public dispatchAction(payload: Object): void {
        this.graph.dispatchAction(payload);
    }

    public on(eventName: string, handler: Function, context?: Object): void {
        this.graph.on(eventName, handler, context);
    }

    public off(eventName: string, handler?: Function): void {
        this.graph.off(eventName, handler);
    }

    public showLoading(type?: string, opts?: Object): void {
        this.graph.showLoading(type, opts);
    }

    public hideLoading(): void {
        this.graph.hideLoading();
    }

    public clear(): void {
        this.graph.clear();
    }

    public isDisposed(): boolean {
        return this.graph.isDisposed();
    }

    public dispose(): void {
        this.graph.dispose();
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
