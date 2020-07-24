import {Component, EventEmitter, Input, NgModule, OnDestroy, Output} from '@angular/core';
import {JigsawCheckBoxModule} from "../checkbox";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent} from "../../common/common";
import {CheckBoxStatus} from "../checkbox/typings";

export type TimeSectionInfo = {
    section: string,
    isSelected: boolean
}

@Component({
    selector: 'jigsaw-time-section-picker, j-time-section-picker',
    template: `
        <div class="jigsaw-time-section-time-line">
            <j-checkbox [(checked)]="_$amTimeCheck" (checkedChange)="_$changeAmPmState($event, 'am')"></j-checkbox>
            <ul>
                <li *ngFor="let section of _$amTimeSection" (click)="_$timeSelect(section)"
                    [class.jigsaw-time-section-time-selected]="section.isSelected"></li>
            </ul>
            <div class="jigsaw-time-section-hour">
                <span *ngFor="let time of _$amTimeline">{{time}}</span>
            </div>
        </div>
        <div class="jigsaw-time-section-time-line">
            <j-checkbox [(checked)]="_$pmTimeCheck" (checkedChange)="_$changeAmPmState($event, 'pm')"></j-checkbox>
            <ul>
                <li *ngFor="let section of _$pmTimeSection" (click)="_$timeSelect(section)"
                    [class.jigsaw-time-section-time-selected]="section.isSelected"></li>
            </ul>
            <div class="jigsaw-time-section-hour">
                <span *ngFor="let time of _$pmTimeline">{{time}}</span>
            </div>
        </div>

    `
})
export class JigsawTimeSectionPicker extends AbstractJigsawComponent implements OnDestroy {
    public _$amTimeline = Array.from(new Array(13)).map((item, i) => `${i < 10 ? '0' : ''}${i}:00`);
    public _$pmTimeline = Array.from(new Array(13)).map((item, i) => `${i + 12}:00`);
    public _$amTimeSection: TimeSectionInfo[] = Array.from(new Array(12)).map((item, i) => ({
        section: `${this._$amTimeline[i]}-${this._$amTimeline[i + 1]}`,
        isSelected: false
    }));
    public _$pmTimeSection: TimeSectionInfo[] = Array.from(new Array(12)).map((item, i) => ({
        section: `${this._$pmTimeline[i]}-${this._$pmTimeline[i + 1]}`,
        isSelected: false
    }));
    public _$amTimeCheck: CheckBoxStatus;
    public _$pmTimeCheck: CheckBoxStatus;

    private _value: ArrayCollection<string> = new ArrayCollection();
    private _valueOnRefreshRemoval: CallbackRemoval;

    @Input()
    public get value(): ArrayCollection<string> {
        return this._value;
    }

    public set value(value: ArrayCollection<string>) {
        if (!(value instanceof Array || value instanceof ArrayCollection) || this.value == value) return;
        if (value instanceof Array) {
            value = new ArrayCollection(value);
        }
        this._value = value;
        if (this._valueOnRefreshRemoval) {
            this._valueOnRefreshRemoval();
        }
        this._valueOnRefreshRemoval = this._value.onRefresh(() => {
            this._changeSelectViewByValue();
        });
        this._changeSelectViewByValue();
    }

    @Output()
    public valueChange = new EventEmitter();

    public _$timeSelect(sectionInfo: TimeSectionInfo) {
        sectionInfo.isSelected = !sectionInfo.isSelected;
        this._updateValueBySection(sectionInfo);
        this._updateValue();
        this._checkAmPmSelect();
    }

    private _changeSelectViewByValue() {
        this._updateSelectState(this._$amTimeSection);
        this._updateSelectState(this._$pmTimeSection);
        this._checkAmPmSelect();
    }

    private _updateSelectState(timeSection: TimeSectionInfo[]) {
        timeSection.forEach(s => {
            s.isSelected = !!this.value.find(v => v == s.section)
        })
    }

    private _checkAmPmSelect() {
        this._$amTimeCheck = this._getCheckState(this._$amTimeSection);
        this._$pmTimeCheck = this._getCheckState(this._$pmTimeSection);
    }

    private _getCheckState(sections: TimeSectionInfo[]): CheckBoxStatus {
        return sections.every(s => !!s.isSelected) ? CheckBoxStatus.checked : sections.some(s => !!s.isSelected) ? CheckBoxStatus.indeterminate : CheckBoxStatus.unchecked;
    }

    private _$changeAmPmState($event, type: 'am' | 'pm') {
        let timeSection = type == 'am' ? this._$amTimeSection : this._$pmTimeSection;
        timeSection.forEach(sectionInfo => {
            sectionInfo.isSelected = !!$event;
            this._updateValueBySection(sectionInfo);
        });
        this._updateValue();
    }

    private _updateValueBySection(sectionInfo: TimeSectionInfo) {
        let found = this.value.find(v => v == sectionInfo.section);
        if (sectionInfo.isSelected && !found) {
            this.value.push(sectionInfo.section);
        } else if (!sectionInfo.isSelected && found) {
            let index = this.value.findIndex(v => v == sectionInfo.section);
            this.value.splice(index, 1);
        }
    }

    private _updateValue() {
        this.value.sort();
        this.valueChange.emit(this.value);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

@Component({
    selector: 'jigsaw-week-section-picker, j-week-section-picker',
    template: ``
})
export class JigsawWeekSectionPicker {

}

@Component({
    selector: 'jigsaw-month-section-picker, j-month-section-picker',
    template: ``
})
export class JigsawMonthSectionPicker {

}

@Component({
    selector: 'jigsaw-time-section, j-time-section',
    templateUrl: 'time-section.html'
})
export class JigsawTimeSection {

}

@NgModule({
    declarations: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawMonthSectionPicker],
    imports: [
        JigsawCheckBoxModule
    ],
    exports: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawMonthSectionPicker]
})
export class JigsawTimeSectionModule {

}
