import { ITyped } from "./global";
import { IFile, IImage, ILink, IVideo } from "./ui";

export interface ILinkCollection {
	title: string;
	links: ILink[];
}

export interface IParentChildrenLinkCollection {
	link: ILink;
	links: ILink[];
}

export interface IModularContent {}

export interface IEmployee {
	name: string;
	title: string;
	phone: string;
	email: string;
	image: IImage;
}

export interface IDepartment {
	name: string;
	employees: IEmployee[];
}

export interface ICardBlock {
	title: string;
	description: string;
	image: IImage;
	link: ILink;
	id: string;
}

export interface ICardDocumentBlock {
	title: string;
	description: string;
	image: IImage;
	file: IFile | null;
	id: string;
}

export interface ICardArticleBlock {
	image: IImage;
	link: ILink;
	id: string;
}

export interface ICardListBlock extends IModularContent, ITyped {
	cards: ICardBlock[];
	id: string;
}

export interface ICardDocumentListBlock extends IModularContent, ITyped {
	cards: ICardDocumentBlock[];
	id: string;
}

export interface ICardArticleListBlock extends IModularContent, ITyped {
	cards: ICardArticleBlock[];
	id: string;
}

export interface ITextBlock extends IModularContent, ITyped {
	text: string;
	id: string;
}

export interface IImageBlock extends IModularContent, ITyped {
	image: IImage;
	caption: string;
	id: string;
}

export interface IVideoBlock extends IModularContent, ITyped {
	video: IVideo | null;
	caption: string;
	id: string;
}

export interface ISeventyThirtyBlock extends IModularContent, ITyped {
	title: string;
	id: string;
	description: string;
	image: IImage;
	link: ILink | null;
	direction: boolean;
}
