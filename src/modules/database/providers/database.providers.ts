
import { Role } from '../../../models/role.entity';
import { UserRole } from '../../../models/userRole.entity';
import { Connection } from 'typeorm';
import { User } from '../../../models/user.entity';
import { Image } from '../../../models/image.entity';
import { Activity } from 'src/models/activity.entity';
import { Advertisement } from 'src/models/advertisement.entity';
import { Career } from 'src/models/career.entity';
import { Feedback } from 'src/models/feedback.entity';
import { Notice } from 'src/models/notice.entity';
import { Notification } from 'src/models/notification.entity';
import { Offer } from 'src/models/offer.entity';
import { OfferCategory } from 'src/models/offerCategory.entity';
import { Subject } from 'src/models/subject.entity';
import { SubjectCategory } from 'src/models/subjectCategory.entity';
import { UserSubject } from 'src/models/userSubject.entity';
import { Resource } from 'src/models/resource.entity';
import { ResourceCategory } from 'src/models/resourceCategory.entity';
import { Partner } from 'src/models/partner.entity';
import { Balance } from 'src/models/balance.entity';
import { Opinion } from 'src/models/opinion.entity';
import { Tag } from 'src/models/tag.entity';
import { OpinionTag } from 'src/models/opinionTag.entity';
import { OpinionAnswer } from 'src/models/opinionAnswer.entity';
import { LostObject } from 'src/models/lostObject.entity';
import { ExtraScore } from 'src/models/extraScore.entity';
import { Config } from 'src/models/config.entity';
import { GeneralNotification } from 'src/models/generalNotification.entity';
import { SubjectParent } from 'src/models/subjectParent.entity';

export const databaseProviders = [ 
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserRole),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Image),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Activity),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'PARTNER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Partner),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'ADVERTISEMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Advertisement),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'CAREER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Career),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'FEEDBACK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Feedback),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'NOTICE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Notice),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Notification),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'OFFER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Offer),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'OFFER_CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OfferCategory),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Subject),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'SUBJECT_CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SubjectCategory),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'USER_SUBJECT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserSubject),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'EXTRA_SCORE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ExtraScore),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Resource),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'RESOURCE_CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ResourceCategory),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'BALANCE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Balance),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'OPINION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Opinion),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'OPINION_TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OpinionTag),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'OPINION_ANSWER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OpinionAnswer),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Tag),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'LOST_OBJECT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(LostObject),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'CONFIG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Config),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'GENERAL_NOTIFICATION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(GeneralNotification),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'SUBJECT_PARENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SubjectParent),
    inject: ['DbConnectionToken'],
  }
];
