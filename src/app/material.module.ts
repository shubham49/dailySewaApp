import { NgModule } from '@angular/core';
import { MatTableModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class MaterialModule { }
