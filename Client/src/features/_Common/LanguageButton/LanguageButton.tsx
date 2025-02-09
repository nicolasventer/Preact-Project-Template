import { actions, st } from "@/Actions/actions.impl";
import { Vertical } from "@/libs/StrongBox/ComponentToolbox";
import { LANGUAGES, type LanguageType } from "@/Shared/SharedModel";
import { ActionIcon, Button, Popover, Select } from "@mantine/core";
import { Languages } from "lucide-react";

const LanguageDisplay: Record<LanguageType, string> = {
	en: "English",
	fr: "Français",
};

export const LanguageButton = ({ useTransition }: { useTransition: boolean }) => (
	<Popover position="bottom-end" withArrow>
		<Popover.Target>
			<ActionIcon loading={useTransition && st.language.isLoading.value}>
				<Languages />
			</ActionIcon>
		</Popover.Target>
		<Popover.Dropdown p={8}>
			<Vertical gap={8}>
				{LANGUAGES.map((language) => (
					<Button
						key={language}
						onClick={actions.language.updateFn(language, useTransition)}
						variant={language === st.language.current.value ? "filled" : "light"}
					>
						{LanguageDisplay[language]}
					</Button>
				))}
			</Vertical>
		</Popover.Dropdown>
	</Popover>
);

export const LanguageButton2 = ({ useTransition }: { useTransition: boolean }) => (
	<Select
		label="Language"
		data={LANGUAGES.map((language) => ({ value: language, label: LanguageDisplay[language] }))}
		value={st.language.current.value}
		onChange={(value) => actions.language.updateFn(value as LanguageType, useTransition)()}
		allowDeselect={false}
		comboboxProps={{ withinPortal: false }}
		disabled={st.language.isLoading.value}
	/>
);
