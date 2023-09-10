import { TestBed } from '@angular/core/testing';

import { BlobImagemService } from './blob-imagem.service';

describe('BlobImagemService', () => {
  let service: BlobImagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlobImagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
