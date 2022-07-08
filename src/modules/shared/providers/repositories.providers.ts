import { UserRepository } from '../../database/repositories/userRepository.service';
import { UserRoleRepository } from '../../database/repositories/userRoleRepository.service';
import { RoleRepository } from '../../database/repositories/roleRepository.service';
import { ImageRepository } from '../../database/repositories/imageRepository.service';
export const repositories = [
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    ImageRepository
]