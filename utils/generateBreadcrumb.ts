import { ICmsBasicPage } from "~/interfaces/cms/cmsBase";
import { ILink } from "~/interfaces/ui";
import { cmsPagesStore } from "~/store";

export function generateBreadcrumbs(id: string): ILink[] {
	const pages: ICmsBasicPage[] = cmsPagesStore.pages;
	const breadcrumbs: ICmsBasicPage[] = [];

	let currentNode = pages.filter((page) => page.id === id)[0];

	while (currentNode != null) {
		breadcrumbs.push(currentNode);

		currentNode = pages.filter((page) => page.id === currentNode.parentPage?.id)[0];
	}

	breadcrumbs.reverse();

	return breadcrumbs.map((page) => {
		return {
			url: page.path,
			text: page.title,
			target: "",
			download: false,
			internal: true,
		};
	});
}
