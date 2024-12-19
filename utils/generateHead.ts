import type { IBasePage } from "~/interfaces/pages";
import type { IHead } from "~/interfaces/global";

export function generateHead(url: string, page: IBasePage | null): IHead {
  const config = useRuntimeConfig();
  if (page == null) {
    return {};
  }

  const getPageImage = function (): string {
    switch (page.type) {
      case "front": {
        return (page as any).bannerImage.responsiveImage.src;
      }
      case "article": {
        return (page as any).bannerImage.responsiveImage.src;
      }
      case "landing": {
        return (page as any).bannerImage.responsiveImage.src;
      }
      case "category": {
        return (page as any).bannerImage.responsiveImage.src;
      }
      case "category_list": {
        return (page as any).bannerImage.responsiveImage.src;
      }
      case "product": {
        return (page as any).images[0].responsiveImage.src;
      }
      case "contact": {
        return (page as any).image?.responsiveImage?.src;
      }
      default: {
        return "";
      }
    }
  };

  const getPageTitle = function (): string {
    switch (page.type) {
      case "front": {
        return (page as any).bannerTitle;
      }
      case "article": {
        return (page as any).bannerTitle;
      }
      case "landing": {
        return (page as any).bannerTitle;
      }
      case "category": {
        return (page as any).bannerTitle;
      }
      case "category_list": {
        return (page as any).bannerTitle;
      }
      case "product": {
        return (page as any).title;
      }
      case "contact": {
        return (page as any).title;
      }
      default: {
        return "";
      }
    }
  };

  const getFullUrl = function (): string {
    if (url === "" || url == null) {
      return "";
    }

    url = url.substring(1);

    if (config.public.CULTURE === "da") {
      url = config.public.DANISH_BASEURL + "/" + url;
    } else {
      url = config.public.ENGLISH_BASEURL + "/" + url;
    }

    if (url.slice(-1) !== "/") {
      url += "/";
    }

    return url;
  };

  const metaArray: any[] = [];

  const addSocialMetaTag = function (name: string, content: string): any {
    metaArray.push({
      property: name,
      content,
    });
  };

  if (page.seo?.description != null && page.seo?.description !== "") {
    addSocialMetaTag("description", page.seo.description);
    addSocialMetaTag("og:description", page.seo.description);
    addSocialMetaTag("twitter:description", page.seo.description);
  }

  const fullUrl = getFullUrl();
  const image = getPageImage();

  if (fullUrl !== "" && fullUrl !== undefined) {
    addSocialMetaTag("og:url", fullUrl);
    addSocialMetaTag("twitter:url", fullUrl);
  }

  if (image !== "" && image !== undefined) {
    addSocialMetaTag("twitter:card", "summary_large_image");
    addSocialMetaTag("twitter:image", image);
    addSocialMetaTag("og:image", image);
  }

  addSocialMetaTag("og:type", "website");
  addSocialMetaTag("og:title", getPageTitle());
  addSocialMetaTag("twitter:title", getPageTitle());

  return {
    title: getPageTitle(),
    link: [],
    style: [],
    meta: metaArray,
  };
}
