import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from "rxjs/Subject";
import 'rxjs';
import {ApiListService} from "./service/post-list.service";
import {Api} from "../../../model/api-model";

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {
  apiMap: any;
  apiMapBackup: any;
  search: string;
  search$ = new Subject<string>();
  firstReqReady: boolean = false; //防止初始加载时先渲染 “没有搜索到任何API"节点元素

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiListService: ApiListService) {
  }

  ngOnInit() {
    this.loadData();

    this.search$
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(keyword => {
        keyword = keyword.toLowerCase();
        this.apiMap = [];
        this.apiMapBackup.forEach(category => {
          let filtered;
          category[1].forEach(item => {
            if (item.type.toLowerCase().indexOf(keyword) == -1) {
              return;
            }
            if (!filtered) {
              filtered = [category[0], []];
            }
            filtered[1].push(item);
          });
          if (filtered) {
            this.apiMap.push(filtered);
          }
        });
      });
  }

  doSearch(searchVal: string): void {
    this.search$.next(searchVal);
  }

  public loadData() {
    this.apiListService.getApiList()
      .subscribe(
        res => {
          this.apiMap = res;
          this.apiMapBackup = res;
          this.firstReqReady = true;
        },
        error => {
          throw error
        }
      );
  }

  showApiDetail(api: Api) {
    this.router.navigate([api.category, api.type], {relativeTo: this.route.parent});
  }
}
