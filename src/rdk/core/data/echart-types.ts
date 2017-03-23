export class EchartOptions {
    //TODO: 补充完整
    constructor(public title?: EchartTitle,
                public legend?: EchartLegend,
                public tooltop?: EchartTooltip) {
    }
}

export class EchartTitle {
    //TODO: 补充完整
    constructor(public text: string,
                public subtext?: string,
                public left?: string,
                public right?: string,
                public top?: string,
                public bottom?: string,
                public show?: boolean) {
    }
}

export class GraphLegendItem {
    constructor(public name: string, icon?: string) {
    }
}

export class EchartLegend {
    //TODO: 补充完整
    constructor(public data: GraphLegendItem[],
                public left?: string,
                public right?: string,
                public top?: string,
                public bottom?: string,
                public show?: boolean) {
    }
}

export class EchartTooltip {
    //TODO: 补充完整
    constructor(public formatter?: string|Function,
                public show?: boolean) {
    }
}
