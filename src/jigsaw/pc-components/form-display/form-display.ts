import {ChangeDetectionStrategy, Component, Injector, Input, NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {JigsawHeaderModule} from "../header/header";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

interface StyleCombos {
    [property: string]: string | number;
}

/**
 * 控制组件标题的尺寸
 */
type SectionTitleStyle = {
    /**
     * 控制标题的级别，可选值为1、2、3
     */
    level: 1 | 2 | 3,

    /**
     * 控制组件标题下方的下边距
     */
    marginBottom: string,

    /**
     * 控制多个 form-display 组件之间的上下间距
     */
    marginTop: string
}

/**
 * 单元格配置，用于定义单元格的属性和样式
 */
type TableCellConfig = string | {
    /**
     * 单元格的值
     */
    value: string,

    /**
     * 控制单元格横跨的列数
     */
    colSpan?: number,

    /**
     * 控制单元格横跨的行数
     */
    rowSpan?: number,

    /**
     * 单元格的自定义样式
     */
    style?: StyleCombos,

    /**
     * 指定是否应用表头样式
     */
    isHeader?: boolean;

    /**
     * 指定单元格是否为必填项
     */
    isRequired?: boolean,
}

type TableRowConfig = TableCellConfig[];

/**
 * 表数据的配置
 */
export type TableDataConfig = {
    /**
     * 表的标题内容
     * 优先级data.style > tdStyle > trStyle
     */
    title: string,

    /**
     * 表标题的样式，可选类型为 SectionTitleStyle
     */
    titleStyle?: SectionTitleStyle,

    /**
     * 表的数据行配置，参考 `TableRowConfig` 类型
     */
    data: TableRowConfig[],

    /**
     * 表格行的统一样式，优先级最低
     */
    trStyle?: StyleCombos,

    /**
     * 表格单元格的统一样式，优先级次之
     */
    tdStyle?: StyleCombos
}

@WingsTheme('form-display.scss')
@Component({
    selector: 'jigsaw-form-display',
    templateUrl: './form-display.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-form-display-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawFormDisplayComponent extends AbstractJigsawComponent implements OnInit {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    private _data: TableDataConfig[];

    @RequireMarkForCheck()
    @Input()
    public get data() {
        return this._data
    }

    public set data(data: TableDataConfig | TableDataConfig []) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        this._data = data;
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawHeaderModule],
    declarations: [JigsawFormDisplayComponent],
    exports: [JigsawFormDisplayComponent]
})
export class JigsawFormDisplayModule {
}
