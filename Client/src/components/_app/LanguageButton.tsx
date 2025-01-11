import { actions, st } from "@/actions/actions.impl";
import { LANGUAGES, type LanguageType } from "@/Shared/SharedModel";

const LanguageDisplay: Record<LanguageType, string> = {
	en: "English",
	fr: "Français",
};

export const LanguageButton = ({ useTransition }: { useTransition: boolean }) => (
	<select
		value={st.language.current.value}
		onChange={(ev) => actions.language.updateFn(ev.currentTarget.value as LanguageType, useTransition)()}
		disabled={st.language.isLoading.value}
	>
		{LANGUAGES.map((language) => (
			<option key={language} value={language}>
				{LanguageDisplay[language]}
			</option>
		))}
	</select>
);
