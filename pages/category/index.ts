import { Vue, Component, Prop } from "nuxt-property-decorator";
import { ICategoryPage } from "~/interfaces/pages";
import { generateHead } from "~/utils/generateHead";
import { ILink } from "~/interfaces/ui";

@Component({})
export default class CategoryPage extends Vue {
	@Prop() public page: ICategoryPage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
