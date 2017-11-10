export type MenuData = {
    label: string,
    extraLabel?: string,
    icon?: string,
    children?: MenuData[],
    [prop: string]: any,
}

