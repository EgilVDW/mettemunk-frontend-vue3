import { Vue, Component, Prop } from "nuxt-property-decorator";
import { generateHead } from "~/utils/generateHead";
import { IFrontPage } from "~/interfaces/pages";

@Component({})
export default class FrontPage extends Vue {
	@Prop() public page: IFrontPage;

	head() {
		return generateHead(this.$route.path, this.page);
	}
}
