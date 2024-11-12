import { Vue, Component, Prop } from "nuxt-property-decorator";
import { generateHead } from "~/utils/generateHead";
import { IArticlePage } from "~/interfaces/pages";
import { ILink } from "~/interfaces/ui";

@Component({})
export default class ArticlePage extends Vue {
	@Prop() public page: IArticlePage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
