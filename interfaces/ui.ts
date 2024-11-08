export interface ILink {
	url: string;
	text: string;
	target: string;
	download: boolean;
	internal: boolean;
}

export interface IImage {
	responsiveImage: IImage;
}

export interface IVideo {
	mp4Url: string;
	streamingUrl: string;
	thumbnailUrl: string;
}

export interface IResponsiveImage {
	aspectRatio: number;
	width: number;
	sizes: string;
	srcSet: string;
	src: string;
	alt: string;
}

export interface IFile {
	url: string;
	filename: string;
	title: string;
}
