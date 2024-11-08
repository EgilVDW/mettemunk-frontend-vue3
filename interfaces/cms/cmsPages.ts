import { ICmsFile, ICmsId, ICmsImage, ICmsTyped, ICmsVideo } from "./cmsBase";
import {
	ICmsDepartment,
	ICmsLink,
	ICmsLinkCollection,
	ICmsModularContent,
	ICmsParentChildrenLinkCollection,
} from "./cmsBlocks";

export interface ICmsHeader {
	logo: ICmsImage | null;
	menu: ICmsParentChildrenLinkCollection[];
}

export interface ICmsFooter {
	column1: string;
	column2: ICmsLinkCollection[];
	column3: ICmsLinkCollection[];
}

export interface ICmsLabel {
	title: string;
	content: string;
	icon: ICmsImage;
}

export interface ICmsSlugPage extends ICmsId {
	slug: string;
}

export interface ICmsSeo extends ICmsSlugPage {
	title: string;
	description: string;
}

export interface ICmsBasePage extends ICmsTyped, ICmsId {
	seo: ICmsSeo;
}

export interface ICmsBannerPage {
	bannerTitle: string;
	bannerSubTitle: string;
	bannerImage: ICmsImage;
	bannerVideo: ICmsVideo | null;
	bannerLink: ICmsLink[];
}

export interface ICmsNotFoundPage {
	title: string;
	content: string;
}

export interface ICmsFrontPage extends ICmsBasePage, ICmsBannerPage, ICmsTyped {
	modularContent: ICmsModularContent[];
}

export interface ICmsArticlePage extends ICmsBasePage, ICmsBannerPage {
	title: string;
	modularContent: ICmsModularContent[];
	slug: string;
}

export interface ICmsContactPage extends ICmsBasePage {
	title: string;
	content: string;
	image: ICmsImage;
	showTop: boolean;
	departments: ICmsDepartment[];
}

export interface ICmsCategoryListPage extends ICmsBasePage, ICmsBannerPage {}

export interface ICmsCategoryPage extends ICmsBasePage, ICmsBannerPage {
	slug: string;
}

export interface ICmsProductPage extends ICmsBasePage {
	slug: string;
	title: string;
	teaser: string;
	description: string;
	document: ICmsFile;
	images: ICmsImage[];
	labels: ICmsLabel[];
	downloads: ICmsFile[];
}
