/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
    PopupDisposer, PopupInfo, PopupOptions, PopupPoint, PopupPositionOffset, PopupPositionType,
    PopupService
} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'popUpOption.html',
    styleUrls : ['popUpOption.scss']
})
export class DialogPopOptionDemo implements OnInit{

    private _dialogInfo: PopupInfo;
    private _dialogDisposer: PopupDisposer;

    private option : PopupOptions;

    private popPositionTypes : object[];

    private selectedPositionType :object;

    private poses : object[];

    private selectedPos : any;

    private detailPos : PopupPoint;

    private offset : PopupPositionOffset;

    @ViewChild("left") left : ElementRef;
    @ViewChild("middle") middle : ElementRef;
    @ViewChild("right") right : ElementRef;


    constructor(private popupService : PopupService){

    }

    ngOnInit(){

        this.generatePopPosition();
        this.generatePopPos();
        this.detailPos={x: null,y: null};
        this.offset={top:null,left:null,right:null,bottom:null};

        this.option = {
            modal : true,
            posType : PopupPositionType.absolute,
            posOffset : this.offset
        }

    }



    generatePopPos(){
        this.poses = [];
        this.poses.push({label:"left",ele : this.left});
        this.poses.push({label:"middle",ele : this.middle});
        this.poses.push({label:"right",ele : this.right});
        this.poses.push({label:"other"});
        this.selectedPos = this.poses[0];
    }

    generatePopPosition(){
        this.popPositionTypes = [];
        for(let prop in PopupPositionType){
            if(typeof PopupPositionType[prop] === 'number')
                this.popPositionTypes.push({label:prop,id:PopupPositionType[prop]});
        }
        this.selectedPositionType = this.popPositionTypes[1];
    }

    popupDialog1(ele:TemplateRef<any>){
        if(this.selectedPos.label != "other"){
            this.option.pos = this.selectedPos.ele;
        }else{
            this.option.pos = this.detailPos;
        }

        this._dialogInfo = this.popupService.popup(ele,this.option);
        this._dialogDisposer = () => this._dialogInfo.dispose();
    }


}
