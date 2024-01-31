import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    NgModule,
    ChangeDetectorRef,
    OnInit
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbstractJigsawComponent, JigsawCommonModule, WingsTheme } from "../../common/common";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";

export type AutoDisplay = {
    label?: any;
};

@WingsTheme('auto-display.scss')
@Component({
    selector: 'jigsaw-auto-display',
    templateUrl: './auto-display.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-auto-display-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAutoDisplayComponent extends AbstractJigsawComponent implements OnInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    private _data: AutoDisplay[];

    @RequireMarkForCheck()
    @Input()
    public get data() {
        return this._data
    }

    public set data(data: AutoDisplay[]) {

    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawAutoDisplayComponent],
    exports: [JigsawAutoDisplayComponent]
})
export class JigsawAutoDisplayModule {
}
