import { AdvertisementModule } from "src/controllers/advertisement/advertisement.module";
import { AuthModule } from "src/controllers/auth/auth.module";
import { CareerModule } from "src/controllers/career/career.module";
import { FeedbackModule } from "src/controllers/feedback/feedback.module";
import { NoticeModule } from "src/controllers/notice/notice.module";
import { OfferModule } from "src/controllers/offer/offer.module";
import { OfferCategoryModule } from "src/controllers/offerCategory/offerCategory.module";
import { PartnerModule } from "src/controllers/partner/partner.module";
import { ResourceModule } from "src/controllers/resource/resource.module";
import { ResourceCategoryModule } from "src/controllers/resourceCategory/resourceCategory.module";
import { RoleModule } from "src/controllers/role/role.module";
import { SubjectModule } from "src/controllers/subject/subject.module";
import { SubjectCategoryModule } from "src/controllers/subjectCategory/subjectCategory.module";
import { UserModule } from "src/controllers/user/user.module";
import { UserSubjectModule } from "src/controllers/userSubject/userSubject.module";

export const controllers = [
    AuthModule,
    UserModule,
    RoleModule,
    AdvertisementModule,
    CareerModule,
    FeedbackModule,
    NoticeModule,
    OfferModule,
    OfferCategoryModule,
    SubjectModule,
    SubjectCategoryModule,
    UserSubjectModule,
    PartnerModule,
    ResourceCategoryModule,
    ResourceModule
]