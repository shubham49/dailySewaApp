import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
} from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
    ]
})
export class MaterialModule { }
