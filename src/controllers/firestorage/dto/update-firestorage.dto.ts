import { PartialType } from '@nestjs/swagger';
import { CreateFirestorageDto } from './create-firestorage.dto';

export class UpdateFirestorageDto extends PartialType(CreateFirestorageDto) {}
