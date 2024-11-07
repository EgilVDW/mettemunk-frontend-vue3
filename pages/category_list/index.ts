import { Vue, Component, Prop } from "nuxt-property-decorator";
import { ICategoryListPage } from "~/interfaces/pages";
import { generateHead } from "~/utils/generateHead";
import { ILink } from "~/interfaces/ui";

@Component({})
export default class CategoryListPage extends Vue {
	@Prop() public page: ICategoryListPage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
