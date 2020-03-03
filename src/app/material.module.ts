import { NgModule } from '@angular/core';
import { MatTableModule, MatInputModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule { }
