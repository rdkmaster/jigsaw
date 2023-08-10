import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['../demo-component.css']
})
export class LargeTextCommonDemoComponent {

    value: number = 1001.11112211;

    useRawValue: boolean = false;

    fractionDigits: number = 3;

    enableAnimation: boolean = true;

    animationDuration: number = 2000;

    leadingUnit: string = "股票市值：";

    unit: string = "亿";

    iconValue: string = 'iconfont iconfont-ea39';

    leadingFontSize = 23;
    leadingFontColor = "#e43232";

    leadingLeft: number = 12;
    leadingBottom: number = -65;
    leadingRight: number = 125;
    leadingTop: number = 11;

    leadingStyle = {'font-size': this.leadingFontSize + 'px', 'color': '#e43232',
        'margin': `${this.leadingLeft}px ${this.leadingBottom}px ${this.leadingRight}px ${this.leadingTop}px`}

    setStyle() {
        this.leadingStyle = {...this.leadingStyle, ...{'font-size': this.leadingFontSize + 'px', 'color': this.leadingFontColor,
            'margin': `${this.leadingLeft}px ${this.leadingBottom}px ${this.leadingRight}px ${this.leadingTop}px`}};
    }

    unitFontSize = 23;

    unitFontColor = "blue";

    unitLeft: number = 12;
    unitBottom: number = -21;
    unitRight: number = 16;
    unitTop: number = 11;

    unitStyle = {'font-size': this.unitFontSize + 'px', 'color': this.unitFontColor,
        'margin': `${this.unitTop}px ${this.unitRight}px ${this.unitBottom}px ${this.unitLeft}px`}


    setStyle1() {
        this.unitStyle = {...this.unitStyle, ...{'font-size': this.unitFontSize + 'px', 'color': this.unitFontColor,
                'margin': `${this.unitTop}px ${this.unitRight}px ${this.unitBottom}px ${this.unitLeft}px`}};
    }

    valueFontSize = 70;
    valueFontColor = "green";

    valueStyle = {'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}

    setStyle2() {
        this.valueStyle = {...this.valueStyle, ...{'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}};
    }

    iconFontSize = 80;
    iconColor = "pink";

    iconStyle = {'font-size': this.iconFontSize + 'px', 'color': this.iconColor}

    setIconStyle() {
        this.iconStyle = {...this.iconStyle, ...{'font-size': this.iconFontSize + 'px', 'color': this.iconColor}};
    }


    trendFontSize = 20;
    trendLeft: number = 0;
    trendBottom: number = 0;
    trendRight: number = 0;
    trendTop: number = 38;
    basicTrendStyle = {'font-size': this.trendFontSize + 'px', "justify-content":"center", "flex-flow": 'row',
        'margin': `${this.trendTop}px ${this.trendRight}px ${this.trendBottom}px ${this.trendLeft}px`};

    setStyle3() {
        this.basicTrendStyle = {...this.basicTrendStyle, 'font-size': this.trendFontSize + 'px',
            'margin': `${this.trendTop}px ${this.trendRight}px ${this.trendBottom}px ${this.trendLeft}px`};
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

    valueMap: { [valueEnum: string]: [number, number] } = null;
    valueMapUsed: boolean = false;
    valueMapEntries = [];

    valueMapChecked(event: boolean) {
        this.valueMap = event ? {
            '特别差': [-1000, -500], '差': [-499, 300], '中': [301, 500], '良': [501, 1000], '优': [1000, 2000]
        } : null;
        this.valueMapEntries = event ? Object.entries(this.valueMap) : [];
    }

    selectedPosition = '左右布局'
    positions = ["左右布局", "上下布局"];

    reverse: boolean = false;


    radioChange(event) {
        this.basicTrendStyle = {...this.basicTrendStyle, 'font-size': this.trendFontSize + 'px',
            "flex-flow": event == "左右布局"?"row":"column" };
    }

    reverseChange(event) {
        if (!event) {
            this.radioChange(this.selectedPosition);
            return
        }
        this.basicTrendStyle = {...this.basicTrendStyle, 'font-size': this.trendFontSize + 'px',
            "flex-flow": this.selectedPosition == "左右布局"?"row-reverse":"column-reverse" }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了大字组件jigsaw-large-text的简单用法。';
    description: string = '';
}
