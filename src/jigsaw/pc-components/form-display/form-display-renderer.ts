import {Directive, Injector, OnInit, OnDestroy, ChangeDetectionStrategy, Component, Input, Renderer2, ChangeDetectorRef} from "@angular/core"
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
@Directive()
export class FormDisplayRendererBase implements OnInit, OnDestroy {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    @RequireMarkForCheck()
    @Input()
    public cellData: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: any;

    ngOnInit(): void {
        console.log(this.cellData);
    }

    ngOnDestroy(): void {
    }
}

/**
 * @internal
 * 默认表格渲染组件
 */
@Component({
    template: '<span class="jigsaw-table-cell-text" [trustedHtml]="cellData" [trustedHtmlContext]="this"></span>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultFormDisplayCellRenderer extends FormDisplayRendererBase {
    constructor(protected _injector: Injector, private _renderer: Renderer2, private _cdr: ChangeDetectorRef) {
        super(_injector);
    }
    ngAfterViewInit() {
        this._cdr.markForCheck();
    }

    ngOnInit(): void {
        console.log(this.cellData);
    }
}
