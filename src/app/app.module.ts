import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderComponent } from './uploader/uploader.component';
import {UploadService} from './services/upload.service';
@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
