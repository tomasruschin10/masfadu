import { UserRepository } from '../../database/repositories/userRepository.service';
import { UserRoleRepository } from '../../database/repositories/userRoleRepository.service';
import { RoleRepository } from '../../database/repositories/roleRepository.service';
import { ImageRepository } from '../../database/repositories/imageRepository.service';
import { ActivityRepository } from 'src/modules/database/repositories/activityRepository.service';
import { AdvertisementRepository } from 'src/modules/database/repositories/advertisementRepository.service';
import { CareerRepository } from 'src/modules/database/repositories/careerRepository.service';
import { FeedbackRepository } from 'src/modules/database/repositories/feedbackRepository.service';
import { NoticeRepository } from 'src/modules/database/repositories/noticeRepository.service';
import { NotificationRepository } from 'src/modules/database/repositories/notificationRepository.service';
import { OfferCategoryRepository } from 'src/modules/database/repositories/offerCategoryRepository.service';
import { OfferRepository } from 'src/modules/database/repositories/offerRepository.service';
import { SubjectCategoryRepository } from 'src/modules/database/repositories/subjectCategoryRepository.service';
import { SubjectRepository } from 'src/modules/database/repositories/subjectRepository.service';
import { UserSubjectRepository } from 'src/modules/database/repositories/userSubjectRepository.service';
import { ResourceCategoryRepository } from 'src/modules/database/repositories/resourceCategoryRepository.service';
import { ResourceRepository } from 'src/modules/database/repositories/resourceRepository.service';
import { PartnerRepository } from 'src/modules/database/repositories/partnerRepository.service';
import { OpinionRepository } from 'src/modules/database/repositories/opinionRepository.service';
import { OpinionTagRepository } from 'src/modules/database/repositories/opinionTagRepository.service';
import { TagRepository } from 'src/modules/database/repositories/tagRepository.service';
import { BalanceRepository } from 'src/modules/database/repositories/balanceRepository.service';
import { OpinionAnswerRepository } from 'src/modules/database/repositories/opinionAnswerRepository.service';
import { LostObjectRepository } from 'src/modules/database/repositories/lostObjectRepository.service';
import { ExtraScoreRepository } from 'src/modules/database/repositories/extraScoreRepository.service';
import { ConfigRepository } from 'src/modules/database/repositories/configRepository.service';
import { GeneralNotificationRepository } from 'src/modules/database/repositories/generalNotificationRepository.service';
import { SubjectParentRepository } from 'src/modules/database/repositories/subjectParentRepository.service';
export const repositories = [
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    ImageRepository,
    ActivityRepository,
    AdvertisementRepository,
    CareerRepository,
    FeedbackRepository,
    NoticeRepository,
    NotificationRepository,
    OfferCategoryRepository,
    OfferRepository,
    SubjectCategoryRepository,
    SubjectRepository,
    UserSubjectRepository,
    ExtraScoreRepository,
    ResourceCategoryRepository,
    ResourceRepository,
    PartnerRepository,
    BalanceRepository,
    OpinionRepository,
    TagRepository,
    OpinionTagRepository,
    OpinionAnswerRepository,
    LostObjectRepository,
    ConfigRepository,
    GeneralNotificationRepository,
    SubjectParentRepository
]