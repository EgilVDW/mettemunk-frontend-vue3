import { Component, Prop, Vue } from "nuxt-property-decorator";
import IconLogo from "~/assets/icons/icon-logo-border.svg?inline";

@Component({
	name: "Loader",
	components: { IconLogo },
})
export default class Loader extends Vue {
	@Prop({ type: Boolean, default: true })
	readonly args!: boolean;
}
