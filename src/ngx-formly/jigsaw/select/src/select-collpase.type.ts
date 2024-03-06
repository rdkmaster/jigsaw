import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@rdkmaster/formly/form-field";
import {JigsawSelectCollapse} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-select-collapse',
    template: `
        <jigsaw-collapse-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [valid]="to.valid && !showError"
            [width]="to.width"
            [height]="to.height"
            [minWidth]="to.minWidth"
            [maxWidth]="to.maxWidth"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [showBorder]="to.showBorder"
            [placeholder]="to.placeholder"
            [optionWidth]="to.optionWidth"
            [optionHeight]="to.optionHeight"
            [optionCount]="to.optionCount"
            [multipleSelect]="to.multipleSelect"
            [searchable]="to.searchable"
            [clearable]="to.clearable"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [useStatistics]="to.useStatistics"
            [groupField]="to.groupField"
            [theme]="to.theme"
            [data]="to.data"
            [(value)]="to.value"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (remove)="to.remove && to.remove($event)"
        ></jigsaw-collapse-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelectCollapse extends FormlyFieldType<JigsawSelectCollapse> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            labelField: 'label',
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
            useStatistics: true,
            showBorder: true,
            groupField: "groupName",
            optionHeight: 32
        },
    };

    @ViewChild(JigsawSelectCollapse)
    protected _instance: JigsawSelectCollapse;
}
