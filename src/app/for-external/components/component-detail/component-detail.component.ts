import {AfterViewChecked, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentMenuService} from "../service/component.service";
import {PerfectScrollbarDirective} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit, AfterViewChecked {

  isShowTab: boolean = false;

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor(private componentService: ComponentMenuService,
              private route: ActivatedRoute,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.componentService.perfectScrollbar = this.directiveScroll;

    this.route.params.subscribe(params => {
      const menu = this.componentService.getComponentMenuNav(params.name);
      this.isShowTab = menu && !menu.docOnly;
    });
  }

  ngAfterViewChecked(): void {
    this.zone.runOutsideAngular(() => {
      this.directiveScroll.update();
    });
  }
}
