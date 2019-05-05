/**
 * Created by 10177553 on 2017/3/28.
 */

import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest} from "rxjs/observable/combineLatest";
import {AbstractGraphData} from "jigsaw/common/core/data/graph-data";
import {EchartOptions} from "jigsaw/common/core/data/echart-types";
import {JigsawGraph} from "jigsaw/pc-components/graph/graph";
import {JigsawInput} from "jigsaw/pc-components/input/input";

@Component({
    templateUrl: './demo.component.html'
})

export class GraphFormatterComponent implements OnInit,AfterViewChecked {
    data: AbstractGraphData;
    @ViewChild("graph") graph: JigsawGraph;


    ngOnInit() {
        this.data = new GraphDataDemo();
    }
    ngAfterViewChecked(){
        if(this.graph){
            this.graph.mouseover.debounceTime(500).subscribe((event) =>{
                if(event.targetType == "axisLabel" ){
                    this.addSpan(this.graph,event);
                }
            });
            this.graph.mouseout.debounceTime(500).subscribe((event) =>{
                    this.deleteSpan(this.graph);
            });
        }
    }
    addSpan(graph,event){
        let p = graph._elementRef.nativeElement;
        let w = p.offsetWidth/2;
        let span = document.createElement("span");
        let css = `position: absolute;
                  color: rgb(255, 255, 255); 
                  background: rgba(125, 125, 125, 0.9); 
                  display: inline-block; 
                  padding: 5px; 
                  border: 1px solid rgb(0, 0, 0); 
                  border-radius: 4px;`;
        span.style.cssText = css;
        let left = event.event.offsetX;
        span.style.left = left + 'px';
        if(w<left){
            span.style.left = (left - (event.value.length*5)) + "px";
        }
        span.style.top = event.event.offsetY + 'px';
        span.innerHTML = event.value;
        this.deleteSpan(graph);
        p.appendChild(span);
    }
    deleteSpan(graph){
        let p = graph._elementRef.nativeElement;
        let len = p.childNodes.length;
        for(let i = 0 ;i < len;i = i+1){
            if(p.childNodes[i].tagName){
                if(p.childNodes[i].tagName.toLowerCase()=="span"){
                    p.removeChild(p.childNodes[i]);
                }
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawGraph.resize',
    ];
}
export class GraphDataDemo extends AbstractGraphData {
    protected createChartOptions(): EchartOptions {
        let obj = {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                //提示框
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            },
            toolbox: {
                //工具栏，内置导出图片，数据视图，动态类型切换，数据区域缩放，重置
                feature: {
                    saveAsImage: {},
                    restore: {
                        title:"Restore",
                    },
                    right:10
                }
            },
            grid: {
                //直角坐标系内绘图网格，单个grid内最多放置上下2
                // x，左右2y
                left: 5,
                bottom:40,
                right:5,
                containLabel: true//包不包含坐标轴
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine:{
                        lineStyle:{
                            color:"white"
                        }
                    },
                    data: ['2018/5/21', '2018/5/22', '2018/5/23', '2018/5/24', '2018/5/25', '2018/5/26', '2018/5/27'],


                    axisLabel: {
                        rotate:45,
                        formatter:function (name) {
                            // 如果要修改长度
                            // 1.把判断的长度改大/小
                            // 2.把后面的截取改大/小
                            // return (name.length > 5 ? (name.slice(0,4)+'…'):name)
                            return (name.length > 5 ? (name.slice(0,4)+ '…'):name)
                        },
                        color:"white"
                    },
                    triggerEvent:true
                }

            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick:{
                        lineStyle:{
                            color:"transparent"
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:"white"
                        }
                    },
                    axisLabel:{
                        color:"white"
                    }
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        //显示值
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ],
            color:["#3063BF","#139FAE", "#6DA975", "#D1D26C",  "#C6825B", "#22984E" ]
        };
        return obj;
    }
}

