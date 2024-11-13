import { LANGUAGES, type LanguageType } from "../Common/CommonModel";
import { _isLanguageLoading, gs } from "../context/GlobalState";
import { setLanguageFn } from "../context/userActions";
import { useReact } from "../hooks/useReact";

const LanguageDisplay: Record<LanguageType, string> = {
	en: "English",
	fr: "Français",
};

/**
 * A button that changes the language of the application
 * @param params
 * @param params.useTransition If the language change should use a transition
 * @returns The language button
 */
export const LanguageButton = ({ useTransition }: { useTransition: boolean }) => {
	useReact(_isLanguageLoading);
	useReact(gs.language);

	return (
		<select
			value={gs.language.value}
			onChange={(ev) => setLanguageFn(ev.currentTarget.value as LanguageType, useTransition)()}
			disabled={_isLanguageLoading.value}
		>
			{LANGUAGES.map((language) => (
				<option key={language} value={language}>
					{LanguageDisplay[language]}
				</option>
			))}
		</select>
	);
};
