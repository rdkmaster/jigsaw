/**
 * Created by 10177553 on 2017/3/20.
 */

import {Directive, Input, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

// todo 修改成import 形式.
let $ = require('jquery');
require("jquery-mousewheel");
require('malihu-custom-scrollbar-plugin');

export class ScrollEvent {
    // 滚动发生的方向, y 或者x
    direction: string;

    // 距左部的距离
    draggerLeft: number;

    // 距顶部的距离
    draggerTop: number;

    // 内容距离
    left: number;

    // 距左侧的百分比
    leftPct: number;

    // 内容距离
    top: number;

    // 距顶部的百分比
    topPct: number
}


@Directive({
    selector: '[rdk-scroll-bar], [rdkScrollBar], [rdk-scrollBar]'
})
export class RdkScrollBar implements OnInit{
    private _scrollBarJq: any;
    constructor(private _elf: ElementRef) {}

    @Input()
    axis: string = "yx";   //  horizontal scrollbar or "y" or "x"

    @Input()
    theme: string  = "dark";  // 很多很多主题...

    @Input()
    autoHideScrollbar: boolean = false;

    @Output()
    scrollInit: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    scrollStart: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    whileScrolling: EventEmitter<any> = new EventEmitter<any>();


    /**
     *根据复杂的参数这是滚动条.
     * 暂不对外提供
     * option {} object 类型
     */
    private _setScrollBar(option) {
        // 下回当前滚动条
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

    ngOnInit() {
        this._scrollBarJq = $(this._elf.nativeElement).mCustomScrollbar({
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
        });
    }

    private _generateEventObject(event): ScrollEvent {
        let scrollEvent = new ScrollEvent();

        scrollEvent.direction = event.direction;
        scrollEvent.draggerLeft = event.draggerLeft;
        scrollEvent.draggerTop = event.draggerTop;
        scrollEvent.left = event.left;
        scrollEvent.leftPct = event.leftPct;
        scrollEvent.top = event.top;
        scrollEvent.topPct = event.topPct;

        return scrollEvent;
    }
}
