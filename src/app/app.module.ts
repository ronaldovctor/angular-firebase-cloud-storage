import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { MyFilesComponent } from './components/my-files/my-files.component';
import { DropzoneComponent } from './components/upload-files/dropzone/dropzone.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    MyFilesComponent,
    DropzoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
