import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, NgModule, OnInit, Renderer2} from "@angular/core";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {JigsawHeaderModule} from "../header/header";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

interface StyleCombos {
    [property: string]: string | number;
}

type TitleConfig = {
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

export type TableDataConfig = { title: string, titleStyle?: TitleConfig, data: TableRowConfig[], tdStyle?: StyleCombos, trStyle?: StyleCombos }

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

    private _formio: TableDataConfig[];

    @RequireMarkForCheck()
    @Input()
    public get formio() {
        return this._formio
    }

    public set formio(formio: TableDataConfig | TableDataConfig []) {
        if (!Array.isArray(formio)) {
            formio = [formio];
        }
        this._formio = formio;
    }

    constructor(protected renderer: Renderer2, private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
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
