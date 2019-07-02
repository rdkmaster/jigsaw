export class DragDropInfo {
    public event: DragEvent;
    public element: HTMLElement;

    /**
     * @param event 参考`event`的说明
     * @param element 参考`element`的说明
     */
    constructor(event: DragEvent, element: HTMLElement) {
        this.event = event;
        this.element = element;
    }

    public get dragDropData(): any {
        const v = JSON.parse(this.event.dataTransfer.getData('text'));
        return v.hasOwnProperty("__jigsaw_internal_property__") ? v['__jigsaw_internal_property__'] : v;
    }

    public set dragDropData(value: any) {
        value = value ? value : '';
        value = typeof value === 'string' ? {__jigsaw_internal_property__: value} : value;
        this.event.dataTransfer.setData('text', JSON.stringify(value));
    }
}
