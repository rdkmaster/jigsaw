export class EchartOptions {
    //TODO: 补充完整
    public title?: EchartTitle;
    public legend?: EchartLegend;
    public tooltip?: EchartTooltip;
    [prop:string]: any;
}

export class EchartTitle {
    //TODO: 补充完整
    public text: string;
    public subtext?: string;
    public left?: string;
    public right?: string;
    public top?: string;
    public bottom?: string;
    public show?: boolean;
    [prop:string]: any;
}

export class GraphLegendItem {
    public name?: string;
    public icon?: string;
    [prop:string]: any;
}

export class EchartLegend {
    //TODO: 补充完整
    public data: Array<GraphLegendItem|string>;
    public left?: string;
    public right?: string;
    public top?: string;
    public bottom?: string;
    public show?: boolean;
    [prop:string]: any;
}

export class EchartTooltip {
    //TODO: 补充完整
    public formatter?: string|Function;
    public show?: boolean;
    [prop:string]: any;
}

export class EchartSeriesItem {
    data: any[];
    [prop:string]: any;
}
