import {
    NgModule, Component, Input, Renderer, ElementRef, Optional, ContentChildren, forwardRef,
    QueryList, AfterContentInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

export class PanelValue{
    key: number;
    head: any;
    content: any;
}

@Component({
    selector: 'rdk-collapse',
    templateUrl: 'collapse.html',
    styleUrls: ['collapse.scss'],
    host: {
        '[style.width.px]': 'width',
    }
})
export class CollapseComponent implements AfterContentInit{
    @Input()
    width: number = 400;

    @Input()
    panelModel: boolean = true;

    openedPanelKeys: number[] = [];

    @ContentChildren(forwardRef(() => PanelComponent)) panelList: QueryList<PanelComponent>;

    constructor(){}

    _undatePanelOpen(key){
        this.panelList.forEach(panel => {
            if(panel.panelValue.key != key){
                panel.close();
            }
        })
    }

    ngAfterContentInit(){
        this.panelList.changes.subscribe(() => {
            console.log(1111);
        });
    }

}

@Component({
    selector: 'rdk-panel',
    templateUrl: 'panel.html',
    styleUrls: ['panel.scss'],
    host: {
        '[class.opened]': 'opened'
    }
})
export class PanelComponent{
    @Input()
    panelValue: PanelValue;
    opened: boolean;

    collapse: CollapseComponent;

    constructor(private _renderer: Renderer, private _el: ElementRef, @Optional() collapse: CollapseComponent){
        this.collapse = collapse;
    }

    onClick(){
        !this.opened ? this.open() : this.close();
    }

    open(){
        if(!this.opened){
            this.opened = true;
            let contentWidth = this._el.nativeElement.querySelector(".content p").offsetHeight;
            this._renderer.setElementStyle(this._el.nativeElement.querySelector(".content"), "height", contentWidth + "px");
            this.collapse.openedPanelKeys.push(this.panelValue.key);
            this.collapse.panelModel && this.collapse._undatePanelOpen(this.panelValue.key);
        }
    }

    close(){
        if(this.opened){
            this.opened = false;
            this._renderer.setElementStyle(this._el.nativeElement.querySelector(".content"), "height", "0");
            this.collapse.openedPanelKeys.indexOf(this.panelValue.key) != -1 ?
                this.collapse.openedPanelKeys.splice(this.collapse.openedPanelKeys.indexOf(this.panelValue.key), 1) : null;
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [CollapseComponent, PanelComponent],
    exports: [CollapseComponent, PanelComponent]
})
export class CollapseModule{

}









