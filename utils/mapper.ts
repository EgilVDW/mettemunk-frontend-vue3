import type {
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
import type { ICmsFile, ICmsImage, ICmsVideo } from "~/interfaces/cms/cmsBase";
import type {
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
import type { ICmsLabel, ICmsSeo } from "~/interfaces/cms/cmsPages";
import type { ISeo } from "~/interfaces/global";
import type { ILabel } from "~/interfaces/pages";
import type { IFile, IImage, ILink, IVideo } from "~/interfaces/ui";
import * as cmsHelper from "~/resources/datoCmsHelper";

export async function getUrl(id: string): Promise<string> {
  const pages = (await cmsHelper.GetAllPages()) as any;
  const page = pages.find((x) => x.id === id);

  if (page != null) {
    return page.path;
  }

  console.warn(`No page with id ${id}`);

  return "/";
}

export async function mapLink(link: ICmsLink): Promise<ILink> {
  const l = link.page != null ? await getUrl(link.page?.id) : link.external;
  return {
    text: link.text,
    url: l,
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

export async function mapLinkCollection(
  block: ICmsLinkCollection
): Promise<ILinkCollection> {
  block.links = block.links.filter((x) => x.page != null || x.external !== "");

  return {
    title: block.title,
    links: await Promise.all(block.links.map(async (x) => await mapLink(x))),
  };
}

export async function mapParentChildrenLinkCollection(
  block: ICmsParentChildrenLinkCollection
): Promise<IParentChildrenLinkCollection> {
  block.links = block.links.filter((x) => x.page != null || x.external !== "");

  return {
    link: await mapLink(block.link[0]),
    links: await Promise.all(block.links.map(async (x) => await mapLink(x))),
  };
}

export async function mapSeventyThirtyBlock(
  block: ICmsSeventyThirtyBlock
): Promise<ISeventyThirtyBlock> {
  return {
    type: block._modelApiKey,
    title: block.title,
    description: block.description,
    direction: block.direction,
    image: mapImage(block.image),
    link: block.link[0] != null ? await mapLink(block.link[0]) : null,
  };
}

export async function mapCardBlock(block: ICmsCardBlock): Promise<ICardBlock> {
  return {
    title: block.title,
    description: block.description,
    image: mapImage(block.image),
    link: await mapLink(block.link[0]),
  };
}

export function mapCardDocumentBlock(
  block: ICmsCardDocumentBlock
): ICardDocumentBlock {
  return {
    title: block.title,
    description: block.description,
    image: mapImage(block.image),
    file: mapFile(block.file),
  };
}

export async function mapCardArticleBlock(
  block: ICmsCardArticleBlock
): Promise<ICardArticleBlock> {
  return {
    image: mapImage(block.bannerImage),
    link: {
      url: await getUrl(block.id),
      text: block.bannerTitle,
      target: "",
      download: false,
      internal: true,
    },
  };
}

export async function mapCardListBlock(
  block: ICmsCardListBlock
): Promise<ICardListBlock> {
  block.cards = block.cards.filter(
    (x) => x != null && x.image != null && x.title !== ""
  );

  return {
    type: block._modelApiKey,
    cards: await Promise.all(
      block.cards.map(async (e) => await mapCardBlock(e))
    ),
  };
}

export function mapCardDocumentListBlock(
  block: ICmsCardDocumentListBlock
): ICardDocumentListBlock {
  block.cards = block.cards.filter(
    (x) => x != null && x.image != null && x.title !== ""
  );

  return {
    type: block._modelApiKey,
    cards: block.cards.map((e) => mapCardDocumentBlock(e)),
  };
}

export async function mapCardArticleListBlock(
  block: ICmsCardArticleListBlock
): Promise<ICardArticleListBlock> {
  block.cards = block.cards.filter(
    (x) => x != null && x.bannerImage != null && x.bannerTitle !== ""
  );

  return {
    type: block._modelApiKey,
    cards: await Promise.all(
      block.cards.map(async (e) => await mapCardArticleBlock(e))
    ),
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

export async function mapModularContent(
  content: ICmsModularContent[]
): Promise<IModularContent[]> {
  const list: IModularContent[] = [];

  content.forEach(async (data) => {
    if (data._modelApiKey === "seventy_thirty_block") {
      list.push(await mapSeventyThirtyBlock(data as ICmsSeventyThirtyBlock));
    }

    if (data._modelApiKey === "card_list_block") {
      list.push(await mapCardListBlock(data as ICmsCardListBlock));
    }

    if (data._modelApiKey === "card_list_document_block") {
      list.push(
        await mapCardDocumentListBlock(data as ICmsCardDocumentListBlock)
      );
    }

    if (data._modelApiKey === "card_list_article_block") {
      list.push(
        await mapCardArticleListBlock(data as ICmsCardArticleListBlock)
      );
    }

    if (data._modelApiKey === "text_block") {
      list.push(await mapTextBlock(data as ICmsTextBlock));
    }

    if (data._modelApiKey === "image_block") {
      list.push(await mapImageBlock(data as ICmsImageBlock));
    }

    if (data._modelApiKey === "video_block") {
      list.push(await mapVideoBlock(data as ICmsVideoBlock));
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
