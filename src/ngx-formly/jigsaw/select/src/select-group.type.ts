import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawSelectGroup} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-select-group',
    template: `
        <jigsaw-group-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [valid]="to.valid && !showError"
            [width]="to.width"
            [height]="to.height"
            [minWidth]="to.minWidth"
            [maxWidth]="to.maxWidth"
            [trackItemBy]="to.trackItemBy"
            [showBorder]="to.showBorder"
            [labelField]="to.labelField"
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
        ></jigsaw-group-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelectGroup extends FormlyFieldType<JigsawSelectGroup> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            labelField: 'label',
            showBorder: true,
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
            useStatistics: true,
            groupField: "groupName",
            optionHeight: 32
        },
    };

    @ViewChild(JigsawSelectGroup)
    protected _instance: JigsawSelectGroup;
}
