const culture = process.env.CULTURE ?? "da";

/* Partials */
const getSeo = `seo {
	title
	description
}`;

const getResponsiveImage = (
	params?: string,
	sizes: string | null = null
) => `responsiveImage (sizes: "${sizes}",imgixParams: { auto: format ${params ? ", " + params : " "}}) {
	alt
	aspectRatio
	base64
	bgColor
	height
	sizes
	src
	srcSet
	title
	webpSrcSet
	width
}`;

const video = `video {
	mp4Url 
	streamingUrl
	thumbnailUrl(format: jpg)
}`;

const getProduct = `{
	id
	_modelApiKey
	title
	slug
	teaser
	description {
	  value
	}
	images {
	  ${getResponsiveImage("w: 730, h: 492, fit: crop")}
		${video}
	}
	document {
	  url
	  filename
	}
	labels {
	  title
	  content {
		value
	  }
	  icon {
			alt
			url
	  }
	}
	downloads {
	  url
	  filename
		title
	}
	${getSeo}
  }`;

const getBannerLink = `bannerLink {
	text
	newWindow
	external
	page {
	  ... on ArticleRecord {
		id
	  }
	  ... on CategoryListRecord {
		id
	  }
	  ... on CategoryRecord {
		id
	  }
	  ... on ContactRecord {
		id
	  }
	  ... on LandingRecord {
		id
	  }
	  ... on ProductRecord {
		id
	  }
	}
  }`;

const getBannerVideo = `bannerVideo {
	${video}
}`;

const getModularContent = `modularContent {
	... on SeventyThirtyBlockRecord {
	  title
	  direction
	  description
	  link {
		text
		newWindow
		external
		page {
			... on ArticleRecord {
			  id
			}
			... on CategoryListRecord {
			  id
			}
			... on CategoryRecord {
			  id
			}
			... on ContactRecord {
			  id
			}
			... on LandingRecord {
			  id
			}
			... on ProductRecord {
			  id
			}
		  }
		_modelApiKey
	  }
	  image {
		${getResponsiveImage(
			"h: 620, w: 950, fit: crop, crop: focalpoint, auto: format, q: 80, fit: crop",
			"(max-width: 375px) 335px, (max-width: 450px) 375px, (max-width: 800px) 540px, (max-width: 1280px) 910px, (max-width: 1600px) 950px, (max-width: 1920px) 1145px,"
		)}
	  }
	  _modelApiKey
	}
	... on CardListBlockRecord {
	  cards {
		title
		description
		image {
			${getResponsiveImage(
				'h: 280, w: 400 crop: focalpoint, auto: format, q: 80, ar: "4:3", fit: crop',
				"(max-width: 375px) 331px, (max-width: 450px) 370px, (max-width: 800px) 340px, (max-width: 1280px) 377px, (max-width: 1600px) 400px, (max-width: 1920px) 480px,"
			)}
		}
		link {
		  text
		  external
		  page {
			... on ArticleRecord {
			  id
			}
			... on CategoryListRecord {
			  id
			}
			... on CategoryRecord {
			  id
			}
			... on ContactRecord {
			  id
			}
			... on LandingRecord {
			  id
			}
			... on ProductRecord {
			  id
			}
		  }
		  newWindow
		  _modelApiKey
		}
	  }
	  _modelApiKey
	}
	... on CardListDocumentBlockRecord {
	  _modelApiKey
	  cards {
		title
		description
		image {
			${getResponsiveImage(
				'h: 280, w: 400 crop: focalpoint, auto: format, q: 80, ar: "4:3", fit: crop',
				"(max-width: 375px) 331px, (max-width: 450px) 370px, (max-width: 800px) 340px, (max-width: 1280px) 377px, (max-width: 1600px) 400px, (max-width: 1920px) 480px,"
			)}
		}
		file {
		  url
		  filename
		}
	  }
	}
	... on CardListArticleBlockRecord {
	  _modelApiKey
	  cards {
		id
		bannerTitle
		bannerImage {
			${getResponsiveImage(
				'h: 280, w: 400 crop: focalpoint, auto: format, q: 80, ar: "4:3", fit: crop',
				"(max-width: 375px) 331px, (max-width: 450px) 370px, (max-width: 800px) 340px, (max-width: 1280px) 377px, (max-width: 1600px) 400px, (max-width: 1920px) 480px,"
			)}
		}
	  }
	}
  }`;

/* Pages */

export const getNotFoundPage = `query NotFoundPage {
	notFound(locale: ${culture}) {
	  title
	  content {
		value
	  }
	}
  }`;

export const getFrontPage = `query FrontPage {
	front(locale: ${culture}) {
	  _modelApiKey
	  id
	  bannerTitle
	  bannerSubTitle
	  bannerImage {
		${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, fit: crop, auto: format, q: 80", "100vw")}
	  }
	  ${getBannerLink}
	  ${getBannerVideo}
	  ${getSeo}
	  ${getModularContent}
	}
  }`;

export const getDictionary = `query GetDictionaryItems {
	dictionary(locale: ${culture}) {
	  newsletterTitle
	  newsletterSignup
	  thankYouMessage
	  newsletterErrorFieldRequired
	  newsletterErrorEmailFormat
	  newsletterEnterEmail
	  generalCompanyName
	  socialMediaLinkedin
	  labelsSubtitle(markdown: true)
      labelsTitle
	  productOpenFile
	  productToLabels
	  productToDownloads
	  newsletterHeader
	  firstName
	  lastName
	  newsletterAcceptTermsOne
	  newsletterAcceptTermsTwo
	  newsletterAcceptTermsThree
	}
  }`;

export const getCategoryList = `query CategoryList {
	  categoryList(locale: ${culture}) {
		  id
		  _modelApiKey
		  bannerTitle
		  bannerSubTitle
		  bannerImage {
			${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, fit: crop, q: 80", "100vw")}
		  }
		  ${getSeo}
		}
	}`;

export const getAllCategoryPages = `query AllCategoryPages {
		allCategories(orderBy: position_ASC, locale: ${culture}, first: 100) {
			id
			_modelApiKey
			slug
			bannerTitle
			bannerSubTitle
			bannerImage {
				${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, fit: crop, q: 80", "100vw")}
			}
			${getSeo}
		}
	}`;

export const getFooter = `query Footer {
	footer(locale: ${culture}) {
		column1 {
			value
		}
		column2 {
			title
			links {
				text
				newWindow
				external
				page {
					... on ArticleRecord {
					id
					}
					... on CategoryListRecord {
					id
					}
					... on CategoryRecord {
					id
					}
					... on ContactRecord {
					id
					}
					... on LandingRecord {
					id
					}
					... on ProductRecord {
					id
					}
				}
			}
		}
		column3 {
			title
			links {
				text
				newWindow
				external
				page {
					... on ArticleRecord {
					id
					}
					... on CategoryListRecord {
					id
					}
					... on CategoryRecord {
					id
					}
					... on ContactRecord {
					id
					}
					... on LandingRecord {
					id
					}
					... on ProductRecord {
					id
					}
				}
			}
		}
	}
}`;

export const getHeader = `query Header {
	header(locale: ${culture}) {
	  menu {
		link {
		  text
		  external
		  newWindow
		  page {
			... on ContactRecord {
			  id
			}
			... on ArticleRecord {
				id
			}
			... on CategoryRecord {
				id
			}
			... on CategoryListRecord {
				id
			}
			... on LandingRecord {
				id
			}
			... on ProductRecord {
				id
			}
		  }
		}
		links {
		  text
		  page {
			... on ContactRecord {
				id
			}
			... on ArticleRecord {
				id
			}
			... on CategoryRecord {
				id
			}
			... on CategoryListRecord {
				id
			}
			... on LandingRecord {
				id
			}
			... on ProductRecord {
				id
			}
		  }
		  external
		  _modelApiKey
		}
	  }
	}
  }`;

export function landing(id: string): string {
	return `query LandingPage {
		landing(filter: {id: {eq: "${id}"}}, locale: ${culture}) {
			_modelApiKey
			id
			bannerTitle
			bannerSubTitle
			bannerImage {
				${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, q: 80", "100vw")}
			}
			${getSeo}
			${getModularContent}
		}
	  }`;
}

export function article(id: string): string {
	return `query GetArticleBySlug {
		article(filter: {id: {eq: "${id}"}}, locale: ${culture}) {
			id
			_modelApiKey
			title
			bannerTitle
			bannerSubTitle
			bannerImage {
				${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, q: 80", "100vw")}
			}
			${getSeo}
			modularContent {
				... on TextBlockRecord {
					_modelApiKey
					text {
						value
						links {
							... on ProductRecord {
								id
							}
							... on LandingRecord {
								id
							}
							... on ContactRecord {
								id
							}
							... on CategoryRecord {
								id
							}
							... on CategoryListRecord {
								id
							}
							... on ArticleRecord {
								id
							}
						}
					}
				}
				... on ImageBlockRecord {
					id
					_modelApiKey
					image {
						${getResponsiveImage(
							'ar: "4:3", h: 490, w: 730 crop: focalpoint, auto: format, q: 80, fit: crop',
							"(max-width: 375px) 335px,(max-width: 414px) 374px, (max-width: 768px) 728px,(max-width: 1024px) 557px,(max-width: 1280px) 667px,(min-width: 1536px), 730px,(min-width: 1920px) 905px"
						)}
					}
					caption
				}
				... on VideoBlockRecord {
					id
					_modelApiKey
					caption
					video {
					   ${video}
					}
				}
			}
		}
	}`;
}

export function category(id: string): string {
	return `query GetCategoryBySlug {
		category(filter: {id: {eq: "${id}"}}, locale: ${culture}) {
			id
		  _modelApiKey
		  slug
		  bannerTitle
		  bannerSubTitle
		  bannerImage {
			${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, q: 80", "100vw")}
		  }
		  ${getSeo}
		}
	  }`;
}

export function product(id: string): string {
	return `query GetProductBySlug {
		product(filter: {id: {eq: "${id}"}}, locale: ${culture})
		  ${getProduct}
	  }`;
}

export function products(categoryId: string): string {
	return `query GetProductsByCategoryId {
		allProducts(orderBy: position_ASC, filter: {parentPage: {eq: "${categoryId}"}}, locale: ${culture}, first: 100)
		  ${getProduct}
	  }`;
}

export function contact(id: string): string {
	return `query Contact {
		contact(filter: {id: {eq: "${id}"}}, locale: ${culture}) {
			id
			_modelApiKey
			title
			content {
				value
			}
			showTop
			departments {
				employees {
					name
					title
					phone
					email
					image {
						${getResponsiveImage('w: 170, h: 170, fit: crop, crop: focalpoint, ar: "1:1", fpZ: 1', "170px")}
					}
				}
				name
			}
			image {
				${getResponsiveImage()}
			}
			${getSeo}
		}
	}`;
}

export function GetAllCategoryArticlePages(partentId: string): string {
	const query = `query AllCategoryArticlePages {
	allArticles(locale: ${culture}, filter: {parentPage: {eq: "${partentId}"}}) {
		id
		_modelApiKey
		slug
		bannerTitle
		bannerSubTitle
		bannerImage {
			${getResponsiveImage("h: 900, w: 1440 crop: focalpoint, auto: format, fit: crop, q: 80", "100vw")}
		}
		${getSeo}
	}
}`;
	return query;
}
