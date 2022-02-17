import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { MatTableModule } from '@angular/material/table'; 
import { HttpClientModule }   from '@angular/common/http';
 
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, MatTableModule],
    declarations: [ AppComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }  