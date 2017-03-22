export type TableFieldMatcher = (field: string, index: number) => boolean;

export class ColumnSetting {
    constructor(public target: string | number | string[] | number[] | TableFieldMatcher,
                public visible: boolean,
                public width: string,) {

    }
}
