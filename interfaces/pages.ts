import { ICardBlock, IDepartment, IModularContent } from "./blocks";
import { ISeo, ITyped } from "./global";
import { IFile, IImage, ILink, IVideo } from "./ui";

/* Base */

export interface ISeoPage {
	seo: ISeo;
}

export interface IBasePage extends ISeoPage, ITyped {
	id: string;
}

export interface IBannerPage {
	bannerTitle: string;
	bannerSubTitle: string;
	bannerImage: IImage;
	bannerVideo: IVideo | null;
	bannerLink: ILink | null;
}

/* Pages */

export interface INotFoundPage {
	title: string;
	content: string;
}

export interface IFrontPage extends IBasePage, IBannerPage {
	modularContent: IModularContent[];
}

export interface IArticlePage extends IBasePage, IBannerPage {
	title: string;
	modularContent: IModularContent[];
}

export interface ILandingPage extends IBasePage, IBannerPage {
	modularContent: IModularContent[];
}

export interface IContactPage extends IBasePage {
	title: string;
	content: string;
	image: IImage;
	showTop: boolean;
	departments: IDepartment[];
}

export interface ICategoryPage extends IBasePage, IBannerPage {
	slug: string;
	products: ICardBlock[];
}

export interface ICategoryListPage extends IBasePage, IBannerPage {
	items: ICardBlock[];
}

export interface ILabel {
	title: string;
	content: string;
	icon: IImage;
}

export interface IProductPage extends IBasePage {
	title: string;
	description: string;
	document: IFile | null;
	images: IImage[];
	labels: ILabel[];
	downloads: (IFile | null)[];
}
