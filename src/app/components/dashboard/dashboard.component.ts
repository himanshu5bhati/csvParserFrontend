import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FileService } from 'src/app/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  fileList:any
  downloadMessage: any;
  uploadMessage: any;
  shareMessage: any;

  constructor(private fileService : FileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.allFiles()
  }

  allFiles() {
    this.fileService.fileList().subscribe((res:any)=>{
      this.fileList = res;
    })
  }

  downloadFile(fileId:any) {
    this.fileService.downloadFileById(fileId).subscribe(
      (blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'data.csv';
      link.click();
      this.downloadMessage = 'File downloaded successfully.'
      setTimeout(() => {
        this.downloadMessage = null
      }, 2000);
    },
    error => {
      this.downloadMessage = 'Error downloading file.'
      setTimeout(() => {
        this.downloadMessage = null
      }, 2000);
    }
  );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.fileService.uploadFile(formData).subscribe((res:any)=>{
        console.log(res)
        this.uploadMessage = 'File uploaded successfully'
        setTimeout(() => {
          this.uploadMessage = null
        }, 2000);
        this.allFiles()
        this.selectedFile = null
        this.resetFileInput()
      })
    } else {
      this.uploadMessage = 'No file selected';
      setTimeout(() => {
        this.uploadMessage = null
      }, 2000);
    }
  }

  resetFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
      this.selectedFile = null;
    }
  }

  logout() {
    this.authService.logout()
  }

  shareLink(fid:any) {
    let customUrl = `localhost:4200/share/${fid}`
    navigator.clipboard.writeText(customUrl).then(() => {
      this.shareMessage = 'shareable link is copied to clipboard'
      setTimeout(() => {
        this.shareMessage = null
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }


}
