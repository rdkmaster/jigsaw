import {Component, OnInit} from '@angular/core';
import {Demo} from "./demo-config";
import {ActivatedRoute, Params} from '@angular/router';
import {ComponentMenuService} from "../../../service/component.service";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  demoList: Demo[] = [];
  selectedComponent: string;
  currentDemo: Demo;

  constructor(private componentService: ComponentMenuService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => {
        const compInfo = this.componentService.getComponentMenuNav(params['name']);
        if (!compInfo) {
          return;
        }
        this.selectedComponent = compInfo.router;
        this.updateDemoList();
      });
    this.componentService.loadDemoList().subscribe(() => this.updateDemoList());
  }

  updateDemoList() {
    if (!this.componentService.allDemoList || !this.selectedComponent) {
      return;
    }
    const demoInfo = this.componentService.allDemoList.find(info => info.name === this.selectedComponent);
    if (demoInfo && demoInfo.demos.length > 0) {
      this.demoList = demoInfo.demos;
      const hash = `#/components/${this.selectedComponent.toLowerCase()}/demo`;
      this.currentDemo = this.demoList.find(demo => location.hash === `${hash}/${demo.desc}`);
      this.currentDemo = this.currentDemo ? this.currentDemo : this.demoList[0];
    } else {
      console.error('no demo info found, name=' + this.selectedComponent);
      this.demoList = [];
    }
  }

  getHref(title: string) {
    return "#/components/" + this.selectedComponent.toLowerCase() + "/demo/" + title;
  }

  setSelect(demoInfo) {
    this.currentDemo = demoInfo;
  }

  isActive(title) {
    return this.currentDemo.desc == title;
  }
}
