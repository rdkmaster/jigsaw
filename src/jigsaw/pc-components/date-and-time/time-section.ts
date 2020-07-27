import {Component, EventEmitter, Input, NgModule, OnDestroy, Output} from '@angular/core';
import {JigsawCheckBoxModule} from "../checkbox";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent} from "../../common/common";
import {CheckBoxStatus} from "../checkbox/typings";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {TranslateService, TranslateModule} from '@ngx-translate/core';
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {Subscription} from 'rxjs';
import {TimeService} from "../../common/service/time.service";
import {JigsawTileSelectModule} from "../list-and-tile/tile";

export type TimeSectionInfo = {
    section: string,
    isSelected: boolean
}

export type WeekSectionInfo = {
    label: string,
    value: number
}

@Component({
    selector: 'jigsaw-time-section-picker, j-time-section-picker',
    template: `
        <div class="jigsaw-time-section-picker-line">
            <j-checkbox [(checked)]="_$amTimeCheck" (checkedChange)="_$changeAmPmState($event, 'am')"></j-checkbox>
            <ul>
                <li *ngFor="let section of _$amTimeSection" (click)="_$timeSelect(section)"
                    [class.jigsaw-time-section-picker-selected]="section.isSelected"></li>
            </ul>
            <div class="jigsaw-time-section-picker-hour">
                <span *ngFor="let time of _$amTimeline">{{time}}</span>
            </div>
        </div>
        <div class="jigsaw-time-section-picker-line">
            <j-checkbox [(checked)]="_$pmTimeCheck" (checkedChange)="_$changeAmPmState($event, 'pm')"></j-checkbox>
            <ul>
                <li *ngFor="let section of _$pmTimeSection" (click)="_$timeSelect(section)"
                    [class.jigsaw-time-section-picker-selected]="section.isSelected"></li>
            </ul>
            <div class="jigsaw-time-section-picker-hour">
                <span *ngFor="let time of _$pmTimeline">{{time}}</span>
            </div>
        </div>

    `,
    host: {
        '[class.jigsaw-time-section-picker]': 'true'
    }
})
export class JigsawTimeSectionPicker extends AbstractJigsawComponent implements OnDestroy {
    /**
     * @internal
     */
    public _$amTimeline = Array.from(new Array(13)).map((item, i) => `${i < 10 ? '0' : ''}${i}:00`);
    /**
     * @internal
     */
    public _$pmTimeline = Array.from(new Array(13)).map((item, i) => `${i + 12}:00`);
    /**
     * @internal
     */
    public _$amTimeSection: TimeSectionInfo[] = Array.from(new Array(12)).map((item, i) => ({
        section: `${this._$amTimeline[i]}-${this._$amTimeline[i + 1]}`,
        isSelected: false
    }));
    /**
     * @internal
     */
    public _$pmTimeSection: TimeSectionInfo[] = Array.from(new Array(12)).map((item, i) => ({
        section: `${this._$pmTimeline[i]}-${this._$pmTimeline[i + 1]}`,
        isSelected: false
    }));
    /**
     * @internal
     */
    public _$amTimeCheck: CheckBoxStatus;
    /**
     * @internal
     */
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

    /**
     * @internal
     */
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

    /**
     * @internal
     */
    public _$changeAmPmState($event, type: 'am' | 'pm') {
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
        if (this._valueOnRefreshRemoval) {
            this._valueOnRefreshRemoval();
        }
    }
}

@Component({
    selector: 'jigsaw-week-section-picker, j-week-section-picker',
    template: `
        <j-checkbox [(checked)]="_$selectState" (checkedChange)="_$toggleSelectAll($event)">{{'timeSection.selectAll' | translate}}</j-checkbox>
        <j-tile trackItemBy="value" [(selectedItems)]="value" (selectedItemsChange)="_$selectChange($event)">
            <j-tile-option *ngFor="let week of _$weekList" [value]="week">
                {{week.label}}
            </j-tile-option>
        </j-tile>
    `,
    host: {
        '[class.jigsaw-week-section-picker]': 'true'
    }
})
export class JigsawWeekSectionPicker extends AbstractJigsawComponent {
    constructor(private _translateService: TranslateService) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            TimeService.setLocale(langInfo.curLang);
            this._$weekList = this._createWeekList();
        });
        let browserLang = _translateService.getBrowserLang();
        _translateService.setDefaultLang(browserLang);
        TimeService.setLocale(browserLang);
        this._$weekList = this._createWeekList();
    }

    @Input()
    public value: ArrayCollection<WeekSectionInfo> | WeekSectionInfo[];

    @Output()
    public valueChange = new EventEmitter<ArrayCollection<WeekSectionInfo> | WeekSectionInfo[]>();

    private _langChangeSubscriber: Subscription;
    /**
     * @internal
     */
    public _$selectState: CheckBoxStatus;
    /**
     * @internal
     */
    public _$weekList: WeekSectionInfo[];

    private _createWeekList() {
        return TimeService.getWeekdaysShort().map((week, index) => ({label: week, value: index}));
    }

    /**
     * @internal
     */
    public _$toggleSelectAll($event) {
        if ($event == CheckBoxStatus.checked) {
            this.value = new ArrayCollection([...this._$weekList]);
        } else if ($event == CheckBoxStatus.unchecked) {
            this.value = new ArrayCollection([]);
        }
        this.valueChange.emit(this.value);
    }

    public _$selectChange($event) {
        this.valueChange.emit($event);
        this._setSelectState();
    }

    private _setSelectState() {
        this._$selectState = this.value.length == this._$weekList.length ? CheckBoxStatus.checked : this.value.length == 0 ? CheckBoxStatus.unchecked : CheckBoxStatus.indeterminate;
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.value) {
            this._setSelectState();
        }
    }
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
        JigsawCheckBoxModule, JigsawTileSelectModule, TranslateModule.forChild()
    ],
    exports: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawMonthSectionPicker]
})
export class JigsawTimeSectionModule {

    constructor(translateService: TranslateService) {
        TimeService.deFineZhLocale();
        InternalUtils.initI18n(translateService, 'timeSection', {
            zh: {
                selectAll: "全选"
            },
            en: {
                selectAll: 'Select All'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }

}
