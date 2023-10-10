import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {ArrayCollection, JigsawSelect} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-select',
    template: `
        <jigsaw-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [valid]="to.valid && !showError"
            [width]="to.width"
            [height]="to.height"
            [disabled]="to.disabled"
            [showBorder]="to.showBorder"
            [minWidth]="to.minWidth"
            [maxWidth]="to.maxWidth"
            [trackItemBy]="to.trackItemBy"
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
            [theme]="to.theme"
            [data]="to.data"
            [(value)]="to.value"
            (valueChange)="_$valueChange($event)"
            (remove)="to.remove && to.remove($event)"
        ></jigsaw-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelect extends FormlyFieldType<JigsawSelect> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            labelField: 'label',
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
            showBorder: true,
            useStatistics: true,
            optionHeight: 32
        },
    };

    @ViewChild(JigsawSelect)
    protected _instance: JigsawSelect;

    public _$valueChange($event): void {
        if (this._instance.multipleSelect) {
            // 解决下拉框在多选时，有时表单model不更新的问题
            this.formControl.setValue(new ArrayCollection($event));
        }
        if (this.to.valueChange) {
            this.to.valueChange($event);
        }
    }
}
