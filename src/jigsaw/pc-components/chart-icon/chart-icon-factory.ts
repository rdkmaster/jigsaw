import {CommonUtils} from "../../common/core/utils/common-utils";

declare const $: any;

export class ChartIconPie {
    delimiter?: string = null;
    fill?: string[] | ((...any) => string) = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    radius?: number = 8;
    width?: number = null;
}

export class ChartIconDonut {
    delimiter?: string = null;
    fill?: string[] = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    innerRadius?: number = null;
    radius?: number = 8;
    width?: number = null;
}

export class ChartIconLine {
    delimiter?: string = ",";
    fill?: string = "#c6d9fd";
    height?: number = 16;
    max?: number = null;
    min?: number = 0;
    stroke?: string = "#4d89f9";
    strokeWidth?: number = 1;
    width?: number = 32;
}

export class ChartIconBar {
    delimiter?: string = ",";
    fill?: string[] = ["#4d89f9"];
    height?: number = 16;
    max?: number = null;
    min?: number = 0;
    padding?: number = 0.1;
    width?: number = 32;
}

export class ChartIconCustomPieLegend {
    /**
     * orient只有'top'和'right'两个值
     * - 如果是'right'，图例的默认宽度是100，用户也可以自定义
     * - 如果是'top'，图例的高度是自动算出来的，所以height属性不需要配置，width也不用配置
     */
    orient: string;
    data: string[];
    width: number;
    height?: number;
    marginLeft: number;
}

export class ChartIconCustomPie {
    delimiter?: string = null;
    fill?: string[] | ((...any) => string) = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    radius?: number = 8;
    width?: number = null;
    legend?: ChartIconCustomPieLegend;
    series?: any;
    after?: Function;
    link?: Function | string;
    title: string[]; // 当没有title，默认使用legend.data
    context?: object;
}

export enum ChartType {
    pie, donut, line, bar, customPie
}

export class ChartIconFactory {
    public static create(selector: string, chartType: ChartType, options: ChartIconPie | ChartIconDonut | ChartIconLine | ChartIconBar | ChartIconCustomPie) {
        $(selector).peity(this._chartTypeMap.get(chartType), options);
    }

    private static _chartTypeMap = new Map([
        [ChartType.pie, 'pie'],
        [ChartType.donut, 'donut'],
        [ChartType.line, 'line'],
        [ChartType.bar, 'bar'],
        [ChartType.customPie, 'customPie']
    ]);

    public static registerCustomPie() {
        $.fn.peity.register('customPie', {
                fill: ['#ff9900', '#fff4dd', '#ffc66e'],
                radius: 8,
                legend: {
                    orient: 'top',
                    width: 100,
                    height: 100,
                    data: []
                }
            },
            function (opts) {
                if (!opts.delimiter) {
                    let delimiter = this.$el.text().match(/[^0-9\.]/);
                    opts.delimiter = delimiter ? delimiter[0] : ","
                }

                let values = $.map(this.values(), function (n) {
                    return n > 0 ? n : 0
                });

                if (opts.delimiter == "/") {
                    let v1 = values[0];
                    let v2 = values[1];
                    values = [v1, Math.max(0, v2 - v1)]
                }

                let i = 0;
                let length = values.length;
                let sum = 0;

                for (; i < length; i++) {
                    sum += values[i]
                }

                if (!sum) {
                    length = 2;
                    sum = 1;
                    values = [0, 1];
                }

                let diameter = opts.radius * 2;

                let legendWidth = 0,
                    legendHeight = 0,
                    pieOffsetX = 0,
                    pieOffsetY = 0;

                if (opts.legend.orient == 'top') {
                    legendHeight = 14 * length + 5;
                    pieOffsetY = legendHeight / 2;
                } else if (opts.legend.orient == 'right') {
                    legendWidth = opts.legend.width + 20;
                    pieOffsetX = legendWidth / 2;
                }

                let $svg = this.prepare(
                    (opts.width || diameter) + legendWidth,
                    (opts.height || diameter) + legendHeight
                );

                let width = $svg.width(),
                    height = $svg.height(),
                    cx = width / 2 - pieOffsetX,
                    cy = height / 2 + pieOffsetY;

                if (this.$el.text().replace(/\s+/g, '') === '') {
                    // 没有数据
                    $svg.remove();
                    this.$svg = null;
                    if (!this.$box) {
                        this.$box = $('<div class="peity-no-data"></div>');
                    }
                    this.$el.hide().after(this.$box);
                    this.$box.empty().append(`<image width="${width}" height="${height}" src="${CommonUtils.noDataImageSrc}">`);
                    return;
                } else {
                    if (this.$box) {
                        this.$box.remove();
                        this.$box = null;
                    }
                }

                let radius = Math.min(cx, cy),
                    innerRadius = opts.innerRadius;

                if (this.type == 'donut' && !innerRadius) {
                    innerRadius = radius * 0.5
                }

                let pi = Math.PI;
                let fill = this.fill();

                let scale = this.scale = function (value, radius) {
                    let radians = value / sum * pi * 2 - pi / 2;

                    return [
                        radius * Math.cos(radians) + cx + '',
                        radius * Math.sin(radians) + cy + ''
                    ]
                };

                let cumulative = 0;

                for (let i = 0; i < length; i++) {
                    let value = values[i]
                        , portion = value / sum
                        , $node;

                    if (portion == 0) continue;

                    if (portion == 1) {
                        if (innerRadius) {
                            let x2 = cx - 0.01
                                , y1 = cy - radius
                                , y2 = cy - innerRadius;

                            $node = this.svgElement('path', {
                                d: [
                                    'M', cx, y1,
                                    'A', radius, radius, 0, 1, 1, x2, y1,
                                    'L', x2, y2,
                                    'A', innerRadius, innerRadius, 0, 1, 0, cx, y2
                                ].join(' ')
                            })
                        } else {
                            $node = this.svgElement('circle', {
                                cx: cx,
                                cy: cy,
                                r: radius
                            })
                        }
                    } else {
                        let cumulativePlusValue = cumulative + value;

                        let d = ['M'].concat(
                            scale(cumulative, radius),
                            'A', radius + '', radius + '', 0 + '', (portion > 0.5 ? 1 : 0) + '', 1 + '',
                            scale(cumulativePlusValue, radius),
                            'L'
                        );

                        if (innerRadius) {
                            d = d.concat(
                                scale(cumulativePlusValue, innerRadius),
                                'A', innerRadius, innerRadius, 0 + '', (portion > 0.5 ? 1 : 0) + '', 0 + '',
                                scale(cumulative, innerRadius)
                            )
                        } else {
                            d.push(cx + '', cy + '')
                        }

                        cumulative += value;

                        $node = this.svgElement('path', {
                            d: d.join(" ")
                        })
                    }

                    $node.attr('fill', fill.call(this, value, i, values));

                    if (opts.title && !(opts.title instanceof Array)) {
                        throw('customPie\'s title must be type of array');
                    }

                    if (opts.legend && !(opts.legend.data instanceof Array)) {
                        throw('customPie\'s legend data must be type of array');
                    }

                    // 饼图链接
                    // 图形的title如果没有，使用图例的data
                    let $title = this.svgElement('title', {})
                        .text(opts.title ? opts.title[i] : opts.legend.data[i]);

                    let $link = this.svgElement('a', {'href': 'javascript:;'})
                        .append($title)
                        .append($node);
                    if (opts.link instanceof Function) {
                        if (opts.context) {
                            $link.bind('click', () => {
                                opts.link.call(opts.context, opts.series, i);
                            });
                        } else {
                            $link.bind('click', () => {
                                opts.link(opts.series, i);
                            });
                        }
                    } else if (typeof opts.link === 'string') {
                        $link.attr('href', opts.link);
                    }

                    // 绘制图例
                    let $legendTitle = this.svgElement('title', {})
                        .text(opts.legend.data[i]);

                    let $legend = this.svgElement('g', {x: '0', y: i * 10});
                    $legend.append($legendTitle);

                    let legendPositionX = 0;
                    if(opts.legend.orient == 'right'){
                        if(Number.isNaN(Number(opts.legend.marginLeft))){
                            opts.legend.marginLeft = 20;
                        }
                        legendPositionX = diameter + Number(opts.legend.marginLeft);
                    }

                    let $rect = this.svgElement('rect', {
                        x: legendPositionX,
                        y: 1 + i * 14,
                        width: 10,
                        height: 10,
                        'fill': fill.call(this, value, i, values)
                    });
                    let $text = this.svgElement('text', {
                        x: 12 + legendPositionX,
                        y: 10 + i * 14,
                        'font-size': 12
                    }).text(opts.legend.data[i]);

                    $legend.append($rect).append($text);

                    // 等待text渲染
                    setTimeout(() => {
                        const rangeWidth = (opts.legend.orient == 'right' ? opts.legend.width : width) - 12;
                        if ($text.width() > rangeWidth) {
                            // 加入省略号
                            let $ellipsis = this.svgElement('text', {
                                x: width - 9,
                                y: 9 + i * 14,
                                'font-size': 12
                            }).text('...');
                            let $ellipsisBg = this.svgElement('rect', {
                                x: width - 10,
                                y: i * 14 - 1,
                                width: 10,
                                height: 16,
                                fill: '#fff'
                            });
                            $legend.append($ellipsisBg).append($ellipsis);
                        }
                    });

                    $svg.append($link);
                    $svg.append($legend);
                }
            }
        )
    }
}

