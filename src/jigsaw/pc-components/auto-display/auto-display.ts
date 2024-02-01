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
        '[class.jigsaw-auto-display-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAutoDisplayComponent extends AbstractJigsawComponent implements OnInit, OnDestroy {
    constructor(private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    private _data: ArrayCollection<AutoDisplay>;

    @RequireMarkForCheck()
    @Input()
    public get data(): ArrayCollection<AutoDisplay> {
        return this._data
    }

    public set data(data: ArrayCollection<AutoDisplay>) {
        this._data = data instanceof Array ? new ArrayCollection(data) : data;
        if (this._removeInputDataChangeListener) {
            this._removeInputDataChangeListener();
            this._removeInputDataChangeListener = null;
        }
        this._removeInputDataChangeListener = this._data.onRefresh(() => {
            
        });
    }

    private _removeInputDataChangeListener: CallbackRemoval;

    public update() {
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeInputDataChangeListener) {
            this._removeInputDataChangeListener();
            this._removeInputDataChangeListener = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawAutoDisplayRendererModule],
    declarations: [JigsawAutoDisplayComponent, JigsawAutoDisplayContentComponent],
    exports: [JigsawAutoDisplayComponent, JigsawAutoDisplayContentComponent]
})
export class JigsawAutoDisplayModule {
}
