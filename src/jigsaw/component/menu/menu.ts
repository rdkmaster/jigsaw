import {
    NgModule,
    Component,
    Input,
    Output,
    ElementRef,
    Renderer2,
    EventEmitter,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    ChangeDetectorRef
} from "@angular/core";

import {
    PopupOptions,
    PopupService,
    PopupEffect,
    PopupInfo,
    PopupPositionType
} from "../../service/popup.service";
import {CommonUtils} from "../../core/utils/common-utils";
import {AbstractDialogComponentBase} from "../dialog/dialog";
import {JigsawMenuItem} from "./menuItem"
import {CommonModule} from "@angular/common";

export interface MenuData {
    label: string,        // 菜单的主文本
    extraLabel?: string,  // 菜单的附加文本，未定义则不显示
    icon?: string,        // 菜单的图标
    children?: MenuData[] // 菜单的子节点
    [prop: string]: any;  // 应用自定义数据
}

export type MenuCallback = (menuItem: MenuData) => void

@Component({
    selector: 'jigsaw-menu,j-menu',
    template: `
        <div class="jigsaw-menu">
            <ng-template #container></ng-template>
        </div>`,
    host: {
        '[style.width]': 'width'
    }
})
export class JigsawMenu extends AbstractDialogComponentBase {
    constructor(private cfr: ComponentFactoryResolver, private cdr: ChangeDetectorRef, public elementRef: ElementRef, public renderer: Renderer2) {
        super();
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;
    @Input() data: MenuData[];
    @Output() select: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    ngOnInit() {
        this.data.forEach(e => {
            this.addLi(e)
        });
        this.cdr.detectChanges();
    }

    onSelect(date: MenuData) {
        this.select.emit(date);
    }

    private addLi(data: MenuData) {
        let menuItemRef = this.container.createComponent(this.cfr.resolveComponentFactory(JigsawMenuItem));
        menuItemRef.instance.data = data;
        menuItemRef.instance.selectItem.subscribe(info => this.onSelect(info));
    }

    @Input()
    public set initData(value: any) {
        if (!value) return;
        this.data = value.data || 'the "message" property in the initData goes here.';
        this.onSelect = value.onSelect;
    }

    static existMenu: boolean = false;

    static show(data: MenuData[], callback?: MenuCallback, popupOptions?: PopupOptions) {
        const popupOption = {
            modal: false,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            posType: PopupPositionType.absolute,
            showBorder: false
        };

        if (JigsawMenu.existMenu) return;
        const popupInfo = PopupService.instance.popup(JigsawMenu, popupOptions || popupOption,
            {data: data, onSelect: menuItem => popupInfo.answer.emit(menuItem)});

        popupInfo.answer.subscribe(answer => {
            CommonUtils.safeInvokeCallback(null, callback, [answer]);
            popupInfo.answer.unsubscribe();
            popupInfo.dispose();
            JigsawMenu.existMenu = false;
        });

        JigsawMenu.existMenu = true;
        return popupInfo;
    };
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawMenu, JigsawMenuItem],
    exports: [JigsawMenu],
    entryComponents: [JigsawMenuItem]
})
export class JigsawMenuModule {
}
