import { ICmsFile, ICmsId, ICmsImage, ICmsTyped, ICmsVideo } from "./cmsBase";

export interface ICmsLink {
	text: string;
	page: ICmsId | null;
	external: string;
	newWindow: boolean;
}

export interface ICmsLinkCollection {
	title: string;
	links: ICmsLink[];
}

export interface ICmsParentChildrenLinkCollection {
	link: ICmsLink[];
	links: ICmsLink[];
}

export interface ICmsEmployee {
	name: string;
	title: string;
	phone: string;
	email: string;
	image: ICmsImage;
}

export interface ICmsDepartment {
	name: string;
	employees: ICmsEmployee[];
}

export interface ICmsModularContent extends ICmsTyped {}

export interface ICmsTextBlock extends ICmsModularContent {
	text: string;
}

export interface ICmsImageBlock extends ICmsModularContent {
	image: ICmsImage;
	caption: string;
}

export interface ICmsVideoBlock extends ICmsModularContent {
	video: ICmsVideo;
	caption: string;
}

export interface ICmsSeventyThirtyBlock extends ICmsModularContent {
	title: string;
	description: string;
	direction: boolean;
	image: ICmsImage;
	link: ICmsLink[];
}

export interface ICmsCardBlock {
	title: string;
	description: string;
	image: ICmsImage;
	link: ICmsLink[];
}

export interface ICmsCardDocumentBlock {
	title: string;
	description: string;
	image: ICmsImage;
	file: ICmsFile;
}

export interface ICmsCardArticleBlock {
	id: string;
	bannerTitle: string;
	bannerImage: ICmsImage;
}

export interface ICmsCardListBlock extends ICmsTyped, ICmsModularContent {
	cards: ICmsCardBlock[];
}

export interface ICmsCardDocumentListBlock extends ICmsTyped, ICmsModularContent {
	cards: ICmsCardDocumentBlock[];
}

export interface ICmsCardArticleListBlock extends ICmsTyped, ICmsModularContent {
	cards: ICmsCardArticleBlock[];
}
