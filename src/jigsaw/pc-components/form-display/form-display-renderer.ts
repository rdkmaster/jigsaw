import {
    Directive,
    Injector,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    Component,
    Input,
    NgModule,
} from "@angular/core"
import {CommonModule} from "@angular/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";
import {JigsawTagModule} from "../tag/tag";

@Directive()
export class FormDisplayRendererBase implements OnInit, OnDestroy {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    @RequireMarkForCheck()
    @Input()
    public cellData: string | string[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: any;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}

/**
 * @internal
 * 默认使用html渲染组件
 */
@Component({
    template: '<span class="jigsaw-table-cell-text" [trustedHtml]="trustedHtml" [trustedHtmlContext]="this"></span>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDisplayHtmlCellRenderer extends FormDisplayRendererBase {
    public trustedHtml: string;

    ngOnInit() {
        if (!Array.isArray(this.cellData)) {
            this.cellData = [this.cellData];
        }
        this.trustedHtml = this.cellData.join('\n');
    }
}


/**
 * form-display单元格tag渲染器
 * @internal
 * */
@Component({
    template: `
        <ng-container *ngFor="let tag of tags">
            <span [ngStyle]="{'margin': margin}">
                <jigsaw-tag [size]="size" [color]="color" [selectedColor]="selectedColor">{{tag}}</jigsaw-tag>
            </span>
        </ng-container>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDisplayTagCellRenderer extends FormDisplayRendererBase {
    public tags: string[];
    public size: 'small' | 'medium';
    public color: string;
    public selectedColor: string;
    public margin: string = '0 2px';

    ngOnInit() {
        super.ngOnInit();
        if (!Array.isArray(this.cellData)) {
            this.cellData = [this.cellData];
        }
        this.tags = this.cellData;
        if (!this.initData) {
            return;
        }
        this.size = this.initData.tagSize ? this.initData.tagSize : 'medium';
        this.color = this.initData.tagColor ? this.initData.tagColor : 'preset-gray';
        this.selectedColor = this.initData.tagSelectedColor ? this.initData.tagSelectedColor : '';
        this.margin = this.initData.tagMargin ? this.initData.tagMargin : '0 2px';
    }
}

@NgModule({
    declarations: [FormDisplayHtmlCellRenderer, FormDisplayTagCellRenderer],
    imports: [CommonModule, JigsawTrustedHtmlModule, JigsawTagModule]
})
export class JigsawTableRendererModule {
}
