export interface EchartOptions {
    //TODO: 补充完整
    title?: EchartTitle;
    legend?: EchartLegend;
    tooltip?: EchartTooltip;
    [prop:string]: any;
}

export interface EchartTitle {
    //TODO: 补充完整
    text: string;
    subtext?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    show?: boolean;
    [prop:string]: any;
}

export interface GraphLegendItem {
    name?: string;
    icon?: string;
    [prop:string]: any;
}

export interface EchartLegend {
    //TODO: 补充完整
    data: Array<GraphLegendItem|string>;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    show?: boolean;
    [prop:string]: any;
}

export interface EchartTooltip {
    //TODO: 补充完整
    formatter?: string|Function;
    show?: boolean;
    [prop:string]: any;
}

export interface EchartSeriesItem {
    data: any[];
    [prop:string]: any;
}
