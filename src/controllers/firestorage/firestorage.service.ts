import { Injectable } from '@nestjs/common';
import { CreateFirestorageDto } from './dto/create-firestorage.dto';
import { UpdateFirestorageDto } from './dto/update-firestorage.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestorageService {
  create(createFirestorageDto: CreateFirestorageDto) {
    return 'This action adds a new firestorage';
  }

  findAll() {
    return `This action returns all firestorage`;
  }

  async uploadFile(bucket, file, tm?) {
    let time = ''
    tm? time = tm:null
    var storageRef = await admin.storage().bucket(`gs://fadu-1c40d.appspot.com`).file(`${bucket}/${time+file.originalname}`)
    const blobWriter = storageRef.createWriteStream({
      metadata: {
          contentType: file.mimetype
      }
    })
      blobWriter.on('error', (err) => {
        console.log(err)
    })

    blobWriter.on('finish', () => {
        console.log('success')
    })

    blobWriter.end(file.buffer)
      
        return {url: storageRef.publicUrl(), name: `${bucket}/${time+file.originalname}` };
  }

  update(id: number, updateFirestorageDto: UpdateFirestorageDto) {
    return `This action updates a #${id} firestorage`;
  }

  async remove(bucket) {
    
    await admin.storage().bucket(`gs://fadu-1c40d.appspot.com`).file(bucket).delete();

    return `removed`;
  }
}
