import type { ICmsBasicPage } from "~/interfaces/cms/cmsBase";
import type { ILink } from "~/interfaces/ui";
import { GetAllPages } from "~/resources/datoCmsHelper";

export async function generateBreadcrumbs(id: string): Promise<ILink[]> {
  const pages: ICmsBasicPage[] = await GetAllPages();
  const breadcrumbs: ICmsBasicPage[] = [];


  let currentNode = pages.filter((page) => page.id === id)[0];

  while (currentNode != null) {
    breadcrumbs.push(currentNode);

    currentNode = pages.filter(
      (page) => page.id === currentNode.parentPage?.id
    )[0];
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
