import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    Renderer2,
    ElementRef
} from "@angular/core";

import {MenuData} from "./menu";

@Component({
    template: `
        <div class="jigsaw-menu-content">
            <div class="jigsaw-menu-item" [ngClass]="{'jigsaw-menu-arrow': data.children}"><i *ngIf="data.icon"
                                                                                              class="fa fa-{{data.icon}}"></i>{{data.label}}
            </div>
            <div *ngIf="data.children" class="jigsaw-menu jigsaw-menu-child" [ngClass]="{'jigsaw-menu-hide': hide}">
                <ng-container #container></ng-container>
            </div>
        </div>`,
})
export class JigsawMenuItem {
    constructor(private cfr: ComponentFactoryResolver, private renderer: Renderer2, private elementRef: ElementRef) {
    }

    @Input() data: MenuData;
    @Output() selectItem: EventEmitter<MenuData> = new EventEmitter<MenuData>();
    @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;

    private display: boolean = false;
    private hide: boolean = true;

    private addLi(data: MenuData) {
        let menuItemRef = this.container.createComponent(this.cfr.resolveComponentFactory(JigsawMenuItem));
        menuItemRef.instance.data = data;
        menuItemRef.instance.selectItem.subscribe(info => this.selectItem.emit(info));  //层层订阅是否会有性能问题
    }

    ngOnInit() {
        if (this.data.children) {
            this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.onMouseEnter());
            this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => this.onMouseLeave());
        }
    }

    onMouseEnter() {
        if (!this.display) {
            this.data.children.forEach(e => {
                this.addLi(e)
            });
            this.display = true;
        }
        this.hide = false;
    }

    onMouseLeave() {
        this.hide = true;
    }

    @HostListener('click', ['$event'])
    onClick(even: any) {
        even.stopPropagation();
        this.selectItem.emit(this.data);
    }
}
