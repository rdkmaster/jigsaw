import {Component, ElementRef, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {LayoutData} from "../../core/data/layout-data";
import {AbstractJigsawComponent} from "../common";
import {JigsawEditableBox, JigsawEditableBoxModule, IEditableBoxParent} from "../box/editable-box";

@Component({
    selector: 'jigsaw-view-editor, j-view-editor',
    template: `
        <j-editable-box [data]="data" [direction]="data?.direction" (directionChange)="data ? data.direction = $event: null"
                        [grow]="data?.grow" [editable]="editable" [blocked]="blocked" [parentViewEditor]="this"
                        [resizeLineWidth]="resizeLineWidth" [isFirst]="true" height="100%">
        </j-editable-box>
    `,
    host: {
        '[class.jigsaw-view-editor]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawViewEditor extends AbstractJigsawComponent implements IEditableBoxParent {
    public element: HTMLElement;

    constructor(elementRef: ElementRef) {
        super();
        this.element = elementRef.nativeElement;
    }

    @Input()
    public data: LayoutData;

    @Output()
    public dataChange = new EventEmitter<LayoutData>();

    @Output()
    public fill = new EventEmitter<JigsawEditableBox>();

    @Output()
    public move = new EventEmitter<LayoutData>();

    @Input()
    public editable: boolean = true;

    @Input()
    public blocked: boolean = false;

    private _resizeLineWidth: string;

    @Input()
    public get resizeLineWidth(): string {
        return this._resizeLineWidth;
    }

    public set resizeLineWidth(value: string) {
        if (typeof value == 'string') {
            value = value.replace('px', '');
        }
        let valueNum = Number(value);
        if (Number.isNaN(valueNum)) return;
        if (valueNum < 2) {
            valueNum = 2
        } else if (valueNum > 8) {
            valueNum = 8
        }
        this._resizeLineWidth = valueNum + 'px';
    }
}

@NgModule({
    imports: [JigsawEditableBoxModule],
    declarations: [JigsawViewEditor],
    exports: [JigsawViewEditor]
})
export class JigsawViewEditorModule {

}
