import type { ILanguage } from "@/Actions/actions.interface";
import { state } from "@/Actions/actions.state";
import type { LanguageType } from "@/Shared/SharedModel";

export class LanguageImpl implements ILanguage {
	updateFn = (language: LanguageType, useTransition: boolean) => () => {
		if (useTransition) {
			document.startViewTransition(() => (state.language.value = language));
		} else {
			state.isLanguageLoading.value = true;
			setTimeout(() => {
				state.language.value = language;
				state.isLanguageLoading.value = false;
			}, 100);
		}
	};
}
