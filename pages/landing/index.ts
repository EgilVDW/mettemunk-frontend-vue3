import { Vue, Component, Prop } from "nuxt-property-decorator";
import { generateHead } from "~/utils/generateHead";
import { ILandingPage } from "~/interfaces/pages";
import { ILink } from "~/interfaces/ui";

@Component({})
export default class LandingPage extends Vue {
	@Prop() public page: ILandingPage;
	@Prop() public breadcrumbs: ILink[];

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
