import {
	ICardBlock,
	ICardListBlock,
	ILinkCollection,
	IModularContent,
	IParentChildrenLinkCollection,
	ISeventyThirtyBlock,
	IEmployee,
	IDepartment,
	ICardDocumentBlock,
	ICardDocumentListBlock,
	ICardArticleBlock,
	ICardArticleListBlock,
	ITextBlock,
	IImageBlock,
	IVideoBlock,
} from "~/interfaces/blocks";
import { ICmsFile, ICmsImage, ICmsVideo } from "~/interfaces/cms/cmsBase";
import {
	ICmsLink,
	ICmsLinkCollection,
	ICmsModularContent,
	ICmsParentChildrenLinkCollection,
	ICmsSeventyThirtyBlock,
	ICmsEmployee,
	ICmsDepartment,
	ICmsCardListBlock,
	ICmsCardBlock,
	ICmsCardDocumentBlock,
	ICmsCardDocumentListBlock,
	ICmsCardArticleBlock,
	ICmsCardArticleListBlock,
	ICmsTextBlock,
	ICmsImageBlock,
	ICmsVideoBlock,
} from "~/interfaces/cms/cmsBlocks";
import { ICmsLabel, ICmsSeo } from "~/interfaces/cms/cmsPages";
import { ISeo } from "~/interfaces/global";
import { ILabel } from "~/interfaces/pages";
import { IFile, IImage, ILink, IVideo } from "~/interfaces/ui";
import { cmsPagesStore } from "~/store";

/* Global */

export function getUrl(id: string): string {
	const page = cmsPagesStore.pages.filter((x) => x.id === id)[0];

	if (page != null) {
		return page.path;
	}

	console.warn(`No page with id ${id}`);

	return "/";
}

export function mapLink(link: ICmsLink): ILink {
	return {
		text: link.text,
		url: link.page != null ? getUrl(link.page.id) : link.external,
		target: link.newWindow ? "_blank" : "",
		download: false,
		internal: link.page != null,
	};
}

export function mapImage(image: ICmsImage): IImage {
	return {
		...image,
	};
}

export function mapVideo(video: ICmsVideo | null): IVideo | null {
	if (video == null) {
		return null;
	}

	return {
		mp4Url: video.video.mp4Url,
		streamingUrl: video.video.streamingUrl,
		thumbnailUrl: video.video.thumbnailUrl,
	};
}

export function mapFile(file: ICmsFile): IFile | null {
	if (file == null) {
		return null;
	}

	return {
		url: file.url,
		filename: file.filename,
		title: file.title,
	};
}

export function mapSeo(seo: ICmsSeo): ISeo {
	return {
		title: seo?.title,
		description: seo?.description,
	};
}

/* Blocks */

export function mapLinkCollection(block: ICmsLinkCollection): ILinkCollection {
	block.links = block.links.filter((x) => x.page != null || x.external !== "");

	return {
		title: block.title,
		links: block.links.map((x) => mapLink(x)),
	};
}

export function mapParentChildrenLinkCollection(
	block: ICmsParentChildrenLinkCollection
): IParentChildrenLinkCollection {
	block.links = block.links.filter((x) => x.page != null || x.external !== "");

	return {
		link: mapLink(block.link[0]),
		links: block.links.map((x) => mapLink(x)),
	};
}

export function mapSeventyThirtyBlock(block: ICmsSeventyThirtyBlock): ISeventyThirtyBlock {
	return {
		type: block._modelApiKey,
		title: block.title,
		description: block.description,
		direction: block.direction,
		image: mapImage(block.image),
		link: block.link[0] != null ? mapLink(block.link[0]) : null,
	};
}

export function mapCardBlock(block: ICmsCardBlock): ICardBlock {
	return {
		title: block.title,
		description: block.description,
		image: mapImage(block.image),
		link: mapLink(block.link[0]),
	};
}

export function mapCardDocumentBlock(block: ICmsCardDocumentBlock): ICardDocumentBlock {
	return {
		title: block.title,
		description: block.description,
		image: mapImage(block.image),
		file: mapFile(block.file),
	};
}

export function mapCardArticleBlock(block: ICmsCardArticleBlock): ICardArticleBlock {
	return {
		image: mapImage(block.bannerImage),
		link: {
			url: getUrl(block.id),
			text: block.bannerTitle,
			target: "",
			download: false,
			internal: true,
		},
	};
}

export function mapCardListBlock(block: ICmsCardListBlock): ICardListBlock {
	block.cards = block.cards.filter((x) => x != null && x.image != null && x.title !== "");

	return {
		type: block._modelApiKey,
		cards: block.cards.map((e) => mapCardBlock(e)),
	};
}

export function mapCardDocumentListBlock(block: ICmsCardDocumentListBlock): ICardDocumentListBlock {
	block.cards = block.cards.filter((x) => x != null && x.image != null && x.title !== "");

	return {
		type: block._modelApiKey,
		cards: block.cards.map((e) => mapCardDocumentBlock(e)),
	};
}

export function mapCardArticleListBlock(block: ICmsCardArticleListBlock): ICardArticleListBlock {
	block.cards = block.cards.filter((x) => x != null && x.bannerImage != null && x.bannerTitle !== "");

	return {
		type: block._modelApiKey,
		cards: block.cards.map((e) => mapCardArticleBlock(e)),
	};
}

export function mapTextBlock(block: ICmsTextBlock): ITextBlock {
	return {
		type: block._modelApiKey,
		text: block.text,
	};
}

export function mapImageBlock(block: ICmsImageBlock): IImageBlock {
	return {
		type: block._modelApiKey,
		image: mapImage(block.image),
		caption: block.caption,
	};
}

export function mapVideoBlock(block: ICmsVideoBlock): IVideoBlock {
	return {
		type: block._modelApiKey,
		video: mapVideo(block.video),
		caption: block.caption,
	};
}

export function mapEmployee(block: ICmsEmployee): IEmployee {
	return {
		name: block.name,
		title: block.title,
		phone: block.phone,
		email: block.email,
		image: mapImage(block.image),
	};
}

export function mapDepartment(block: ICmsDepartment): IDepartment {
	return {
		name: block.name,
		employees: block.employees.map((x) => mapEmployee(x)),
	};
}

export function mapModularContent(content: ICmsModularContent[]): IModularContent[] {
	const list: IModularContent[] = [];

	content.forEach((data) => {
		if (data._modelApiKey === "seventy_thirty_block") {
			list.push(mapSeventyThirtyBlock(data as ICmsSeventyThirtyBlock));
		}

		if (data._modelApiKey === "card_list_block") {
			list.push(mapCardListBlock(data as ICmsCardListBlock));
		}

		if (data._modelApiKey === "card_list_document_block") {
			list.push(mapCardDocumentListBlock(data as ICmsCardDocumentListBlock));
		}

		if (data._modelApiKey === "card_list_article_block") {
			list.push(mapCardArticleListBlock(data as ICmsCardArticleListBlock));
		}

		if (data._modelApiKey === "text_block") {
			list.push(mapTextBlock(data as ICmsTextBlock));
		}

		if (data._modelApiKey === "image_block") {
			list.push(mapImageBlock(data as ICmsImageBlock));
		}

		if (data._modelApiKey === "video_block") {
			list.push(mapVideoBlock(data as ICmsVideoBlock));
		}
	});

	return list;
}

export function mapLabel(content: ICmsLabel): ILabel {
	return {
		title: content.title,
		content: content.content,
		icon: mapImage(content.icon),
	};
}
