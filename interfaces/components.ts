import { IFile } from "./ui";

export interface IAnchorSection {
	title: string;
	description: string;
	document: IFile | null;
}
