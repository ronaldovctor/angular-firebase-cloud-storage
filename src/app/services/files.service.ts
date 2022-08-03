import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable, of } from 'rxjs';
import { FileEntry } from '../models/FileEntry.model';
import { MyFile } from '../models/MyFile.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  filesCollection?: AngularFirestoreCollection<MyFile>

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { 
    this.filesCollection = afs.collection('myFiles', ref => ref.orderBy('date'))
  }

  uploadFile(f: File) {
    let path = `myFiles/${f.name}`
    let task = this.storage.upload(path, f)
    task.snapshotChanges().subscribe(
      (status) => {
        console.log(status)
      }
    )
  }

  upload(f: FileEntry) {
    let newFileName = `${new Date().getTime()} ${f.file.name}`
    let path = `myFiles/${newFileName}`
    f.task = this.storage.upload(path, f.file)
    f.state = f.task.snapshotChanges().pipe(
      map(
        (s) =>  s?.state as string
      )
    )
    this.fillAtributes(f)
    f.task.snapshotChanges().pipe(
      finalize(
        () => {
          if(f.task?.task.snapshot.state == 'success'){
            this.filesCollection?.add({
              fileName: f.file.name, 
              path: path, 
              date: new Date().getTime(), 
              size: f.file.size
            })
          }
        }
      )
    )
  }

  fillAtributes(f: FileEntry) {
    f.percentage = f.task!.percentageChanges() as Observable<number>
    f.uploading = f.state.pipe(map((s) => s == 'running'))
    f.finished = f.state.pipe(map((s) => s == 'success'))
    f.paused = f.state.pipe(map((s) => s == 'paused'))
    f.error = f.state.pipe(map((s) => s == 'error'))
    f.canceled = f.state.pipe(map((s) => s == 'canceled'))
    f.bytesUploaded = f.task?.snapshotChanges().pipe(map((s) => s?.bytesTransferred)) as Observable<number>
  }

  getFiles(): Observable<MyFile[]> {
    return this.filesCollection!.snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map( a => {
          const file: MyFile = a.payload.doc.data()
          const id = a.payload.doc.id
          const url = this.storage.ref(file.path).getDownloadURL()
          return {id, ...file, url} as MyFile
        })
      })
    )
  }

  deleteFile(f: MyFile) {
    this.storage.ref(f.path).delete()
    this.filesCollection?.doc(f.id).delete()
  }
}
