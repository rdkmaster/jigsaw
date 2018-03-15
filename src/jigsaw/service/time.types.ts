export interface Moment {
    _isAMomentObject: boolean;
    [prop: string]: any;
}

export type Time = Date | string | Moment;


export interface TimeWeekDay {
    week: number;
    year: number;
}

export type WeekTime = Time | TimeWeekDay;
