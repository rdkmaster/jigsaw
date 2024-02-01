import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    NgModule,
    ChangeDetectorRef,
    OnInit,
    Type,
    OnDestroy
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbstractJigsawComponent, JigsawCommonModule, WingsTheme } from "../../common/common";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";
import { JigsawAutoDisplayContentComponent } from "./auto-display-inner-component";
import { AutoDisplayRendererBase, JigsawAutoDisplayRendererModule } from "./renderer/auto-display-renderer";
import { ArrayCollection } from "../../common/core/data/array-collection";
import { CallbackRemoval } from "jigsaw/public_api";

export type AutoDisplay = {
    /**
     * 指定单元格使用的渲染器
     */
    renderAs?: Type<AutoDisplayRendererBase> | 'table' | 'graph' | 'html',

    /**
     *  渲染器的数据
     * */
    initData?: any
};

@WingsTheme('auto-display.scss')
@Component({
    selector: 'jigsaw-auto-display',
    templateUrl: './auto-display.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-auto-display-host]': 'true',
        '[class.jigsaw-auto-display-1x1]': 'data.length == 1',
        '[class.jigsaw-auto-display-2x1]': 'data.length == 2',
        '[class.jigsaw-auto-display-3x1]': 'data.length == 3',
        '[class.jigsaw-auto-display-2x2]': 'data.length == 4',
        '[class.jigsaw-auto-display-3x2]': 'data.length == 5',
        '[class.jigsaw-auto-display-3x3]': 'data.length == 9',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAutoDisplayComponent extends AbstractJigsawComponent implements OnInit, OnDestroy {
    constructor(private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    private _data: AutoDisplay[];

    @RequireMarkForCheck()
    @Input()
    public get data(): AutoDisplay[] {
        return this._data
    }

    public set data(data: AutoDisplay[]) {
        this._data = data;
    }

    public update() {
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawAutoDisplayRendererModule],
    declarations: [JigsawAutoDisplayComponent, JigsawAutoDisplayContentComponent],
    exports: [JigsawAutoDisplayComponent, JigsawAutoDisplayContentComponent]
})
export class JigsawAutoDisplayModule {
}
