import {Component, ViewChild} from '@angular/core';
import {JigsawLargeTextComponent, LargeTextStyle} from "jigsaw/public_api";

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

    @ViewChild('largeTextComponent')
    largeTextComponent: JigsawLargeTextComponent;

    public increase() {
        this.largeTextComponent.value = Number(this.largeTextComponent.value) + Math.floor(Math.random() * 100);
    }

    public decrease() {
        this.largeTextComponent.value = Number(this.largeTextComponent.value) - Math.floor(Math.random() * 100);
    }

    largeTitle: string = "股票市值："
    largeTitleSize = 23;
    largeTitleColor = "#32e4d8";
    titleY: number = 2;
    titleX: number = 3;

    largeTileStyle: LargeTextStyle = {
        'font-size': this.largeTitleSize + 'px', 'color': this.largeTitleColor,
        'margin': `0 0 ${this.titleY}px ${this.titleX}px`
    }

    setStyle0() {
        if (this.largeTitleColor.startsWith('linear-gradient')) {
            this.setGradientColor0();
            return;
        }
        this.largeTileStyle = {
            ...this.largeTileStyle,
            'font-size': this.largeTitleSize + 'px',
            'color': this.largeTitleColor,
            'margin': `0 0 ${this.titleY}px ${this.titleX}px`
        };
    }

    setGradientColor0() {
        this.largeTitleColor = 'linear-gradient(180deg, #71C032 16%, #51E5A5 84%)';
        this.largeTileStyle = {
            ...this.largeTileStyle,
            'font-size': this.largeTitleSize + 'px',
            'margin': `0 0 ${this.titleY}px ${this.titleX}px`,
            'color': 'transparent',
            'background': this.largeTitleColor,
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }

    leadingUnit: string = "人民币";

    unit: string = "亿";

    iconValue: string = 'iconfont iconfont-ea39';

    leadingFontSize = 23;
    leadingFontColor = "#e43232";

    leadingX: number = 0;
    leadingY: number = 0;

    leadingStyle: LargeTextStyle = {'font-size': this.leadingFontSize + 'px', 'color': '#e43232',
        'margin': `0px ${this.leadingX}px ${this.leadingY}px 0px`}

    setStyle() {
        if (this.leadingFontColor.startsWith('linear-gradient')) {
            this.setGradientColor3()
            return;
        }
        this.leadingStyle = {
            ...this.leadingStyle,
            'font-size': this.leadingFontSize + 'px',
            'color': this.leadingFontColor,
            'margin': `0px ${this.leadingX}px ${this.leadingY}px 0px`
        };
    }

    setGradientColor3() {
        this.leadingFontColor = 'linear-gradient(180deg, #71C032 16%, #51E5A5 84%)';
        this.leadingStyle = {
            ...this.leadingStyle,
            'font-size': this.leadingFontSize + 'px',
            'margin': `0px ${this.leadingX}px ${this.leadingY}px 0px`,
            'color': 'transparent',
            'background': this.leadingFontColor,
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }

    unitFontSize = 23;

    unitFontColor = "blue";

    unitLeft: number = 12;
    unitBottom: number = -21;

    unitStyle: LargeTextStyle = {'font-size': this.unitFontSize + 'px', 'color': this.unitFontColor,
        'margin': `0px 0px ${this.unitBottom}px ${this.unitLeft}px`}


    setStyle1() {
        if (this.unitFontColor.startsWith('linear-gradient')) {
            this.setGradientColor4();
            return;
        }
        this.unitStyle = {
            ...this.unitStyle,
            'font-size': this.unitFontSize + 'px',
            'color': this.unitFontColor,
            'margin': `0px 0px ${this.unitBottom}px ${this.unitLeft}px`
        };
    }

    setGradientColor4() {
        this.unitFontColor = 'linear-gradient(-43deg, #DA856D 0%, #FF0000 100%)';
        this.unitStyle = {
            ...this.unitStyle,
            'font-size': this.unitFontSize + 'px',
            'margin': `0px 0px ${this.unitBottom}px ${this.unitLeft}px`,
            'color': 'transparent',
            'background': this.unitFontColor,
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }

    valueFontSize = 70;
    valueFontColor = "green";

    valueStyle = {'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}

    setStyle2() {
        this.valueStyle = {...this.valueStyle, ...{'font-size': this.valueFontSize + 'px', 'color': this.valueFontColor}};
    }

    iconFontSize = 80;
    iconColor = "pink";

    iconStyle: LargeTextStyle = {'font-size': this.iconFontSize + 'px', 'color': this.iconColor}

    setIconStyle() {
        delete this.iconStyle.background;
        delete this.iconStyle['background-clip'];
        delete this.iconStyle['-webkit-background-clip'];
        this.iconStyle = {...this.iconStyle, ...{'font-size': this.iconFontSize + 'px', 'color': this.iconColor}};
    }

    setGradientColor2() {
        this.iconStyle = {
            ...this.iconStyle,
            'font-size': this.iconFontSize + 'px',
            'color': 'transparent',
            'background': "linear-gradient(180deg, #71C032 16%, #51E5A5 84%)",
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }


    trendFontSize = 70;
    trendLeft: number = 0;
    trendTop: number = 0;
    basicTrendStyle = {'font-size': this.trendFontSize + 'px', "justify-content":"center", "flex-flow": 'row',
        'margin': `${0 - this.trendTop}px 0 0 ${this.trendLeft}px`};

    setStyle3() {
        this.basicTrendStyle = {...this.basicTrendStyle, 'font-size': this.trendFontSize + 'px',
            'margin': `${0 - this.trendTop}px 0 0  ${this.trendLeft}px`};
    }

    ascendingTrendColor = '#56e10d'
    ascendingTrendIcon = 'iconfont iconfont-e032'
    ascendingTrendStyle: LargeTextStyle = {
        "ascending-icon": this.ascendingTrendIcon,
        "ascending-color": this.ascendingTrendColor
    }
    setStyle4() {
        this.ascendingTrendStyle = {...this.ascendingTrendStyle, 'ascending-color': this.ascendingTrendColor, 'ascending-icon': this.ascendingTrendIcon};
    }

    setGradientColor() {
        this.ascendingTrendStyle = {
            ...this.ascendingTrendStyle,
            'ascending-color': 'transparent',
            'ascending-icon': this.ascendingTrendIcon,
            'background': "linear-gradient(180deg, #71C032 16%, #51E5A5 84%)",
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }

    descendingTrendColor = '#f0065c'
    descendingTrendIcon = 'iconfont iconfont-e030'
    descendingTrendStyle: LargeTextStyle = {"descending-icon": this.descendingTrendIcon, "descending-color": this.descendingTrendColor}
    setStyle5() {
        this.descendingTrendStyle = {...this.descendingTrendStyle, 'descending-icon': this.descendingTrendIcon, 'descending-color': this.descendingTrendColor};
    }

    setGradientColor1() {
        this.descendingTrendStyle = {
            ...this.descendingTrendStyle,
            'descending-color': 'transparent',
            'descending-icon': this.descendingTrendIcon,
            'background': "linear-gradient(-45deg, #24D2E3 0%, #AF41C5 100%)",
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
        };
    }

    trendValueFontSize = 16;
    trendValueFontColor = '#0e0e0e';

    trendValueStyle: LargeTextStyle = {'font-size': this.trendValueFontSize + 'px'}

    setStyle6() {
        if (this.trendValueFontColor.startsWith('linear-gradient')) {
            this.setGradientColor6();
            return;
        }
        this.trendValueStyle = {
            ...this.trendValueStyle,
            'font-size': this.trendValueFontSize + 'px',
            'color': 'transparent',
            'background': this.trendValueFontColor
        };
    }

    setGradientColor6() {
        this.trendValueFontColor = "linear-gradient(-45deg, #8DF5EB 0%, #E577B8 100%)";
        this.trendValueStyle = {
            ...this.trendValueStyle,
            'font-size': this.trendValueFontSize + 'px',
            'color': 'transparent',
            'background': this.trendValueFontColor,
        };
    }

    clearColor() {
        delete this.trendValueStyle.background;
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
