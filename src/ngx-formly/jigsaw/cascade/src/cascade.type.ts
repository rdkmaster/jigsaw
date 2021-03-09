import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {ArrayCollection, JigsawCascade} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-cascade',
    template: `
        <jigsaw-combo-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [(value)]="_$comboValue"
            [labelField]="to.labelField"
            [placeholder]="to.placeholder"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [maxWidth]="to.maxWidth"
            [(open)]="to.open"
            [showBorder]="to.showBorder"
            [autoClose]="to.autoClose"
            [autoWidth]="to.autoWidth"
            [clearable]="to.clearable"
            [searchable]="to.searchable"
            [searching]="to.searching"
            [searchKeyword]="to.searchKeyword"
            [searchBoxMinWidth]="to.searchBoxMinWidth"
            [showValueBorder]="to.showValueBorder"
            [valid]="to.valid && !showError"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (select)="to.select && to.select($event)"
            (openChange)="to.openChange && to.openChange($event)"
            (searchKeywordChange)="to.searchKeywordChange && to.searchKeywordChange($event)"
            (remove)="to.remove && to.remove($event)">
            <ng-template>
                <jigsaw-cascade
                    [width]="to.width"
                    [height]="to.height"
                    [dataGenerator]="to.dataGenerator"
                    [generatorContext]="to.generatorContext"
                    [data]="to.data"
                    [(selectedItems)]="to.selectedItems"
                    [multipleSelect]="to.multipleSelect"
                    [labelField]="to.labelField"
                    [trackItemBy]="to.trackItemBy"
                    [searchable]="to.searchable"
                    [pageSize]="to.pageSize"
                    [optionWidth]="to.optionWidth"
                    (selectedItemsChange)="_$selectItemsChange($event)">
                </jigsaw-cascade>
            </ng-template>
        </jigsaw-combo-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCascade extends FormlyFieldType<JigsawCascade> implements OnInit {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            labelField: 'label',
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
            showBorder: true,
            searchKeyword: '',
            searchBoxMinWidth: 40,
            showValueBorder: true,
            valid: true,
            pageSize: Infinity,
            autoWidth: true,
        },
    };

    public _$comboValue: any[];

    @ViewChild(JigsawCascade)
    protected _instance: JigsawCascade;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    public _$selectItemsChange(selectedItems: any[]): void {
        if (this.to.selectedItemsChange) {
            this.to.selectedItemsChange(selectedItems);
        }
        this._parseSelectItems(selectedItems);
    }

    // 动态计算combo中显示的数据
    private _parseSelectItems(selectedItems: any[]): void {
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
            this._parseSelectItems(this.to.selectedItems);
        }
    }
}
