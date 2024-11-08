import { IImage } from "../ui";

export interface ICmsTyped {
	_modelApiKey: string;
}

export interface ICmsId {
	id: string;
}

export interface ICmsSlugPage {
	slug: string;
}

export interface ICmsSlug extends ICmsTyped, ICmsId, ICmsSlugPage {
	slug: string;
	parentPage: ICmsId | null;
}

export interface ICmsImage {
	responsiveImage: IImage;
}

export interface ICmsVideoInternal {
	mp4Url: string;
	streamingUrl: string;
	thumbnailUrl: string;
}

export interface ICmsVideo {
	video: ICmsVideoInternal;
}

export interface ICmsFile {
	url: string;
	filename: string;
	title: string;
}

export interface ICmsBasicPage extends ICmsTyped, ICmsId, ICmsSlugPage {
	title: string;
	parentPage: ICmsId | null;
	path: string;
}

export interface ICmsDictionary {
	newsletterTitle: string;
	newsletterSignup: string;
	thankYouMessage: string;
	newsletterErrorFieldRequired: string;
	newsletterErrorEmailFormat: string;
	newsletterEnterEmail: string;
	newsletterAcceptTermsOne: string;
	newsletterAcceptTermsTwo: string;
	newsletterAcceptTermsThree: string;
	generalCompanyName: string;
	socialMediaLinkedin: string;
	labelsSubtitle: string;
	labelsTitle: string;
	productOpenFile: string;
	productToLabels: string;
	productToDownloads: string;
	newsletterHeader: string;
	firstName: string;
	lastName: string;
}
