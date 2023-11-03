import {ChangeDetectionStrategy, Component, Injector, Input, NgModule, OnInit} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {JigsawHeaderModule} from "../header/header";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

interface StyleCombos {
    [property: string]: string | number;
}


/**
 * level 控制组件表题尺寸
 * marginBottom 控制下边距
 * marginTop 控制多个form-display组件上下间距
 * */
type SectionTitleStyle = {
    level: 1 | 2 | 3,
    marginBottom: string,
    marginTop: string
}

/**
 * value 单元格的值
 * colSpan 控制单元格横跨列数
 * rowSpan 控制单元格所站行数
 * style 单元格定制样式
 * isTableHeader 使用表头样式
 * isRequired 是否必填项
 * */
type TableCellConfig = string | {
    value: string,
    colSpan?: number,
    rowSpan?: number,
    style?: StyleCombos,
    isTableHeader?: boolean;
    isRequired?: boolean,
}

type TableRowConfig = TableCellConfig[];

/**
 *  title 标题内容
 *  titleStyle 标题样式--SectionTitleStyle
 *  data 表数据
 *  trStyle 表行统一样式
 *  tdStyle 表单元格统一样式
 *
 *  优先级data.style > tdStyle > trStyle
 * */
export type TableDataConfig = {
    title: string,
    titleStyle?: SectionTitleStyle,
    data: TableRowConfig[],
    trStyle?: StyleCombos
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

    constructor(// @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawHeaderModule],
    declarations: [JigsawFormDisplayComponent],
    exports: [JigsawFormDisplayComponent]
})
export class JigsawFormDisplayModule {
}
