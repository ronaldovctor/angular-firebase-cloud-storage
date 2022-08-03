import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyFile } from 'src/app/models/MyFile.model';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
  files?: Observable<MyFile[]>

  constructor(private fileService: FilesService) { }

  ngOnInit(): void {
    this.files = this.fileService.getFiles()
  }

  getDate(n: number): Date {
    return new Date(n)
  }

  delete(f: MyFile): void {
    this.fileService.deleteFile(f)
  }

}
