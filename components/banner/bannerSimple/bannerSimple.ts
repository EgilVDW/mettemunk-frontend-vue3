import { Vue, Component, Prop } from "nuxt-property-decorator";
import { ICmsBannerPage } from "~/interfaces/cms/cmsPages";

@Component
export default class BannerSimple extends Vue {
	@Prop()
	readonly page: ICmsBannerPage;
}
