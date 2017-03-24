/**
 * Created by 10177553 on 2017/3/20.
 */

import {Directive, Input, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

// todo 1 这种写法的原理
let $ = require("jquery");
import "jquery-mousewheel";
import 'malihu-custom-scrollbar-plugin';

@Directive({
    selector: '[rdk-scroll-bar], [rdkScrollBar], [rdk-scrollBar]'
})
export class RdkScrollBar implements OnInit{
    private _scrollBarJq: any;
    constructor(private _elf: ElementRef) {}

    @Input()
    public axis: string = "yx";   //  horizontal scrollbar or "y" or "x"

    @Input()
    public theme: string  = "dark";  // 很多很多主题...

    @Input()
    public autoHideScrollbar: boolean = false;

    @Output()
    public scrollInit: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public scrollStart = new EventEmitter<ScrollEvent>();

    @Output()
    public whileScrolling = new EventEmitter<ScrollEvent>();

    @Input()
    public rdkScrollBar: boolean = true;


    /**
     * 根据复杂的参数设置滚动条.
     * 暂不对外提供
     * option {} object 类型
     */
    private _setScrollBar(option) {
        // 销毁当前滚动条
        this._scrollBarJq.mCustomScrollbar("destroy");

        // 简单的合并参数
        if(!option.axis) {
            option.axis = this.axis;
        } else if(!option.theme) {
            option.theme = this.theme;
        }

        // 创建滚动条
        this._scrollBarJq.mCustomScrollbar(option);
    }

    public ngOnInit() {
        this.rdkScrollBar ? this._scrollBarJq = $(this._elf.nativeElement).mCustomScrollbar({
            axis: this.axis,
            theme: this.theme,
            autoHideScrollbar: this.autoHideScrollbar,
            callbacks: {
                onInit: () => {
                    this.scrollInit.emit();
                },
                onScrollStart: (value) => {
                    this.scrollStart.emit(this._generateEventObject(this._scrollBarJq.get(0).mcs));
                },
                whileScrolling: () => {
                    this.whileScrolling.emit(this._generateEventObject(this._scrollBarJq.get(0).mcs));
                }
            }
        }) : null;
    }

    private _generateEventObject(event): ScrollEvent {
        let scrollEvent = new ScrollEvent();

        scrollEvent.direction = event.direction;
        scrollEvent.draggerLeft = event.draggerLeft;
        scrollEvent.leftPercentage = event.leftPercentage;
        scrollEvent.left = event.left;
        scrollEvent.draggerTop = event.draggerTop;
        scrollEvent.topPercentage = event.topPercentage;
        scrollEvent.top = event.top;

        scrollEvent.content = event.content;

        return scrollEvent;
    }
}

export class ScrollEvent {
    // 滚动发生的方向, y 或者x
    direction: string;

    // 距左部的距离
    draggerLeft: number;

    // 距顶部的距离
    draggerTop: number;

    // 距左侧的百分比
    leftPercentage: number;

    // 内容距离
    left: number;

    // 距顶部的百分比
    topPercentage: number;

    // 内容距离
    top: number;

    // 原本的jquery对象
    content: Object
}
