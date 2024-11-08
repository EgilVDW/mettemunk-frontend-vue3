import { ILinkCollection, IParentChildrenLinkCollection } from "./blocks";
import { IImage } from "./ui";

export interface IHead {
	title?: string;
	link?: any[];
	style?: any[];
	meta?: any[];
}

export interface IRoute {
	name?: string;
	path: string;
	component: Vue;
	id?: string;
	parent?: string;
}

export interface IHeader {
	logo: IImage | null;
	menu: IParentChildrenLinkCollection[];
}

export interface IFooter {
	column1: string;
	column2: ILinkCollection[];
	column3: ILinkCollection[];
}

export interface ISeo {
	title: string;
	description: string;
}

export interface ITyped {
	type: string;
}

// gssp
export interface IGsapUtils {
	selector: Function;
	toArray: Function;
}
export interface IGsap {
	to: Function;
	registerPlugin: Function;
	set: Function;
	timeline: Function;
	utils: IGsapUtils;
}
