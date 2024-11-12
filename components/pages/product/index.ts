import { Vue, Component, Prop } from "nuxt-property-decorator";
import { StructuredText } from "vue-datocms";
import { IProductPage } from "~/interfaces/pages";
import { generateHead } from "~/utils/generateHead";
import { ILink } from "~/interfaces/ui";

@Component({
	components: {
		StructuredText,
	},
})
export default class ProductPage extends Vue {
	@Prop() public page: IProductPage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}

	public get anchorSection() {
		const title = this.page?.title;
		const document = this.page?.document;
		const description = this.page?.description;
		return {
			title,
			document,
			description,
		};
	}
}
