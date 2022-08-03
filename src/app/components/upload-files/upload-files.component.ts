import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FileEntry } from 'src/app/models/FileEntry.model';
import { FilesService } from 'src/app/services/files.service';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  public files: FileEntry[] = []

  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  }

  onDropFiles(files: FileList): void {
    this.files?.splice(0, this.files.length)
    for (let i = 0; i < files.length; i++) {
      this.files!.push({
        file: files.item(i)!,
        percentage: of(0), bytesUploaded: of(0), canceled: of(false), error: of(false),
        finished: of(false), paused: of(false), state: of(''), task: undefined, uploading: of(false)
      })
      //this.filesService.uploadFile(files[i])
    }
  }

  removeFileFromList(i: number): void {
    this.files.splice(i, 1);
  }

  uploadAll(): void {
    for (let i = 0; i < this.files.length; i++) {
      this.filesService.upload(this.files[i]);
    }
  }

}
