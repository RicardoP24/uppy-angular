import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobImagemService {

  constructor() { }

  getImageBlob(path:string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'path', true);
      xhr.responseType = 'blob';

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error('Failed to load image'));
        }
      };

      xhr.send();
    });
  }
}
