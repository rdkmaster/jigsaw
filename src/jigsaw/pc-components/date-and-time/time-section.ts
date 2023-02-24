import {
    Component,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Output,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Injector,
    forwardRef,
    HostListener,
    AfterViewInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {CheckBoxStatus} from "../checkbox/typings";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {TimeGr, TimeService} from "../../common/service/time.service";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {Time} from "../../common/service/time.types";
import {JigsawRadioLiteModule} from "../radio/radio-lite";

export type TimeSectionInfo = {
    section: string,
    isSelected: boolean
}

export type WeekAndDaySectionInfo = {
    label?: string | number,
    value: number,
    lastDay?: boolean
}

/**
 * @internal
 */
export type TimeSection = {
    time?: string[],
    week?: WeekAndDaySectionInfo[],
    date?: WeekAndDaySectionInfo[],
    everyday?: boolean
}

export type TimeSectionValue = TimeSection;

@WingsTheme('time-section.scss')
@Component({
    selector: 'jigsaw-time-section-picker, j-time-section-picker',
    template: `
        <div class="jigsaw-time-section-picker-line" [class.jigsaw-time-section-picker-multiple]="multipleSelect">
            <j-checkbox *ngIf="multipleSelect" [theme]="theme" [(checked)]="_$amTimeCheck"
                        (checkedChange)="_$changeAmPmState($event, 'am')"></j-checkbox>
            <div class="jigsaw-time-section-picker-hour">
                <ul>
                    <li *ngFor="let section of _$amTimeSection" (click)="_$timeSelect(section)"
                        [class.jigsaw-time-section-picker-selected]="section.isSelected"></li>
                </ul>
                <div>
                    <span *ngFor="let time of _$amTimeline">{{time}}</span>
                </div>
            </div>
        </div>
        <div class="jigsaw-time-section-picker-line" [class.jigsaw-time-section-picker-multiple]="multipleSelect">
            <j-checkbox *ngIf="multipleSelect" [theme]="theme" [(checked)]="_$pmTimeCheck"
                        (checkedChange)="_$changeAmPmState($event, 'pm')"></j-checkbox>
            <div class="jigsaw-time-section-picker-hour">
                <ul [class.jigsaw-time-section-picker-multiple]="multipleSelect">
                    <li *ngFor="let section of _$pmTimeSection" (click)="_$timeSelect(section)"
                        [class.jigsaw-time-section-picker-selected]="section.isSelected"></li>
                </ul>
                <div>
                    <span *ngFor="let time of _$pmTimeline">{{time}}</span>
                </div>
            </div>
        </div>
    `,
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-time-section-picker-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimeSectionPicker extends AbstractJigsawComponent implements OnDestroy {
    constructor(private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }

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

    /**
     * @NoMarkForCheckRequired
     */
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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean = true;

    @Output()
    public valueChange = new EventEmitter();

    /**
     * @internal
     */
    public _$timeSelect(sectionInfo: TimeSectionInfo) {
        if (this.multipleSelect) {
            sectionInfo.isSelected = !sectionInfo.isSelected;
            this._checkAmPmSelect();
        } else {
            sectionInfo.isSelected = true;
            this._changeAmPmSingleSelect(sectionInfo);
        }
        this._updateValueBySection(sectionInfo);
        this._updateValue();
        this._cdr.markForCheck();
    }

    private _changeSelectViewByValue() {
        this._updateSelectState(this._$amTimeSection);
        this._updateSelectState(this._$pmTimeSection);
        this._checkAmPmSelect();
        this._cdr.markForCheck();
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
        return sections.every(s => !!s.isSelected) ? CheckBoxStatus.checked :
            sections.some(s => !!s.isSelected) ? CheckBoxStatus.indeterminate : CheckBoxStatus.unchecked;
    }

    /**
     * @internal
     */
    public _$changeAmPmState($event, type: 'am' | 'pm') {
        const timeSection = type == 'am' ? this._$amTimeSection : this._$pmTimeSection;
        timeSection.forEach(sectionInfo => {
            sectionInfo.isSelected = !!$event;
            this._updateValueBySection(sectionInfo);
        });
        this._updateValue();
        this._cdr.markForCheck();
    }

    private _updateValueBySection(sectionInfo: TimeSectionInfo) {
        if (this.multipleSelect) {
            const found = this.value.find(v => v == sectionInfo.section);
            if (sectionInfo.isSelected && !found) {
                this.value.push(sectionInfo.section);
            } else if (!sectionInfo.isSelected && found) {
                let index = this.value.findIndex(v => v == sectionInfo.section);
                this.value.splice(index, 1);
            }
        } else {
            this.value.splice(0, this.value.length, sectionInfo.section)
        }
    }

    private _updateValue() {
        this.value.sort();
        this.valueChange.emit(this.value);
    }

    private _changeAmPmSingleSelect(sectionInfo: TimeSectionInfo) {
        this._singleSelectChange(sectionInfo, this._$amTimeSection);
        this._singleSelectChange(sectionInfo, this._$pmTimeSection);
    }

    private _singleSelectChange(sectionInfo: TimeSectionInfo, sections: TimeSectionInfo[]) {
        sections.forEach(s => {
            if (s.section != sectionInfo.section) {
                s.isSelected = false
            }
        })
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this._valueOnRefreshRemoval) {
            this._valueOnRefreshRemoval();
        }
    }
}

@WingsTheme('time-section.scss')
@Component({
    selector: 'jigsaw-week-section-picker, j-week-section-picker',
    template: `
        <j-checkbox *ngIf="multipleSelect" [theme]="theme" [(checked)]="_$selectState"
                    (checkedChange)="_$toggleSelectAll($event)">{{'timeSection.selectAll' | translate}}</j-checkbox>
        <j-tile [theme]="theme" trackItemBy="value" [(selectedItems)]="value" [multipleSelect]="multipleSelect"
                (selectedItemsChange)="_$selectChange($event)">
            <j-tile-option *ngFor="let week of _$weekList" [value]="week" width="42" height="26">
                {{week.label}}
            </j-tile-option>
        </j-tile>
    `,
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-week-section-picker-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawWeekSectionPicker extends AbstractJigsawComponent implements OnDestroy, OnInit {
    constructor(private _translateService: TranslateService, private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            TimeService.setLocale(langInfo.curLang);
            this._$weekList = this._createWeekList();
        });
        // 组件依赖的第三方库moment.js需要在创建时读取国际化数据
        const currentLang = _translateService.currentLang ? _translateService.currentLang : _translateService.getBrowserLang();
        TimeService.setLocale(currentLang);
        this._$weekList = this._createWeekList();
    }

    private _value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[];
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[] {
        return this._value;
    }

    public set value(value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[]) {
        this._value = value;
        this._setSelectState();
        this._cdr.markForCheck();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean = true;

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

    /**
     * @internal
     */
    public _$selectChange($event) {
        $event.sort((a, b) => a.value - b.value);
        this.valueChange.emit($event);
        this._setSelectState();
    }

    private _setSelectState() {
        this._$selectState = !this.value || this.value.length == 0 ? CheckBoxStatus.unchecked :
            this.value.length == this._$weekList.length ? CheckBoxStatus.checked : CheckBoxStatus.indeterminate;
        this._cdr.markForCheck();
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

@WingsTheme('time-section.scss')
@Component({
    selector: 'jigsaw-day-section-picker, j-day-section-picker',
    template: `
        <div class="jigsaw-day-section-picker-wrapper">
            <div class="jigsaw-day-section-picker-checkbox" *ngIf="multipleSelect" k>
                <j-checkbox [theme]="theme" [(checked)]="_$selectState"
                            (checkedChange)="_$toggleSelectAll($event)">{{'timeSection.selectAll' | translate}}</j-checkbox>
            </div>
            <div class="jigsaw-day-section-picker-tile">
                <j-tile [theme]="theme" trackItemBy="value,lastDay" [(selectedItems)]="value" [multipleSelect]="multipleSelect"
                        (selectedItemsChange)="_$selectChange($event)">
                    <ng-container *ngFor="let day of _$dayList">
                        <j-tile-option *ngIf="!day.lastDay; else lastDay" [value]="day" width="26" height="26">
                            {{day.label}}
                        </j-tile-option>
                        <ng-template #lastDay>
                            <j-tile-option *ngIf="showLastDay" [value]="day" jigsaw-float
                                           [jigsawFloatTarget]="lastDayTooltip"
                                           jigsawFloatPosition="topLeft" height="26"
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
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-day-section-picker-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDaySectionPicker extends AbstractJigsawComponent implements OnDestroy, OnInit {
    constructor(private _translateService: TranslateService, private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            this._$dayList = this._createDayList();
        });
    }

    private _langChangeSubscriber: Subscription;

    private _value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[];
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[] {
        return this._value;
    }

    public set value(value: ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[]) {
        this._value = value;
        if (this.initialized) {
            this._setSelectState();
            this._cdr.markForCheck();
        }
    }

    @Output()
    public valueChange = new EventEmitter<ArrayCollection<WeekAndDaySectionInfo> | WeekAndDaySectionInfo[]>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showLastDay: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public currentTime: Time;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean = true;

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
                lastDay: true
            } : {label: index + 1, value: index + 1}
        });
    }

    private _getLastDayOfCurMonth() {
        let date = this.currentTime ? this.currentTime : 'now';
        let curDay = TimeService.convertValue(date, TimeGr.date);
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

    /**
     * @internal
     */
    public _$selectChange($event) {
        $event.sort((a, b) => a.value - b.value);
        this.valueChange.emit($event);
        this._setSelectState();
    }

    private _setSelectState() {
        this._$selectState = !this.value || this.value.length == 0 ? CheckBoxStatus.unchecked :
            this.value.length == (this.showLastDay ? this._$dayList.length : this._$dayList.length - 1) ?
                CheckBoxStatus.checked : CheckBoxStatus.indeterminate;
    }

    ngOnInit() {
        super.ngOnInit();
        this._$dayList = this._createDayList();
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

@WingsTheme('time-section.scss')
@Component({
    selector: 'jigsaw-time-section, j-time-section',
    template: `
        <div class="jigsaw-time-section-wrapper" [class.jigsaw-time-section-horizontal]="layout == 'horizontal'">
            <div class="jigsaw-time-section-time" *ngIf="showHour">
                <span class="jigsaw-time-section-time-title">{{'timeSection.timeTitle' | translate}}</span>
                <j-time-section-picker [theme]="theme" [(value)]="_$timeValue" [multipleSelect]="multipleHour" (valueChange)="_$selectChange()">
                </j-time-section-picker>
            </div>
            <div class="jigsaw-time-section-switch-wrapper" *ngIf="showWeek || showDate || showEveryday">
                <div class="jigsaw-time-section-switch" *ngIf="_$switchList && _$switchList.length > 1">
                    <jigsaw-radios-lite [theme]="theme" [(value)]="_$selectType" (valueChange)="_$selectChange()" [data]="_$switchList" trackItemBy="value">
                    </jigsaw-radios-lite>
                </div>
                <div *ngIf="_$byMonth" class="jigsaw-time-section-month">
                    <j-day-section-picker [theme]="theme" [(value)]="_$dateValue" [showLastDay]="showLastDay" [currentTime]="currentTime"
                                          [multipleSelect]="multipleDate" (valueChange)="_$selectChange()">
                    </j-day-section-picker>
                </div>
                <div *ngIf="_$byWeek" class="jigsaw-time-section-week">
                    <j-week-section-picker [theme]="theme" [(value)]="_$weekValue" [multipleSelect]="multipleDate" (valueChange)="_$selectChange()">
                    </j-week-section-picker>
                </div>
                <div *ngIf="_$useEveryday" class="jigsaw-time-section-everyday">
                </div>
            </div>
        </div>
    `,
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-time-section-host]': 'true',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTimeSection), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimeSection extends AbstractJigsawComponent implements OnDestroy, AfterViewInit, ControlValueAccessor {
    constructor(private _translateService: TranslateService, private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(() => {
            this._updateSwitchList();
        });
    }

    private _langChangeSubscriber: Subscription;

    /**
     * @internal
     */
    public _$switchList;
    /**
     * @internal
     */
    public _$selectType;
    /**
     * @internal
     */
    public _$timeValue;
    /**
     * @internal
     */
    public _$weekValue;
    /**
     * @internal
     */
    public _$dateValue;
    /**
     * @internal
     */
    public get _$byMonth(): boolean {
        return (this._$switchList && this._$switchList.length > 1 && this._$selectType && this._$selectType.value == 0) ||
            (this.showDate && !this.showEveryday && !this.showWeek);
    }
    /**
     * @internal
     */
    public get _$byWeek(): boolean {
        return (this._$switchList && this._$switchList.length > 1 && this._$selectType && this._$selectType.value == 1) ||
            (this.showWeek && !this.showEveryday && !this.showDate);
    }
    /**
     * @internal
     */
    public get _$useEveryday(): boolean {
        return (this._$switchList && this._$switchList.length > 1 && this._$selectType && this._$selectType.value == 2) ||
            (this.showEveryday && !this.showWeek && !this.showDate);
    }

    private _value: TimeSection;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): TimeSection {
        return this._value;
    }

    public set value(value: TimeSection) {
        if (!value || value == this._value) {
            return;
        }
        this._value = value;
        this.update();
    }

    public update(): void {
        if (!this.initialized) {
            return;
        }

        if (this.value) {
            this._$timeValue = this.value.time;
            this._$weekValue = this.value.week;
            this._$dateValue = this.value.date;
        }

        // 注意这个if过后，this._$selectType的值有可能是undefined
        if (this._$switchList) {
            if (this.value && this.value.everyday) {
                this._$selectType = this._$switchList.find(type => type.value == 2);
            } else if (this._$weekValue) {
                this._$selectType = this._$switchList.find(type => type.value == 1);
            } else {
                this._$selectType = this._$switchList.find(type => type.value == 0);
            }
        }

        this._cdr.markForCheck();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showLastDay: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public currentTime: Time;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public layout: 'horizontal' | 'vertical' = 'vertical';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showHour: boolean = true;

    private _showDate: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get showDate(): boolean {
        return this._showDate;
    }

    public set showDate(value: boolean) {
        this._showDate = !!value;
        this._updateSwitchList();
    }

    private _showWeek: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get showWeek(): boolean {
        return this._showWeek;
    }

    public set showWeek(value: boolean) {
        this._showWeek = !!value;
        this._updateSwitchList();
    }

    private _showEveryday: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get showEveryday(): boolean {
        return this._showEveryday;
    }

    public set showEveryday(value: boolean) {
        this._showEveryday = !!value;
        this._updateSwitchList();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleHour: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleDate: boolean = true;

    @Output()
    public valueChange = new EventEmitter<TimeSection>();

    private _updateSwitchList() {
        this._$switchList = [];
        if (this.showDate) {
            this._$switchList.push({label: this._translateService.instant('timeSection.switchMonth'), value: 0});
        }
        if (this.showWeek) {
            this._$switchList.push({label: this._translateService.instant('timeSection.switchWeek'), value: 1});
        }
        if (this.showEveryday) {
            this._$switchList.push({label: this._translateService.instant('timeSection.switchEveryday'), value: 2});
        }
        this._$selectType = this._$selectType ? this._$switchList.find(s => s.value == this._$selectType.value) : this._$switchList[0];
    }

    /**
     * @internal
     */
    public _$selectChange() {
        const value = {};
        if (this.showHour) {
            Object.assign(value, {time: this._$timeValue});
        }
        if (this._$byMonth) {
            Object.assign(value, {date: this._$dateValue});
        } else if (this._$byWeek) {
            Object.assign(value, {week: this._$weekValue})
        } else if (this._$useEveryday) {
            Object.assign(value, {everyday: true})
        }
        this.writeValue(value);
    }

    public writeValue(value: any): void {
        this._value = value;
        this.valueChange.emit(value);
        this._propagateChange(this._value);
    }

    ngAfterViewInit() {
        this._updateSwitchList();
        this.update();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._langChangeSubscriber) {
            this._langChangeSubscriber.unsubscribe();
            this._langChangeSubscriber = null;
        }
    }

    private _propagateChange: any = () => {
    };
    private _onTouched: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    @HostListener('click')
    onClickTrigger(): void {
        this._onTouched();
    }
}

@NgModule({
    declarations: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawDaySectionPicker],
    imports: [
        JigsawCheckBoxModule, JigsawTileSelectModule, JigsawFloatModule, JigsawRadioLiteModule, TranslateModule.forChild()
    ],
    exports: [JigsawTimeSection, JigsawTimeSectionPicker, JigsawWeekSectionPicker, JigsawDaySectionPicker]
})
export class JigsawTimeSectionModule {
    constructor() {
        TimeService.deFineZhLocale();
        TranslateHelper.initI18n('timeSection', {
            zh: {
                selectAll: "全选",
                lastDay: "最后一天",
                lastDayTooltip: "当前月份的最后一天",
                timeTitle: '时间',
                switchMonth: '按月',
                switchWeek: '按周',
                switchEveryday: '每天'
            },
            en: {
                selectAll: 'Select All',
                lastDay: "Last Day",
                lastDayTooltip: "The last day of the current month",
                timeTitle: 'Time',
                switchMonth: 'Month Day',
                switchWeek: 'Week Day',
                switchEveryday: 'Everyday'
            }
        });
    }

}
