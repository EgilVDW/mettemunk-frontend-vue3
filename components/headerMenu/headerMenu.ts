import { Vue, Component, Prop } from "nuxt-property-decorator";
import { IParentChildrenLinkCollection } from "~/interfaces/blocks";

@Component
export default class HeaderMenu extends Vue {
	@Prop()
	readonly data: IParentChildrenLinkCollection[];

	public activeIndex: number | null = null;
	public resetValue: string = "0px";

	mounted() {
		this.$root.$on("close-dropdowns", this.closeDropdowns);
	}

	public closeMenu() {
		this.$emit("close-menu");
	}

	public setDropdown(index: number) {
		const el = this.$refs.dropdown as HTMLElement[];
		const closeAllDropdowns = this.activeIndex === index;

		el?.forEach((item, i) => {
			const dropdown = item.querySelector(".menu-mobile__dropdown") as HTMLElement;
			if (index !== i || closeAllDropdowns) {
				dropdown.style.maxHeight = this.resetValue;
			} else {
				const childEl = dropdown.firstChild as HTMLElement;
				const height = childEl ? childEl.clientHeight : 250;
				dropdown.style.maxHeight = height + 12 + "px";
			}
		});

		this.activeIndex = closeAllDropdowns ? null : index;
	}

	public closeDropdowns() {
		const el = this.$refs.dropdown as HTMLElement[];
		el?.forEach((item) => {
			const dropdown = item.querySelector(".menu-mobile__dropdown") as HTMLElement;
			dropdown.style.maxHeight = this.resetValue;
		});

		this.activeIndex = null;
	}
}
