export class Moment {
    _isAMomentObject: boolean;
    [prop: string]: any;
}

export type Time = Date | string | Moment;


export class TimeWeekDay {
    week: number;
    year: number;
}

export type WeekTime = Time | TimeWeekDay;
