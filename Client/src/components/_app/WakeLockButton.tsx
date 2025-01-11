import { actions, computedSt, st } from "@/actions/actions.impl";

export const WakeLockButton = () => (
	<>
		{computedSt.isWakeLockAvailable && (
			<button onClick={actions.wakeLock.toggle} disabled={st.wakeLock.isLoading.value}>
				{st.wakeLock.isEnabled.value ? "Enable" : "Disable"} Automatic Screen Lock
			</button>
		)}
	</>
);
