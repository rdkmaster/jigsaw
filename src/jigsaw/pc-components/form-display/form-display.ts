import {ChangeDetectionStrategy, Component, Injector, Input, NgModule, OnInit} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {JigsawHeaderModule} from "../header/header";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

interface StyleCombos {
    [property: string]: string | number;
}

type SectionTitleStyle = {
    level: 1 | 2 | 3,
    marginBottom: string
}

type TableCellConfig = string | {
    value: string,
    colSpan?: number,
    rowSpan?: number,
    style?: StyleCombos,
    isRequired?: boolean
}

type TableRowConfig = TableCellConfig[];

export type TableDataConfig = {
    title: string,
    titleStyle?: SectionTitleStyle,
    data: TableRowConfig[],
    tdStyle?: StyleCombos,
    trStyle?: StyleCombos
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
