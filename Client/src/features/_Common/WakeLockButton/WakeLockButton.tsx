import { actions, computedSt, st } from "@/Actions/actions.impl";
import { widthSizeObj } from "@/libs/StrongBox/clientUtils";
import { ActionIcon } from "@mantine/core";
import { Lock, LockOpen } from "lucide-react";

/**
 * The wake lock button
 * @returns the button to toggle the wake lock
 */
export const WakeLockButton = () => (
	<>
		{computedSt.isWakeLockAvailable && (
			<ActionIcon loading={st.wakeLock.isLoading.value} pb={1}>
				{st.wakeLock.isEnabled.value ? (
					<Lock onClick={actions.wakeLock.toggle} width={widthSizeObj(3.5, 6)} />
				) : (
					<LockOpen onClick={actions.wakeLock.toggle} width={widthSizeObj(3.5, 6)} />
				)}
			</ActionIcon>
		)}
	</>
);
