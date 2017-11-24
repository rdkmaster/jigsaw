import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JigsawInputNumberComponent } from './input-number.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [JigsawInputNumberComponent],
  exports: [JigsawInputNumberComponent]
})
export class JigsawInputNumberModule { }




// import { NgModule } from '@angular/core';
// import { NzInputNumberComponent } from './nz-input-number.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
//
// @NgModule({
//     imports     : [ CommonModule, FormsModule ],
//     declarations: [ NzInputNumberComponent ],
//     exports     : [ NzInputNumberComponent ]
// })
//
// export class NzInputNumberModule {
// }
