/**
 * Created by 10177553 on 2017/4/13.
 */
import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
    selector: 'rdk-slider',
    templateUrl: './slider.html',
    styleUrls:['./slider.scss']
})
export class RdkSlider implements OnInit {
    constructor(private _element: ElementRef) { }

    private _value: number = 0;

    @Input()
    public get value() { return this._value; };
    public set value(value) {
        this._value = value;

        this.setTrackStyle();
        this.setHandleStyle();
    }

    @Output()
    public changeValue = new  EventEmitter<number>();

    @Input()
    public range: boolean = false;


    private _min: number;
    @Input()
    public get min() { return this._min; }
    public set min(value) {
        this._min = value;
    }

    private _max: number;
    @Input()
    public get max() { return this._max; }
    public set max(value) {
        this._max = value;
    }

    private _dimensions;

    // 改变value的值;
    private _updateValuePosition() {
        console.info("this._dragged: " + this._dragged);
        if(!this._dragged) { return ;}

        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        }

        let offset = this._dimensions.left;
        let size = this._dimensions.width;

        var move = (this.value / 100) * size + offset;

        // console.info(pos.x - move);

        if(pos.x - move > 0) {
            this.value = this.value + 1;
        } else {
            this.value = this.value - 1;
        }
        console.info(this._dimensions);

    }

    private _dragged = false;

    _updateCanDragged(flag) {
        console.info("flag: " + flag);
        this._dragged = flag;
    }


    // private _cau
    private _trackStyle = {}

    private setTrackStyle() {
        this._trackStyle = {
            left: 0 + "%",
            width: this.value + "%"
        }
    }

    private _handleStyle = {}

    private setHandleStyle() {
        this._handleStyle = {
            left: this.value + "%"
        }
    }


    ngOnInit() {
        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();
        console.info(this._dimensions);
    }

}
