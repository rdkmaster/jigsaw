export class MenuData {
    title: string;
    extraLabel?: string;
    icon?: string;
    children?: MenuData[];
    [prop: string]: any;
}

export type MenuCallback = (menuItem: MenuData) => void;
