import * as mapper from "~/utils/mapper";
import type {
  IArticlePage,
  ICategoryListPage,
  ICategoryPage,
  IContactPage,
  IFrontPage,
  ILandingPage,
  IProductPage,
} from "~/interfaces/pages";
import * as cmsHelper from "../../resources/datoCmsHelper";
import type { ICardBlock } from "~/interfaces/blocks";

export default defineNuxtComponent({
  setup() {
    const { currentRoute } = useRouter();
    const { data } = useAsyncData(async () => {
      // await dictionaryStore.loadDictionaries();
      // await cmsPagesStore.loadPages();
      const cmsPagesStore = await cmsHelper.GetAllPages();
      const fullPath = currentRoute.value.fullPath;

      let currentPath = fullPath;
      if (currentPath.endsWith("/") && currentPath !== "/") {
        currentPath = currentPath.substring(0, currentPath.length - 1);
      }

      const getPathFromUrl = (url: string) => {
        return url.split("?")[0];
      };

      const filteredCurrentPath = getPathFromUrl(currentPath);

      const currentPage = cmsPagesStore.filter(
        (p) => p.path === filteredCurrentPath
      )[0];
      if (currentPage == null) {
        throw new Error("404");
      }

      if (currentPage._modelApiKey === "front") {
        const cmsPage = await cmsHelper.GetFrontPage();
        console.log(await mapper.mapLink(cmsPage.bannerLink[0]));
        const mapped: IFrontPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          bannerTitle: cmsPage.bannerTitle,
          bannerSubTitle: cmsPage.bannerSubTitle,
          bannerImage: await mapper.mapImage(cmsPage.bannerImage),
          bannerVideo: await mapper.mapVideo(cmsPage.bannerVideo),
          bannerLink:
            cmsPage.bannerLink != null && cmsPage.bannerLink[0] != null
              ? await mapper.mapLink(cmsPage.bannerLink[0])
              : null,
          seo: await mapper.mapSeo(cmsPage.seo),
          modularContent: await mapper.mapModularContent(
            cmsPage.modularContent
          ),
        };

        return {
          page: mapped,
          breadcrumbs: [],
        };
      }
      // CONTACT
      else if (currentPage._modelApiKey === "contact") {
        const cmsPage = await cmsHelper.GetContactPage(currentPage.id);
        const mapped: IContactPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          title: cmsPage.title,
          content: cmsPage.content,
          image: await mapper.mapImage(cmsPage.image),
          seo: await mapper.mapSeo(cmsPage.seo),
          departments: await Promise.all(
            cmsPage.departments.map(async (x) => await mapper.mapDepartment(x))
          ),
          showTop: await cmsPage.showTop,
        };

        return {
          page: mapped,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // ARTICLE
      else if (currentPage._modelApiKey === "article") {
        const cmsPage = await cmsHelper.GetArticle(currentPage.id);
        const mapped: IArticlePage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          bannerTitle: cmsPage.bannerTitle,
          bannerSubTitle: cmsPage.bannerSubTitle,
          bannerImage: mapper.mapImage(cmsPage.bannerImage),
          bannerVideo: mapper.mapVideo(cmsPage.bannerVideo),
          bannerLink:
            cmsPage.bannerLink != null && cmsPage.bannerLink[0] != null
              ? await mapper.mapLink(cmsPage.bannerLink[0])
              : null,
          seo: mapper.mapSeo(cmsPage.seo),
          title: cmsPage.title,
          modularContent: await mapper.mapModularContent(
            cmsPage.modularContent
          ),
        };

        return {
          page: mapped,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // LANDING
      else if (currentPage._modelApiKey === "landing") {
        const cmsPage = await cmsHelper.GetLandingPage(currentPage.id);
        const mapped: ILandingPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          bannerTitle: cmsPage.bannerTitle,
          bannerSubTitle: cmsPage.bannerSubTitle,
          bannerImage: mapper.mapImage(cmsPage.bannerImage),
          bannerVideo: mapper.mapVideo(cmsPage.bannerVideo),
          bannerLink:
            cmsPage.bannerLink != null && cmsPage.bannerLink[0] != null
              ? await mapper.mapLink(cmsPage.bannerLink[0])
              : null,
          seo: mapper.mapSeo(cmsPage.seo),
          modularContent: await mapper.mapModularContent(
            cmsPage.modularContent
          ),
        };

        return {
          page: mapped,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // CATEGORY LIST
      else if (currentPage._modelApiKey === "category_list") {
        const cmsPage = await cmsHelper.GetCategoryListPage();
        let categories = await cmsHelper.GetAllCategoryPages();
        let articles = await cmsHelper.GetAllCategoryArticlePages();

        articles = articles.filter((x) => x != null && x.slug != null);
        categories = categories.filter((x) => x != null && x.slug != null);

        const mappedCategories: ICardBlock[] = categories.map((x) => {
          return {
            title: x.bannerTitle,
            description: x.bannerSubTitle,
            image: mapper.mapImage(x.bannerImage),
            link: {
              url: `${fullPath}/${x.slug}`.replace("//", "/"),
              text:
                process.env.CULTURE === "da"
                  ? `Gå til ${x.bannerTitle}`
                  : `Go to ${x.bannerTitle}`,
              target: "",
              download: false,
              internal: true,
            },
          };
        });

        const mappedArticles: ICardBlock[] = articles.map((x) => {
          return {
            title: x.bannerTitle,
            description: x.bannerSubTitle,
            image: mapper.mapImage(x.bannerImage),
            link: {
              url: `${fullPath}/${x.slug}`.replace("//", "/"),
              text:
                process.env.CULTURE === "da"
                  ? `Gå til ${x.bannerTitle}`
                  : `Go to ${x.bannerTitle}`,
              target: "",
              download: false,
              internal: true,
            },
          };
        });

        const mappedItems: ICardBlock[] =
          mappedCategories.concat(mappedArticles);

        const mappedPage: ICategoryListPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          bannerTitle: cmsPage.bannerTitle,
          bannerSubTitle: cmsPage.bannerSubTitle,
          bannerImage: mapper.mapImage(cmsPage.bannerImage),
          bannerVideo: mapper.mapVideo(cmsPage.bannerVideo),
          bannerLink:
            cmsPage.bannerLink != null && cmsPage.bannerLink[0] != null
              ? await mapper.mapLink(cmsPage.bannerLink[0])
              : null,
          seo: mapper.mapSeo(cmsPage.seo),
          items: mappedItems,
        };

        return {
          page: mappedPage,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // CATEGORY
      else if (currentPage._modelApiKey === "category") {
        const cmsPage = await cmsHelper.GetCategoryPage(currentPage.id);
        const cmsProducts = await cmsHelper.GetProductPages(cmsPage.id);
        const mappedProducts: ICardBlock[] = cmsProducts.map((x) => {
          return {
            title: x.title,
            description: x.teaser,
            image: mapper.mapImage(x.images[0]),
            link: {
              url: `${fullPath}/${x.slug}`.replace("//", "/"),
              text:
                process.env.CULTURE === "da"
                  ? `Gå til ${x.title}`
                  : `Go to ${x.title}`,
              target: "",
              download: false,
              internal: true,
            },
          };
        });

        const mappedPage: ICategoryPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          slug: cmsPage.slug,
          bannerTitle: cmsPage.bannerTitle,
          bannerSubTitle: cmsPage.bannerSubTitle,
          bannerImage: mapper.mapImage(cmsPage.bannerImage),
          bannerVideo: mapper.mapVideo(cmsPage.bannerVideo),
          bannerLink:
            cmsPage.bannerLink != null && cmsPage.bannerLink[0] != null
              ? await mapper.mapLink(cmsPage.bannerLink[0])
              : null,
          seo: mapper.mapSeo(cmsPage.seo),
          products: mappedProducts,
        };

        return {
          page: mappedPage,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // PRODUCT
      else if (currentPage._modelApiKey === "product") {
        const cmsPage = await cmsHelper.GetProductPage(currentPage.id);
        const mappedPage: IProductPage = {
          id: cmsPage.id,
          type: cmsPage._modelApiKey,
          title: cmsPage.title,
          description: cmsPage.description,
          document: mapper.mapFile(cmsPage.document),
          images: cmsPage.images.map((x) => mapper.mapImage(x)),
          labels: cmsPage.labels.map((x) => mapper.mapLabel(x)),
          downloads: cmsPage.downloads.map((x) => mapper.mapFile(x)),
          seo: mapper.mapSeo(cmsPage.seo),
        };

        return {
          page: mappedPage,
          breadcrumbs: generateBreadcrumbs(cmsPage.id),
        };
      }
      // 404
      else {
        throw new Error(`No page supports type '${currentPage._modelApiKey}'`);
      }
    });

    return {
      data,
    };
  },
});
