import { flushSync } from "preact/compat";
import { LANGUAGES, type LanguageType } from "../Common/CommonModel";
import { _isLanguageLoading, globalState } from "../context/GlobalState";

const LanguageDisplay: Record<LanguageType, string> = {
	en: "English",
	fr: "Français",
};

/**
 * A button that changes the language of the application
 * @param params Parameters
 * @param params.useTransition If the language change should use a transition
 * @param params.onClick On click event
 * @returns The language button
 */
export const LanguageButton = ({
	useTransition,
	onClick,
}: {
	useTransition: boolean;
	onClick?: (language: LanguageType) => void;
}) => {
	const setLanguageFn = (language: LanguageType) => () => {
		if (useTransition) {
			document.startViewTransition(() => flushSync(() => void ((globalState.language.value = language), onClick?.(language))));
		} else {
			setTimeout(() => void ((globalState.language.value = language), onClick?.(language)), 100);
		}
	};

	return (
		<select
			value={globalState.language.value}
			onChange={(e) => setLanguageFn(e.currentTarget.value as LanguageType)()}
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
