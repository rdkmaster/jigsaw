export class Pie {
    delimiter?: string = null;
    fill?: string[] | ((...any) => string) = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    radius?: number = 8;
    width?: number = null;
}

export class Donut {
    delimiter?: string = null;
    fill?: string[] = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    innerRadius?: number = null;
    radius?: number = 8;
    width?: number = null;
}

export class Line {
    delimiter?: string = ",";
    fill?: string = "#c6d9fd";
    height?: number = 16;
    max?: number = null;
    min?: number = 0;
    stroke?: string = "#4d89f9";
    strokeWidth?: number = 1;
    width?: number = 32;
}

export class Bar {
    delimiter?: string = ",";
    fill?: string[] = ["#4d89f9"];
    height?: number = 16;
    max?: number = null;
    min?: number = 0;
    padding?: number = 0.1;
    width?: number = 32;
}

export enum ChartType {
    pie, donut, line, bar
}

export class ChartIcon {
    constructor(selector: string, chartType: ChartType, options: Pie | Donut | Line | Bar) {
        $(selector).peity(this.chartTypeMap.get(chartType), options);
    }

    chartTypeMap = new Map([
        [ChartType.pie, 'pie'],
        [ChartType.donut, 'donut'],
        [ChartType.line, 'line'],
        [ChartType.bar, 'bar']
    ]);
}

