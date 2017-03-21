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

    public openedPanelKeys: number[] = [];

    @ContentChildren(forwardRef(() => PanelComponent))
    private _panelList: QueryList<PanelComponent>;

    constructor(){}

    public undatePanelOpen(key){
        this._panelList.forEach(panel => {
            if(panel.panelValue.key != key){
                panel.close();
            }
        })
    }

    ngAfterContentInit(){
        this._panelList.changes.subscribe(() => {
            console.log(1111);
        });
    }

}

@Component({
    selector: 'rdk-panel',
    templateUrl: 'panel.html',
    styleUrls: ['panel.scss'],
    host: {
        '[class.rdk-panel-opened]': '_opened'
    }
})
export class PanelComponent{
    @Input()
    panelValue: PanelValue;

    private _opened: boolean;

    private _collapse: CollapseComponent;

    constructor(private _renderer: Renderer, private _el: ElementRef, @Optional() collapse: CollapseComponent){
        this._collapse = collapse;
    }

    private _onClick(){
        !this._opened ? this.open() : this.close();
    }

    public open(){
        if(!this._opened){
            this._opened = true;
            let contentWidth = this._el.nativeElement.querySelector(".rdk-panel-content p").offsetHeight;
            this._renderer.setElementStyle(this._el.nativeElement.querySelector(".rdk-panel-content"), "height", contentWidth + "px");
            this._collapse.openedPanelKeys.push(this.panelValue.key);
            this._collapse.panelModel && this._collapse.undatePanelOpen(this.panelValue.key);
        }
    }

    public close(){
        if(this._opened){
            this._opened = false;
            this._renderer.setElementStyle(this._el.nativeElement.querySelector(".rdk-panel-content"), "height", "0");
            this._collapse.openedPanelKeys.indexOf(this.panelValue.key) != -1 ?
                this._collapse.openedPanelKeys.splice(this._collapse.openedPanelKeys.indexOf(this.panelValue.key), 1) : null;
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









