import * as queries from "./queries/queries";
import * as routeQueries from "./queries/routingQueries";
import * as cmsClient from "./datoCmsClient";
import { ICmsBasicPage, ICmsDictionary } from "~/interfaces/cms/cmsBase";
import {
	ICmsArticlePage,
	ICmsCategoryListPage,
	ICmsCategoryPage,
	ICmsContactPage,
	ICmsFooter,
	ICmsFrontPage,
	ICmsHeader,
	ICmsProductPage,
	ICmsNotFoundPage,
} from "~/interfaces/cms/cmsPages";

export async function GetDictionary(): Promise<ICmsDictionary> {
	const result = await cmsClient.request(queries.getDictionary, { limit: 1 });
	return result.dictionary as ICmsDictionary;
}

export async function GetFrontPage(): Promise<ICmsFrontPage> {
	const result = await cmsClient.request(queries.getFrontPage, { limit: 1 });
	return result.front as ICmsFrontPage;
}

export async function GetNotFoundPage(): Promise<ICmsNotFoundPage> {
	const result = await cmsClient.request(queries.getNotFoundPage, { limit: 1 });
	return result.notFound as ICmsNotFoundPage;
}

export async function GetHeader(): Promise<ICmsHeader> {
	const result = await cmsClient.request(queries.getHeader, { limit: 1 });
	return result.header as ICmsHeader;
}

export async function GetFooter(): Promise<ICmsFooter> {
	const result = await cmsClient.request(queries.getFooter, { limit: 1 });
	return result.footer as ICmsFooter;
}

export async function GetCategoryListPage(): Promise<ICmsCategoryListPage> {
	const result = await cmsClient.request(queries.getCategoryList, { limit: 1 });
	return result.categoryList as ICmsCategoryListPage;
}

export async function GetAllCategoryPages(): Promise<ICmsCategoryPage[]> {
	const result = await cmsClient.request(queries.getAllCategoryPages, { limit: 1 });
	return result.allCategories as ICmsCategoryPage[];
}

export async function GetContactPage(id: string): Promise<ICmsContactPage> {
	const result = await cmsClient.request(queries.contact(id), { limit: 1 });
	return result.contact as ICmsContactPage;
}

export async function GetCategoryPage(id: string): Promise<ICmsCategoryPage> {
	const result = await cmsClient.request(queries.category(id), { limit: 1 });
	return result.category as ICmsCategoryPage;
}

export async function GetArticle(id: string): Promise<ICmsArticlePage> {
	const result = await cmsClient.request(queries.article(id), { limit: 1 });
	return result.article as ICmsArticlePage;
}

export async function GetProductPage(id: string): Promise<ICmsProductPage> {
	const result = await cmsClient.request(queries.product(id), { limit: 1 });
	return result.product as ICmsProductPage;
}

export async function GetLandingPage(id: string): Promise<ICmsFrontPage> {
	const result = await cmsClient.request(queries.landing(id), { limit: 1 });
	return result.landing as ICmsFrontPage;
}

export async function GetProductPages(categoryId: string): Promise<ICmsProductPage[]> {
	const result = await cmsClient.request(queries.products(categoryId), { limit: 1 });
	return result.allProducts as ICmsProductPage[];
}

export async function GetAllCategoryArticlePages(): Promise<ICmsArticlePage[]> {
	const listPage = await GetCategoryListPage();
	const result = await cmsClient.request(queries.GetAllCategoryArticlePages(listPage.id), { limit: 1 });
	return result.allArticles as ICmsArticlePage[];
}

export async function GetAllPages(): Promise<ICmsBasicPage[]> {
	const countResult = await cmsClient.request(routeQueries.getCountAllPages, { limit: 1 });
	let pages: ICmsBasicPage[] = [];

	for (let i = 0; i < Math.ceil(countResult._allArticlesMeta.count / 100); i++) {
		const ArticlePageResult = await cmsClient.request(routeQueries.getAllArticlePages(i * 100), { limit: 1 });
		// Articles
		(ArticlePageResult.allArticles as any[]).forEach((page) => {
			pages.push({
				id: page.id,
				slug: page.slug,
				path: "",
				title: page.bannerTitle,
				_modelApiKey: page._modelApiKey,
				parentPage: page.parentPage,
			});
		});
	}

	for (let i = 0; i < Math.ceil(countResult._allLandingsMeta.count / 100); i++) {
		const landingPageResult = await cmsClient.request(routeQueries.getAllLandingPages(i * 100), { limit: 1 });
		// Landing pages
		(landingPageResult.allLandings as any[]).forEach((page) => {
			pages.push({
				id: page.id,
				slug: page.slug,
				path: "",
				title: page.bannerTitle,
				_modelApiKey: page._modelApiKey,
				parentPage: page.parentPage,
			});
		});
	}

	for (let i = 0; i < Math.ceil(countResult._allCategoriesMeta.count / 100); i++) {
		const categoriePageResult = await cmsClient.request(routeQueries.getAllCategoriePages(i * 100), { limit: 1 });
		// Categories
		(categoriePageResult.allCategories as any[]).forEach((page) => {
			pages.push({
				id: page.id,
				slug: page.slug,
				path: "",
				title: page.bannerTitle,
				_modelApiKey: page._modelApiKey,
				parentPage: page.parentPage,
			});
		});
	}

	for (let i = 0; i < Math.ceil(countResult._allProductsMeta.count / 100); i++) {
		const productPageResult = await cmsClient.request(routeQueries.getAllProductPages(i * 100), { limit: 1 });
		// Products
		(productPageResult.allProducts as any[]).forEach((page) => {
			pages.push({
				id: page.id,
				slug: page.slug,
				path: "",
				title: page.title,
				_modelApiKey: page._modelApiKey,
				parentPage: page.parentPage,
			});
		});
	}

	for (let i = 0; i < Math.ceil(countResult._allContactsMeta.count / 100); i++) {
		const contactPageResult = await cmsClient.request(routeQueries.getAllContactPages(i * 100), { limit: 1 });
		// Contacts
		(contactPageResult.allContacts as any[]).forEach((page) => {
			pages.push({
				id: page.id,
				slug: page.slug,
				path: "",
				title: page.title,
				_modelApiKey: page._modelApiKey,
				parentPage: page.parentPage,
			});
		});
	}

	const pageResult = await cmsClient.request(routeQueries.getAllSinglePages, { limit: 1 });

	// Category list
	pages.push({
		id: pageResult.categoryList.id,
		slug: pageResult.categoryList.slug,
		path: "",
		title: pageResult.categoryList.bannerTitle,
		_modelApiKey: pageResult.categoryList._modelApiKey,
		parentPage: pageResult.categoryList.parentPage,
	});

	// Front
	pages.push({
		id: pageResult.front.id,
		slug: "",
		path: "",
		title: process.env.CULTURE === "da" ? "Forside" : "Home",
		_modelApiKey: pageResult.front._modelApiKey,
		parentPage: null,
	});

	const frontPage = pages.filter((p) => p._modelApiKey === "front")[0];

	// Null filter
	pages = pages.filter((x) => x != null && x.slug != null);

	// Filter self reference
	pages.forEach((page) => {
		if (page.parentPage != null && page.parentPage.id === page.id) {
			page.parentPage = null;
		}
	});

	// Set frontpage as parent on pages with no parent
	pages.forEach((page) => {
		if (page.parentPage == null && page !== frontPage) {
			page.parentPage = frontPage;
		}
	});

	// Calculate full path
	pages.forEach((page) => {
		let currentNode = pages.filter((x) => x.id === page.id)[0];

		while (currentNode !== frontPage) {
			if (currentNode.slug != null) {
				page.path = currentNode.slug + "/" + page.path;
			}

			currentNode = pages.filter((x) => x.id === currentNode.parentPage?.id)[0];
		}
	});

	// Fix slashes
	pages.forEach((page) => {
		page.path = "/" + page.path.substring(0, page.path.length - 1);
	});

	return pages;
}
