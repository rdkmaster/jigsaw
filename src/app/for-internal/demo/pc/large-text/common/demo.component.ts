import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['../demo-component.css']
})
export class LargeTextCommonDemoComponent {

    value: number = 100.11112211;

    useRawValue: boolean = false;

    fractionDigits: number = 3;

    enableAnimation: boolean = true;

    animationDuration: number = 2000;

    leadingUnit: string = "股票市值：";

    unit: string = "亿";

    iconValue: string = 'iconfont iconfont-ea39';

    leadingFontSize = 12;
    leadingFontColor = "#e43232";

    leadingStyle = {'font-size': this.leadingFontSize + 'px', 'color': '#e43232'}
    top = {'align-items': 'start'};
    bottom = {'align-items': 'end'};
    center = {'align-items': 'center'}

    setStyle() {
        this.leadingStyle = {...this.leadingStyle, ...{'font-size': this.leadingFontSize + 'px', 'color': this.leadingFontColor}};
    }
    setTop() {
        this.leadingStyle = {...this.leadingStyle, ...this.top}
    }

    setBottom() {
        this.leadingStyle = {...this.leadingStyle, ...this.bottom}
    }

    setCenter() {
        this.leadingStyle = {...this.leadingStyle, ...this.center}
    }

    unitFontSize = 12;

    unitFontColor = "blue";

    unitStyle = {'font-size': this.unitFontSize + 'px', 'color': this.unitFontColor}


    setStyle1() {
        this.unitStyle = {...this.unitStyle, ...{'font-size': this.unitFontSize + 'px', 'color': this.unitFontColor}};
    }
    setTop1() {
        this.unitStyle = {...this.unitStyle, ...this.top}
    }

    setBottom1() {
        this.unitStyle = {...this.unitStyle, ...this.bottom}
    }

    setCenter1() {
        this.unitStyle = {...this.unitStyle, ...this.center}
    }

    valueFontSize = 70;
    valueFontColor = "green";

    valueStyle = {'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}

    setStyle2() {
        this.valueStyle = {...this.valueStyle, ...{'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}};
    }


    trendFontSize = 20
    basicTrendStyle = {'font-size': this.trendFontSize + 'px'}

    setStyle3() {
        this.basicTrendStyle = {...this.basicTrendStyle, 'font-size': this.trendFontSize + 'px'};
    }

    setTop2() {
        this.basicTrendStyle = {...this.unitStyle, ...this.top}
    }

    setBottom2() {
        this.basicTrendStyle = {...this.unitStyle, ...this.bottom}
    }

    setCenter2() {
        this.basicTrendStyle = {...this.unitStyle, ...this.center}
    }

    ascendingTrendColor = '#56e10d'
    ascendingTrendIcon = 'iconfont iconfont-e032'
    ascendingTrendStyle = {"ascending-icon": this.ascendingTrendIcon, "ascending-color": this.ascendingTrendColor}
    setStyle4() {
        this.ascendingTrendStyle = {...this.ascendingTrendStyle, 'ascending-color': this.ascendingTrendColor, 'ascending-icon': this.ascendingTrendIcon};
    }

    descendingTrendColor = '#f0065c'
    descendingTrendIcon = 'iconfont iconfont-e030'
    descendingTrendStyle = {"descending-icon": this.descendingTrendIcon, "descending-color": this.descendingTrendColor}
    setStyle5() {
        this.descendingTrendStyle = {...this.descendingTrendStyle, 'descending-icon': this.descendingTrendIcon, 'descending-color': this.descendingTrendColor};
    }

    trendValueFontSize = 16;
    trendValueFontColor = '#0e0e0e';

    trendValueStyle = {'font-size': this.trendValueFontSize + 'px', 'color': this.trendValueFontColor}

    setStyle6() {
        this.trendValueStyle = {...this.trendValueStyle, ...{'font-size': this.trendValueFontSize + 'px', 'color': this.trendValueFontColor}};
    }

    _$changeValue() {
        this.value += Math.floor(Math.random() * 1000) + 1;
    }

    _$changeValue1() {
        this.value -= Math.floor(Math.random() * 1000) + 1;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的简单用法。';
    description: string = '';
}
