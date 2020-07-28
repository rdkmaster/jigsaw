import {Component, EventEmitter, Input, NgModule, OnDestroy, Output, OnInit} from '@angular/core';
import {JigsawCheckBoxModule} from "../checkbox";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent} from "../../common/common";
import {CheckBoxStatus} from "../checkbox/typings";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {Subscription} from 'rxjs';
import {TimeGr, TimeService} from "../../common/service/time.service";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawFloatModule} from "../../common/directive/float";
import {Time} from "../../common/service/time.types";

export type TimeSectionInfo = {
    section: string,
    isSelected: boolean
}

export type WeekAndDaySectionInfo = {
    label: string | number,
    value: number,
    isLast?: boolean
}

export type TimeSection = {
    time: string[],
    week: WeekAndDaySectionInfo[],
    date: WeekAndDaySectionInfo[]
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
        <j-checkbox [(checked)]="_$selectState"
                    (checkedChange)="_$toggleSelectAll($event)">{{'timeSection.selectAll' | translate}}</j-checkbox>
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
export class JigsawWeekSectionPicker extends AbstractJigsawComponent implements OnDestroy, OnInit {
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
    public value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[];

    @Output()
    public valueChange = new EventEmitter<ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[]>();

    private _langChangeSubscriber: Subscription;
    /**
     * @internal
     */
    public _$selectState: CheckBoxStatus;
    /**
     * @internal
     */
    public _$weekList: WeekAndDaySectionInfo[];

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
        if (this.value) {
            this._setSelectState();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._langChangeSubscriber) {
            this._langChangeSubscriber.unsubscribe();
            this._langChangeSubscriber = null;
        }
    }
}

@Component({
    selector: 'jigsaw-day-section-picker, j-day-section-picker',
    template: `
        <div class="jigsaw-day-section-picker-wrapper">
            <div class="jigsaw-day-section-picker-checkbox">
                <j-checkbox [(checked)]="_$selectState"
                            (checkedChange)="_$toggleSelectAll($event)">{{'timeSection.selectAll' | translate}}</j-checkbox>
            </div>
            <div class="jigsaw-day-section-picker-tile">
                <j-tile trackItemBy="value" [(selectedItems)]="value" (selectedItemsChange)="_$selectChange($event)">
                    <ng-container *ngFor="let day of _$dayList">
                        <j-tile-option *ngIf="!day.isLast; else lastDay" [value]="day" width="32">
                            {{day.label}}
                        </j-tile-option>
                        <ng-template #lastDay>
                            <j-tile-option *ngIf="showLastDay" [value]="day" jigsaw-float [jigsawFloatTarget]="lastDayTooltip"
                                           jigsawFloatPosition="topLeft"
                                           [jigsawFloatOptions]="{borderType: 'pointer'}">
                                {{day.label}}
                            </j-tile-option>
                        </ng-template>
                    </ng-container>
                </j-tile>
            </div>
        </div>
        <ng-template #lastDayTooltip>
            <div class="jigsaw-day-section-picker-tooltip">
                {{'timeSection.lastDayTooltip' | translate}}
            </div>
        </ng-template>
    `,
    host: {
        '[class.jigsaw-day-section-picker]': 'true',
        '[style.width]': 'width'
    }
})
export class JigsawDaySectionPicker extends AbstractJigsawComponent implements OnDestroy, OnInit {
    constructor(private _translateService: TranslateService) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            this._$dayList = this._createDayList();
        });
        let browserLang = _translateService.getBrowserLang();
        _translateService.setDefaultLang(browserLang);
        this._$dayList = this._createDayList();
    }

    private _langChangeSubscriber: Subscription;

    @Input()
    public value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[];

    @Output()
    public valueChange = new EventEmitter<ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[]>();

    @Input()
    public showLastDay: boolean;

    /**
     * @internal
     */
    public _$selectState: CheckBoxStatus;
    /**
     * @internal
     */
    public _$dayList: WeekAndDaySectionInfo[];

    private _createDayList() {
        return Array.from(new Array(32)).map((item, index) => {
            return index == 31 ? {
                label: this._translateService.instant('timeSection.lastDay'),
                value: this._getLastDayOfCurMonth(),
                isLast: true
            } : {label: index + 1, value: index + 1}
        });
    }

    private _getLastDayOfCurMonth() {
        let curDay = TimeService.convertValue('now', TimeGr.date);
        let lastDate = TimeService.getLastDateOfMonth(TimeService.getYear(curDay), TimeService.getMonth(curDay));
        return TimeService.getDay(lastDate);
    }

    /**
     * @internal
     */
    public _$toggleSelectAll($event) {
        if ($event == CheckBoxStatus.checked) {
            let days = this._$dayList.slice(0, this._$dayList.length - (this.showLastDay ? 0 : 1));
            this.value = new ArrayCollection([...days]);
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
        this._$selectState = this.value.length == (this.showLastDay ? this._$dayList.length : this._$dayList.length - 1) ? CheckBoxStatus.checked : this.value.length == 0 ?
            CheckBoxStatus.unchecked : CheckBoxStatus.indeterminate;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value) {
            this._setSelectState();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._langChangeSubscriber) {
            this._langChangeSubscriber.unsubscribe();
            this._langChangeSubscriber = null;
        }
    }
}

@Component({
    selector: 'jigsaw-time-section, j-time-section',
    template: `
        <div class="jigsaw-time-section-wrapper">
            <div class="jigsaw-time-section-time">
                <h3 class="jigsaw-time-section-time-title">{{'timeSection.timeTitle' | translate}}</h3>
                <j-time-section-picker [(value)]="_$timeValue" (valueChange)="_$selectChange($event, 'time')"></j-time-section-picker>
            </div>
            <div class="jigsaw-time-section-switch">
                <jigsaw-radios-lite [(value)]="_$switchType" (valueChange)="_$switchSetType($event)" [data]="_$switchList"
                                    trackItemBy="value">
                </jigsaw-radios-lite>
            </div>
            <div class="jigsaw-time-section-month" *ngIf="_$switchType.value == 0">
                <j-week-section-picker [(value)]="_$weekValue" (valueChange)="_$selectChange($event, 'week')"></j-week-section-picker>
            </div>
            <div class="jigsaw-time-section-week" *ngIf="_$switchType.value == 1">
                <j-day-section-picker [(value)]="_$dayValue" [showLastDay]="showLastDay"
                                      (valueChange)="_$selectChange($event, 'date')"></j-day-section-picker>
            </div>
        </div>
    `,
    host: {
        'class.jigsaw-time-section': 'true'
    }
})
export class JigsawTimeSection extends AbstractJigsawComponent implements OnDestroy {
    constructor(private _translateService: TranslateService) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            this._createSwitchList();
        });
        let browserLang = _translateService.getBrowserLang();
        _translateService.setDefaultLang(browserLang);
        this._createSwitchList();
    }

    private _langChangeSubscriber: Subscription;

    public _$switchList;
    public _$switchType;
    public _$timeValue;
    public _$weekValue;
    public _$dayValue;

    private _value: TimeSection;
    @Input()
    public get value(): TimeSection {
        return this._value;
    }

    public set value(value: TimeSection) {
        if (!value || value == this._value) return;
        this._$timeValue = value.time;
        this._$weekValue = value.week;
        this._$dayValue = value.date;
    }

    @Input()
    public showLastDay: boolean;

    private _createSwitchList() {
        this._$switchList = [
            {label: this._translateService.instant('timeSection.switchMonth'), value: 0},
            {label: this._translateService.instant('timeSection.switchWeek'), value: 1}
        ];
        this._$switchType = this._$switchType ? this._$switchList.find(s => s.value == this._$switchType.value) : this._$switchList[0];
    }

    public _$switchSetType($event) {

    }


    public _$selectChange($event, type: 'time' | 'week' | 'date') {

    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value) {

        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._langChangeSubscriber) {
            this._langChangeSubscriber.unsubscribe();
            this._langChangeSubscriber = null;
        }
    }
}

@NgModule({
    declarations: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawDaySectionPicker],
    imports: [
        JigsawCheckBoxModule, JigsawTileSelectModule, JigsawFloatModule, TranslateModule.forChild()
    ],
    exports: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawDaySectionPicker]
})
export class JigsawTimeSectionModule {

    constructor(translateService: TranslateService) {
        TimeService.deFineZhLocale();
        InternalUtils.initI18n(translateService, 'timeSection', {
            zh: {
                selectAll: "全选",
                lastDay: "最后一天",
                lastDayTooltip: "当前月份的最后一天",
                timeTitle: '时间',
                switchMonth: '按月',
                switchWeek: '按周'
            },
            en: {
                selectAll: 'Select All',
                lastDay: "Last Day",
                lastDayTooltip: "The last day of the current month",
                timeTitle: 'Time',
                switchMonth: 'Set Month',
                switchWeek: 'Set Week'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }

}
