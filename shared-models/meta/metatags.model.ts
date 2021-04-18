import { LegalBusinessNames, ShorthandBusinessNames } from './business-info.model';
import { PublicIconPaths } from '../../shared-models/routes-and-paths/icon-paths.model';
import { PublicImagePaths } from '../../shared-models/routes-and-paths/image-paths.model';
import { SocialHandles } from './social-urls.model';

export const metaTagDefaults = {
  ignflpPublic: {
    metaTagDefaultTitle: 'IgnyteFit - Personalized Workout Plans With Your Favorite Trainers',
    metaTagDefaultDescription: 'Build your own personalized excercise plan tailored to your fitness goals with your favorite fitness trainers. Track your progress and earn rewards for completing your program.',
    metaTagAuthor: LegalBusinessNames.IGNFLP,
    metaTagDefaultKeywords: 'IgnyteFit, Ignyte Fit, Ignyte fitness, creat your own workout plans, build your own workout plan, build your own fitness plan, personalized workouts, custom workout plans, personalized fitness app',
    metaTagSiteName: ShorthandBusinessNames.IGNFLP,
    metaTagFbAppId: '256782589439216',
    metaTagTwitterHandle: `@${SocialHandles.IGNFLP_TWITTER}`,
    metaTagTwitterCardType: 'summary_large_image',
    metaTagDefaultImage: PublicImagePaths.LINK_SHARE_IMAGE,
    metaTagCachedHtml: 'cachedHtml',
    metaTagIsBot: 'isBot',
  },
};

export const metaTagsContentPages = {
  ignflpPublic: {
    aboutMetaTitle: `About Us - ${metaTagDefaults.ignflpPublic.metaTagSiteName}`,
    aboutMetaDescription: `We are avid fitness enthusiasts who wanted a better way to customize and track our online workouts. We launched IgnyteFit to combine and organize our favorite online workout programs and fitness instructors into a single intuitive interface.`,
    homeCapTitleOne: 'Build Your Own Plan',
    homeCapBodyOne: 'Craft your own personalized exercise plan by combining workouts from any of your favorite fitness trainers',
    homeCapIconOnePath: PublicIconPaths.BUILD_ICON,
    homeCapTitleTwo: `Try One of Our's`,
    homeCapBodyTwo: 'Browse our carefully curated training programs showcasing the best online workouts from top fitness experts',
    homeCapIconTwoPath: PublicIconPaths.PLAYLIST_ICON,
    homeCapTitleThree: 'Set Goals',
    homeCapBodyThree: 'Commit to a workout program that is tailored to your availability and fitness goals',
    homeCapIconThreePath: PublicIconPaths.GOALS_ICON,
    homeCapTitleFour: 'Track Progress',
    homeCapBodyFour: `Keep track of the workouts you've completed and your progress toward finishing your program`,
    homeCapIconFourPath: PublicIconPaths.TRACK_ICON,
    homeCapTitleFive: 'Earn Badges',
    homeCapBodyFive: 'Get rewarded for completing your programs and setting other exciting fitness milestones',
    homeCapIconFivePath: PublicIconPaths.REWARDS_ICON,
    homePageTitle: 'Personalized Workout Plans',
    homePageSubtitle: 'With Your Favorite Trainers',
    homeActionMessage: 'Learn More',
    privacyPolicyMetaTitle: `Privacy Policy - ${metaTagDefaults.ignflpPublic.metaTagSiteName}`,
    termsAndConditionsMetaTitle: `Terms and Conditions - ${metaTagDefaults.ignflpPublic.metaTagSiteName}`,
  },
};
