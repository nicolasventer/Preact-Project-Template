import { actions, st } from "@/actions/actions.impl";

export const DarkModeButton = ({ useTransition }: { useTransition: boolean }) => (
	<button
		id={`${st.colorScheme.current.value === "dark" ? "light" : "dark"}-mode-button`}
		onClick={actions.colorScheme.updateFn(st.colorScheme.current.value === "dark" ? "light" : "dark", useTransition)}
		disabled={st.colorScheme.isLoading.value}
		style={{ cursor: "pointer" }}
	>
		{st.colorScheme.current.value === "dark" ? "Light" : "Dark"} Mode
	</button>
);
