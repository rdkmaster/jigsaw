import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {ArrayCollection, JigsawCascade, JigsawComboSelect} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-cascade',
    template: `
        <jigsaw-combo-select
            *ngIf="!!to.dataGenerator; else dataTmp"
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [(value)]="_$comboValue"
            [labelField]="to.labelField"
            [placeholder]="to.placeholder"
            [(open)]="to.open"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [valid]="to.valid && !showError"
            [autoWidth]="to.autoWidth"
            [theme]="to.theme">
            <ng-template>
                <jigsaw-cascade
                    [width]="to.width"
                    [height]="to.height"
                    [generatorContext]="to.generatorContext"
                    [dataGenerator]="to.dataGenerator"
                    [(selectedItems)]="to.selectedItems"
                    [multipleSelect]="to.multipleSelect"
                    [labelField]="to.labelField"
                    [trackItemBy]="to.trackItemBy"
                    [searchable]="to.searchable"
                    [optionWidth]="to.optionWidth"
                    [theme]="to.theme"
                    (selectedItemsChange)="_$selectItemsChange($event)">
                </jigsaw-cascade>
            </ng-template>
        </jigsaw-combo-select>
        <ng-template #dataTmp>
            <jigsaw-combo-select
                [formControl]="formControl"
                [formlyAttributes]="field"
                [width]="to.width"
                [(value)]="_$comboValue"
                [labelField]="to.labelField"
                [placeholder]="to.placeholder"
                [(open)]="to.open"
                [openTrigger]="to.openTrigger"
                [closeTrigger]="to.closeTrigger"
                [valid]="to.valid && !showError"
                [autoWidth]="to.autoWidth"
                [theme]="to.theme">
                <ng-template>
                    <jigsaw-cascade
                        [width]="to.width"
                        [data]="to.data"
                        [(selectedItems)]="to.selectedItems"
                        [multipleSelect]="to.multipleSelect"
                        [labelField]="to.labelField"
                        [trackItemBy]="to.trackItemBy"
                        [searchable]="to.searchable"
                        [optionWidth]="to.optionWidth"
                        [theme]="to.theme"
                        (selectedItemsChange)="_$selectItemsChange($event)">
                    </jigsaw-cascade>
                </ng-template>
            </jigsaw-combo-select>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCascade extends FormlyFieldType<FormlyFieldCascade> implements OnInit {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            labelField: 'label',
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
            showBorder: true,
            searchKeyword: '',
            searchBoxMinWidth: 40,
            valid: true,
            pageSize: Infinity,
            autoWidth: true,
        },
    };

    public _$comboValue: any[];

    @ViewChild(JigsawComboSelect)
    public comboSelectInstance: JigsawComboSelect;
    @ViewChild(JigsawCascade)
    public cascadeInstance: JigsawCascade;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    public _$selectItemsChange(selectedItems: any[]): void {
        if (this.to.selectedItemsChange) {
            this.to.selectedItemsChange(selectedItems);
        }
        this.parseSelectItems(selectedItems);
    }

    // 动态计算combo中显示的数据
    public parseSelectItems(selectedItems: any[]): void {
        if (this.to.multipleSelect) {
            // 多选
            const selectedItemsStr = selectedItems.reduce((result, item) => {
                const districts = [];
                if (item instanceof ArrayCollection || item instanceof Array) {
                    item.forEach(district => districts.push(district[this.to.labelField]));
                } else {
                    districts.push(item[this.to.labelField]);
                }
                result.push(districts.join(' & '));
                return result;
            }, []).join(' | ');
            this._$comboValue = [{
                [this.to.labelField]: selectedItemsStr,
                closable: false
            }];
            this._cdr.markForCheck();
            return;
        }
        // 单选
        const selectedItemStr = selectedItems.reduce((result, item) => {
            result.push(item[this.to.labelField]);
            return result;
        }, []).join(' | ');
        this._$comboValue = [{
            [this.to.labelField]: selectedItemStr,
            closable: false
        }];
        this._cdr.markForCheck();
    }

    ngOnInit(): void {
        if (this.to.selectedItems) {
            // 如果设置了默认值，需要同步combo
            this.parseSelectItems(this.to.selectedItems);
        }
    }

    ngAfterViewInit(): void {
        this.to.componentRef = this;
    }
}
