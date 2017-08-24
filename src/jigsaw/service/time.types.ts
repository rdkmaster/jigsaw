export type Moment = {
    _isAMomentObject: boolean,
    [prop: string]: any
}

export type Time = Date|string|Moment;


export type TimeWeekDay = {
    week: number,
    year: number
}

export type WeekTime = Time | TimeWeekDay;
