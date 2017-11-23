import {
  NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList,
  ElementRef, ViewChild, AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef, forwardRef
} from "@angular/core";
import { NgTemplateOutlet } from '@angular/common';
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {AbstractJigsawComponent} from "jigsaw/component/common";

@Component({
  selector: 'context-menu',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MenuContext extends AbstractJigsawComponent {
  @Input()
  public data: any;

  @ViewChild('menu') public menuElement: ElementRef;
  public isShown = false;
  private mouseLocation = { left: '0px', top: '0px', marginLeft: '0px', marginTop: '0px' };
  count = 1;
  labels = [];
  visible: any[] = [[], [], [], [], [], []];
  selectedItems1: string;
  handleSelect(selectedItems, index, main) {
      this.count = index;
      this.selectedItems1 = selectedItems.map(item => item.label).toString();
      if (index > 0) {
          for (let j in this.visible[index]) {
              this.visible[index][j] = false;
          }
      }
      if (index > 1) {
          for(let r in this.visible[index - 1]){
              this.visible[index - 1][r] = false;
          }
          this.visible[index - 1][main] = true;
      }
      if (this.visible.length >= index) {
          for (let q = index; q < this.visible.length; q++) {
              for (let m in this.visible[q]) {
                  this.visible[q][m] = false;
              }
          }
      }
      this.visible[index][this.selectedItems1] = true;
  }
  onContextMenu(event) {
    this.mouseLocation.left = event.offsetX  + 'px';
    this.mouseLocation.top = event.offsetY  + 'px';
    this.isShown = true;
    this.labels = this.data;
    this.visible = [[], [], [], [], [], []];  // 重置
    this.visible[0][0] = true;
    const menuWidth = this.menuElement ? this.menuElement.nativeElement.clientWidth : 200;
    const menuHeight = this.menuElement ? this.menuElement.nativeElement.clientHeight : 100;
    this.mouseLocation.marginLeft = '0px';
    this.mouseLocation.marginTop = '0px';
    const bodyWidth = event.target.offsetWidth;
    const bodyHeight = event.target.offsetHeight;
    const distanceFromRight = bodyWidth - (event.offsetX + menuWidth);
    const distanceFromBottom = bodyHeight - (event.offsetY + menuHeight);
    if (distanceFromRight < 0 && event.offsetX > bodyWidth / 2) {
      this.mouseLocation.marginLeft = '-' + menuWidth + 'px';
    }
    if (distanceFromBottom < 0 && event.offsetY > bodyHeight / 2) {
      this.mouseLocation.marginTop = '-' + menuHeight + 'px';
    }
    event.preventDefault();
  }
  get locationCss(): any {
    return {
      'position': 'absolute',
      'display': this.isShown ? 'block' : 'none',
      'left': this.mouseLocation.left,
      'marginLeft': this.mouseLocation.marginLeft,
      'marginTop': this.mouseLocation.marginTop,
      'top': this.mouseLocation.top,
    };
  }
}

@NgModule({
  imports: [JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawButtonModule],
  declarations: [MenuContext],
  exports: [MenuContext]
})

export class MenuContextModule {
}
