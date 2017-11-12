export interface MenuData {
    title: string;
    extraLabel?: string;
    icon?: string;
    children?: MenuData[];
    [prop: string]: any;
}

