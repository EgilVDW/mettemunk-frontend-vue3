const culture = process.env.CULTURE ?? "da";

export function getAllArticlePages(skip: number ): string {return `query GetAllPages {
	allArticles(locale: ${culture}, skip: ${skip},  first: 100) {
	  id
	  slug
	  _modelApiKey
	  bannerTitle
	  parentPage {
		... on ArticleRecord {
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
	  }
	}
}`;
}
export function getAllCategoriePages(skip: number ): string {return `query GetAllPages {
    allCategories(locale: ${culture}, skip: ${skip}, first: 100) {
        id
        slug
        _modelApiKey
        bannerTitle
        parentPage {
          id
        }
      }
}`;
}

export function getAllProductPages(skip: number ): string {return `query GetAllPages {
    allProducts(locale: ${culture}, skip: ${skip}, first: 100) {
        id
        slug
        _modelApiKey
        title
        parentPage {
          id
        }
      }
}`;
}

export function getAllContactPages (skip: number ): string {return `query GetAllPages {
    allContacts(locale: ${culture}, skip: ${skip}, first: 100) {
        id
        slug
        _modelApiKey
        title
        parentPage {
          id
        }
      }
}`;
}

export const getAllSinglePages = `query GetAllPages {
    categoryList(locale: ${culture}) {
        id
        slug
        _modelApiKey
        bannerTitle
        parentPage {
          id
        }
      }
      front(locale: ${culture}) {
        id
        bannerTitle
        _modelApiKey
      }
}`;

export function getAllLandingPages (skip: number ): string {return `query GetAllPages {
	allLandings(locale: ${culture}, skip: ${skip}, first: 100) {
		id
		slug
		_modelApiKey
		bannerTitle
		parentPage {
		  ... on ArticleRecord {
			id
		  }
		  ... on ContactRecord {
			id
		  }
		  ... on LandingRecord {
			id
		  }
		}
	  }
  }`;
}

export const getCountAllPages = `query getCountAllPages
  {
	  _allProductsMeta(locale: da) {
		  count
		}
		_allArticlesMeta(locale: da) {
		  count
		}
		_allCategoriesMeta(locale: da) {
		  count
		}
		_allContactsMeta(locale: da) {
		  count
		}
		_allLandingsMeta(locale: da) {
		  count
		}
  }`;