import { Vue, Component, Prop } from "nuxt-property-decorator";
import { StructuredText } from "vue-datocms";
import { generateHead } from "~/utils/generateHead";
import { IContactPage } from "~/interfaces/pages";
import { ILink } from "~/interfaces/ui";

@Component({
	components: {
		StructuredText,
	},
})
export default class ContactPage extends Vue {
	@Prop() public page: IContactPage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
