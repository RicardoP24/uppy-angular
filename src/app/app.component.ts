import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Uppy } from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Dropbox from '@uppy/dropbox';
import { BlobImagemService } from './blob-imagem.service';


 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',
  '../../node_modules/@uppy/core/dist/style.css',
  '../../node_modules/@uppy/dashboard/dist/style.css',
]})

export class AppComponent {
	uppy: Uppy = new Uppy({ debug: true, autoProceed: true });
  tela:boolean=false;
  title = 'uppy'; 
  dash:boolean=false;

  constructor(    private imageService: BlobImagemService,
    private sanitizer: DomSanitizer){}
  
  ngOnInit() {

    this.uppy = new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 2,
        allowedFileTypes: ["image/*", "video/*"]
      }
    }).use(Dashboard, {
        trigger: ".UppyModalOpenerBtn",
        inline: true,
        target: ".dashboard",
        replaceTargetContent: true,
        note: "Images and video only, 2–3 files, up to 1 MB",
        height: 450,
        metaFields: [
          { id: "license", name: "License", placeholder: "specify license" },
          {
            id: "caption",
            name: "Caption",
            placeholder: "describe what the image is about"
          }
        ]
      }).use(Dropbox, {
        target: Dashboard,
        companionUrl:''
      });



    this.uppy.on("complete", result => {
      console.log("successful files:", result.successful);
      console.log("failed files:", result.failed);
    });
  }

  dragOnLeave(event:any){
    event.preventDefault();
    this.tela=false;
    
  }
  
  dragOnOver(event:any){
    event.preventDefault();
    this.tela=true;

  }

  
  private handleDroppedFiles(files: FileList) {
    // Process the dropped files here
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log(file)
      console.log(`Dropped file: ${file?.name}, size: ${file?.size} bytes`);
    }
  }

   
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.tela=false;
    this.dash=true;
    const files = event.dataTransfer?.files;

    if (files!.length > 0) {
      const file = files![0];

      if (file.type.startsWith('image/')) {
        // It's an image file, create a Blob
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
            this.uppy.addFile({
            name: file.name, // file name
            type: 'image/jpeg', // file type
            data:  this.createImageBlob(file),
            meta: {
                // optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
                relativePath: '',
            },
            source: 'Local', // optional, determines the source of the file, for example, Instagram.
            isRemote: false, // optional, set to true if actual file is not in the browser, but on some remote server, for example,
            // when using companion in combination with Instagram.
        });
       
        


        };

        reader.readAsDataURL(file);
      } else {
        console.error('Unsupported file type. Please drop an image.');
      }
    }
  }

  private createImageBlob(file: File):any {
    const imageBlob = file.slice(0, file.size, file.type);
    const blob = new Blob([imageBlob], { type: file.type });

    return blob

  }
}



