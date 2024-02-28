import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, NgModule, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {AutoDisplayData, JigsawAutoDisplayContentComponent} from "./inner-component";
import {JigsawAutoDisplayRendererModule} from "./renderer/auto-display-renderer";

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
export class JigsawAutoDisplay extends AbstractJigsawComponent implements OnInit, OnDestroy {
    constructor(private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    /**
    * @internal
    * */
    public _$viewData: AutoDisplayData[][] = [];

    private _data: AutoDisplayData[];

    @RequireMarkForCheck()
    @Input()
    public get data(): AutoDisplayData[] {
        return this._data
    }

    public set data(data: AutoDisplayData[]) {
        this._data = data;
        this.update();
    }

    private _transformData(): void {
        this._$viewData = [];
        if (!this.data?.length) {
            return;
        }

        let chunkSize = 4;
        if (this.data.length == 1 || this.data.length == 2 || this.data.length == 3) {
            chunkSize = 1;
        } else if (this.data.length == 4) {
            chunkSize = 2;
        } else if (this.data.length == 5 || this.data.length == 6 || this.data.length == 9) {
            chunkSize = 3;
        }

        for (let i = 0; i < this.data.length; i += chunkSize) {
            const arr = this.data.slice(i, i + chunkSize);
            this._$viewData.push(arr);
        }
    }

    public update() {
        this._transformData();
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawAutoDisplayRendererModule],
    declarations: [JigsawAutoDisplay, JigsawAutoDisplayContentComponent],
    exports: [JigsawAutoDisplay, JigsawAutoDisplayContentComponent]
})
export class JigsawAutoDisplayModule {
}
