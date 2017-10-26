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

export class ChartIconCustomPie {
    delimiter?: string = null;
    fill?: string[] | ((...any) => string) = ["#ff9900", "#fff4dd", "#ffd592"];
    height?: number = null;
    radius?: number = 8;
    width?: number = null;
    legend?: {
        // pos只有'top'和'right'两个值
        // 如果是'right'，图例的默认宽度是100，用户也可以自定义
        // 如果是'top'，图例的高度是自动算出来的，所以height属性不需要配置，width也不用配置
        width: number,
        heigth: number,
        pos: string
    };
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
                    pos: 'top',
                    width: 100,
                    height: 100
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

                if (opts.legend.pos == 'top') {
                    legendHeight = 10 * length + 5;
                    pieOffsetY = legendHeight / 2;
                } else if (opts.legend.pos == 'right') {
                    legendWidth = opts.legend.width + 20;
                    pieOffsetX = legendWidth / 2;
                }

                let $svg = this.prepare(
                    (opts.width || diameter) + legendWidth,
                    (opts.height || diameter) + legendHeight
                );

                let width = $svg.width()
                    , height = $svg.height()
                    , cx = width / 2
                    , cy = height / 2;

                let radius = Math.min(cx, cy)
                    , innerRadius = opts.innerRadius;

                if (this.type == 'donut' && !innerRadius) {
                    innerRadius = radius * 0.5
                }

                let pi = Math.PI;
                let fill = this.fill();

                let scale = this.scale = function (value, radius) {
                    let radians = value / sum * pi * 2 - pi / 2;

                    return [
                        radius * Math.cos(radians) + cx - pieOffsetX + '',
                        radius * Math.sin(radians) + cy + pieOffsetY + ''
                    ]
                };

                let cumulative = 0;

                for (i = 0; i < length; i++) {
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
                            d.push(cx - pieOffsetX + '', cy + pieOffsetY + '')
                        }

                        cumulative += value;

                        $node = this.svgElement('path', {
                            d: d.join(" ")
                        })
                    }

                    $node.attr('fill', fill.call(this, value, i, values));

                    let $title = this.svgElement('title', {}).text('this is a description11111111111111');

                    let $link = this.svgElement('a', {'href': 'http://www.baidu.com', 'target': '_blank'});
                    $link.append($title);
                    $link.append($node);

                    let $desc = this.svgElement('g', {x: '0', y: i * 10});
                    $desc.append($title.clone());

                    let $rect = this.svgElement('rect', {
                        x: 0 + (opts.legend.pos == 'right' ? diameter + 20 : 0),
                        y: i * 14,
                        'width': '10',
                        'height': '10',
                        'fill': fill.call(this, value, i, values)
                    });
                    let $text = this.svgElement('text', {
                        x: 12 + (opts.legend.pos == 'right' ? diameter + 20 : 0),
                        y: 9 + i * 14,
                        'font-size': 12
                    });
                    $text.text('this is a description11111111111111');
                    $desc.append($rect);
                    $desc.append($text);

                    $svg.append($link);
                    $svg.append($desc);
                }
            }
        )
    }
}

