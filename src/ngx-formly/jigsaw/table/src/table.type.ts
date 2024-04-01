import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {JigsawTable} from "@rdkmaster/jigsaw";
import {FormlyFieldType} from "@rdkmaster/formly/form-field";

@Component({
    selector: 'formly-field-jigsaw-table',
    template: `
        <jigsaw-table
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [contentWidth]="to.contentWidth"
            [hideHeader]="to.hideHeader"
            [selectedRow]="to.selectedRow"
            [trackRowBy]="to.trackRowBy"
            [data]="to.data"
            [columnDefines]="to.columnDefines"
            [columnDefineGeneratorContext]="to.columnDefineGeneratorContext"
            [additionalColumnDefines]="to.additionalColumnDefines"
            [floatingHeader]="to.floatingHeader"
            [theme]="to.theme"
            (sort)="to.sort && to.sort($event)"
            (selectChange)="to.selectChange && to.selectChange($event)"
            (selectedRowChange)="to.selectedRowChange && to.selectedRowChange($event)"
            (additionalDataChange)="to.additionalDataChange && to.additionalDataChange($event)"
            (edit)="to.edit && to.edit($event)"
            (doubleClick)="to.doubleClick && to.doubleClick($event)"
        ></jigsaw-table>
    `,
    host: {
        '[style.flex]': '1',
        '[style.overflow]': '"hidden"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTable extends FormlyFieldType<JigsawTable> {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            height: '100%',
            contentWidth: 'auto',
        }
    };

    @ViewChild(JigsawTable)
    protected _instance: JigsawTable;
}
