import {NgModule, Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbstractRDKComponent} from '../../core/api/component-api';
import {TimeService} from './time.service';

//declare let $: any;
//declare let require: any;

//let $ = require('jquery');
//import "eonasdan-bootstrap-datetimepicker";

@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    providers: [TimeService],
    host: {
        '[style.width]': 'width'
    }
})
export class RdkTime extends AbstractRDKComponent implements OnInit {
    //组件是否初始化
    private _initFlag: boolean;

    private _value: string;

    @Input() public inline: boolean = true;

    //组件暴露出去的时间数值，支持双向绑定
    @Input()
    public get date(): string {
        return this._value;
    }

    public set date(newValue: string) {
        if (this._value != newValue) {
            this._value = this.timeService.format(newValue, this._format);
            this._initFlag && this._setDate(this._value);
        }
    }

    @Output() public dateChange = new EventEmitter<string>();

    //限制开始时间
    @Input() public dateLimitStart: string;

    //限制结束时间
    @Input() public dateLimitEnd: string;

    //时间格式
    private _format: string = 'YYYY-MM-DD, HH:mm:ss';

    //粒度
    @Input()
    public set gr(value) {
        switch (value) {
            case 'quarter':
                this._format = 'YYYY-Q';
                break;
            case 'month':
                this._format = 'YYYY-MM';
                break;
            case 'week':
                this._format = 'YYYY-W';
                break;
            case 'day':
                this._format = 'YYYY-MM-DD';
                break;
            case 'hour':
                this._format = 'YYYY-MM-DD, HH';
                break;
            case 'minute':
                this._format = 'YYYY-MM-DD, HH:mm';
                break;
            case 'second':
                this._format = 'YYYY-MM-DD, HH:mm:ss';
                break;
            default:
                this._format = 'YYYY-MM-DD, HH:mm:ss';
        }
    }

    //time插件容器（jq对象）
    private _timepicker: any;

    constructor(private el: ElementRef, private timeService: TimeService) {
        super();
    }

    //设置插件选中时间值
    private _setDate(date) {
        this._timepicker && this._timepicker.data("DateTimePicker").date(date);
    }

    ngOnInit() {
        //require.ensure([], (require) => {//这里是异步的（webpack）
        //require("bootstrap/dist/css/bootstrap.min.css");
        //require("eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        //require("eonasdan-bootstrap-datetimepicker");

        $(() => {
            let insert = this.el.nativeElement.querySelector(".time-box");
            $(insert).datetimepicker({
                locale: 'zh-cn',
                inline: this.inline,
                defaultDate: this._value,
                format: this._format, // format: 'LT', //时刻
                minDate: this.dateLimitStart,
                maxDate: this.dateLimitEnd,
                //viewMode: 'days', // 'decades','years','months','days', default: 'days'
                //extraFormats: ['MM/dd/YYYY', 'MM/dd/YY'],
                //showTodayButton: true,
                //useCurrent: false
            }).on("dp.change", (e) => {
                let changeValue = this.timeService.format(e.date, this._format);
                if (this._value != changeValue) {
                    this._value = changeValue;
                    this.dateChange.emit(this._value);
                }
            });

            this._timepicker = $(insert);
            this._initFlag = true;
        });
        //}, 'datepicker');
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RdkTime],
    exports: [RdkTime]
})
export class RdkTimeModule {

}
