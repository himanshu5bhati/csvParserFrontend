import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/file.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor(private route:ActivatedRoute ,private fileService: FileService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fileService.downloadFileById(params['id']).subscribe(
        (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
      },
      error => {
      }
    );
    });
    
  }

}
