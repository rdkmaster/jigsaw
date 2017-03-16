import {NgModule, Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TimeService} from './time.service';

declare var $: any;
declare var require: any;

@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    providers: [TimeService]
})
export class TimeComponent implements OnInit {
    //组件是否初始化
    _initFlag: boolean;

    _value: string;

    @Input() inline: boolean = true;

    //组件暴露出去的时间数值，支持双向绑定
    @Input() get date() {
        return this._value;
    }

    set date(newValue) {
        if (this._value != newValue) {
            this._value = this.timeService.format(newValue, this.format);
            this._initFlag && this._setDate(this._value);
        }
    }

    @Output() dateChange = new EventEmitter<string>();

    //限制开始时间
    @Input() dateLimitStart: any;

    //限制结束时间
    @Input() dateLimitEnd: any;

    //时间格式
    format: string = 'YYYY-MM-DD, HH:mm:ss';

    //粒度
    @Input() set gr(value){
        switch(value){
            case 'quarter':
                this.format = 'YYYY-Q';
                break;
            case 'month':
                this.format = 'YYYY-MM';
                break;
            case 'week':
                this.format = 'YYYY-W';
                break;
            case 'day':
                this.format =  'YYYY-MM-DD';
                break;
            case 'hour':
                this.format = 'YYYY-MM-DD, HH';
                break;
            case 'minute':
                this.format = 'YYYY-MM-DD, HH:mm';
                break;
            case 'second':
                this.format = 'YYYY-MM-DD, HH:mm:ss';
                break;
            default:
                this.format = 'YYYY-MM-DD, HH:mm:ss';
        }
    }

    //time插件容器（jq对象）
    timepicker: any;

    constructor(private el: ElementRef, private timeService:TimeService) {

    }

    ngOnInit() {
        require.ensure([], (require) => {//这里是异步的（webpack）
            //require("bootstrap/dist/css/bootstrap.min.css");
            //require("eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
            //require("eonasdan-bootstrap-datetimepicker");

            $(() => {
                console.log(this._value);
                console.log(this.format);
                let insert = this.el.nativeElement.querySelector(".time-box");
                $(insert).datetimepicker({
                    //locale: 'zh-cn',
                    inline: this.inline,
                    defaultDate: this._value,
                    format: this.format, // format: 'LT', //时刻
                    minDate: this.dateLimitStart,
                    maxDate: this.dateLimitEnd,
                    //viewMode: 'days', // 'decades','years','months','days', default: 'days'
                    //extraFormats: ['MM/dd/YYYY', 'MM/dd/YY'],
                    //showTodayButton: true,
                    //useCurrent: false
                }).on("dp.change", (e) => {
                    let changeValue = this.timeService.format(e.date, this.format);
                    if(this._value != changeValue){
                        this._value = changeValue;
                        this.dateChange.emit(this._value);
                    }
                });

                this.timepicker = $(insert);
                this._initFlag = true;
            });
        }, 'datepicker');
    }

    //设置插件选中时间值
    _setDate(date) {
        this.timepicker && this.timepicker.data("DateTimePicker").date(date);
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TimeComponent],
    exports: [TimeComponent]
})
export class TimeModule {

}
