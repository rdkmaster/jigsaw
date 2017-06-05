
import {Time} from "../../service/time.service";

export class RangeTimeDataRanges{
    public static RecentMonth():[Time,Time]{
        let start = moment().date(1);
        let end = moment();
        return [start,end];
    }
    public static LastMonth():[Time,Time]{
       let start = moment().add(-1,"months").date(1);
       let end = moment().date(1).add(-1,"days");
       return [start,end];
    }

    public static RecentWeek():[Time,Time]{
        let start = moment().day(1);
        let end = moment();
        return [start,end]
    }
    public static LastWeek():[Time,Time]{
        let start = moment().add(-1,"weeks").day(1);
        let end = moment().day(1).add(-1,"days");
        return [start,end];
    }


    public static ThreeDaysAgo():[Time,Time]{
        let start = moment().add(-3,"days");
        let end = moment();
        return [start,end];
    }

    public static ThreeDaysLater():[Time,Time]{
        let start = moment();
        let end= moment().add(3,"days");
        return [start,end];
    }

    public static FiveDaysAgo():[Time,Time]{
        let start = moment().add(-5,"days");
        let end = moment();
        return [start,end];
    }

    public static FiveDaysLater():[Time,Time]{
        let start = moment();
        let end= moment().add(5,"days");
        return [start,end];
    }

    public static OneWeekAgo():[Time,Time]{
        let start = moment().add(-1,"weeks");
        let end = moment();
        return [start,end];
    }

    public static OneWeekLater():[Time,Time]{
        let start = moment();
        let end= moment().add(1,"weeks");
        return [start,end];
    }

    public static TwoWeeksAgo():[Time,Time]{
        let start = moment().add(-2,"weeks");
        let end = moment();
        return [start,end];
    }

    public static TwoWeeksLater():[Time,Time]{
        let start = moment();
        let end= moment().add(2,"weeks");
        return [start,end];
    }

    public static OneMonthAgo():[Time,Time]{
        let start = moment().add(-1,"months");
        let end = moment();
        return [start,end];
    }

    public static OneMonthLater():[Time,Time]{
        let start = moment();
        let end= moment().add(1,"months");
        return [start,end];
    }

    public static TwoMonthsAgo():[Time,Time]{
        let start = moment().add(-2,"months");
        let end = moment();
        return [start,end];
    }

    public static TwoMonthsLater():[Time,Time]{
        let start = moment();
        let end= moment().add(2,"months");
        return [start,end];
    }
}
