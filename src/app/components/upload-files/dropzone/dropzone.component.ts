import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  isDraggingOver: boolean = false
  @Output() droppedFiles = new EventEmitter<FileList>()

  constructor() { }

  ngOnInit(): void {
  }

  onDragOverEvent(e: DragEvent): void {
    e.preventDefault()
    this.isDraggingOver = true
  }

  onDragLeaveEvent(e: DragEvent): void {
    e.preventDefault()
    this.isDraggingOver = false
  }

  onDropEvent(e: DragEvent): void {
    e.preventDefault()
    this.droppedFiles.emit(e.dataTransfer?.files)
  }
}
