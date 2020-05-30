import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../../common/common";

@Component({
    selector: 'jigsaw-tab-pane, j-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-title]"></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTabPane {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    private _title: string = '';

    @Input()
    public get title(): string {
        return this._title;
    }

    public set title(newValue: string) {
        if (this._title === newValue) {
            return;
        }
        this._title = newValue;
        this._changeDetectorRef.markForCheck();
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public hidden: boolean = false;

    /**
     * @deprecated use `lazy` instead
     *
     * @internal
     */
    @Input()
    public async: boolean = true; // 默认异步加载

    /**
     * 为true时，Tab页的视图延将被迟到该Tab页被打开的时候才被初始化。
     *
     *
     */
    @Input()
    public lazy: boolean = true;

    @Input()
    public initData: Object;

    @ViewChild('label', {static: true}) label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef, {static: true}) content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


