import { AdvertisementModule } from "src/controllers/advertisement/advertisement.module";
import { AuthModule } from "src/controllers/auth/auth.module";
import { BalanceModule } from "src/controllers/balance/balance.module";
import { CareerModule } from "src/controllers/career/career.module";
import { ConfigModule } from "src/controllers/config/config.module";
import { ExtraScoreModule } from "src/controllers/extraScore/extraScore.module";
import { FeedbackModule } from "src/controllers/feedback/feedback.module";
import { GeneralNotificationModule } from "src/controllers/generalNotification/generalNotification.module";
import { LostObjectModule } from "src/controllers/lostObject/lostObject.module";
import { NoticeModule } from "src/controllers/notice/notice.module";
import { OfferModule } from "src/controllers/offer/offer.module";
import { OfferCategoryModule } from "src/controllers/offerCategory/offerCategory.module";
import { OpinionModule } from "src/controllers/opinion/opinion.module";
import { OpinionAnswerModule } from "src/controllers/opinionAnswer/opinionAnswer.module";
import { PartnerModule } from "src/controllers/partner/partner.module";
import { ResourceModule } from "src/controllers/resource/resource.module";
import { ResourceCategoryModule } from "src/controllers/resourceCategory/resourceCategory.module";
import { RoleModule } from "src/controllers/role/role.module";
import { SubjectModule } from "src/controllers/subject/subject.module";
import { SubjectCategoryModule } from "src/controllers/subjectCategory/subjectCategory.module";
import { TagModule } from "src/controllers/tag/tag.module";
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
    ExtraScoreModule,
    PartnerModule,
    ResourceCategoryModule,
    ResourceModule,
    BalanceModule,
    OpinionModule,
    TagModule,
    OpinionAnswerModule,
    LostObjectModule,
    ConfigModule,
    GeneralNotificationModule
]