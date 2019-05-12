export class EchartOptions {
    //TODO: 补充完整
    title?: EchartTitle;
    legend?: EchartLegend;
    tooltip?: EchartTooltip;
    [prop:string]: any;
}

export class EchartTitle {
    //TODO: 补充完整
    text?: string;
    subtext?: string;
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    show?: boolean;
    [prop:string]: any;
}

export class EchartXAxis {
    [prop:string]: any;
}

export class EchartYAxis {
    [prop:string]: any;
}

export class GraphLegendItem {
    name?: string;
    icon?: string;
    [prop:string]: any;
}

export class EchartToolbox {
    [prop:string]: any;
}

export class EchartLegend {
    //TODO: 补充完整
    data?: Array<GraphLegendItem|string>;
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    show?: boolean;
    [prop:string]: any;
}

export class EchartTooltip {
    //TODO: 补充完整
    formatter?: string|Function;
    show?: boolean;
    [prop:string]: any;
}

export class EchartSeriesItem {
    data?: any[];
    [prop:string]: any;
}
