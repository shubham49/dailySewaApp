import { NgModule } from '@angular/core';
import { MatTableModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule
    ],
    exports: [
        MatTableModule,
        MatInputModule
    ]
})
export class MaterialModule { }
