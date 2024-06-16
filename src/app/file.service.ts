import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000/api/files';

  constructor(private http: HttpClient) { }

  fileList():Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/files`);
  }

  downloadFileById(fid:any):Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/download/${fid}`,{ responseType: 'blob' as 'json' });
  }

  uploadFile(fd:any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload`,fd);
  }
}
