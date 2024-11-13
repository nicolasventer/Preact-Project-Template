import { effect, signal } from "@preact/signals";
import { gs } from "../context/GlobalState";
import { setWakeLock } from "../context/userActions";
import { useReact } from "../hooks/useReact";

const isWakeLockAvailable = "wakeLock" in navigator || "keepAwake" in screen;

let showToasts = true;

// eslint-disable-next-line no-undef
let wakeLockObj: WakeLockSentinel | null = null;
const isWakeLockLoading = signal(false);

/**
 * Toggles the wake lock
 */
export const toggleWakeLock = () => {
	if ("wakeLock" in navigator) {
		if (wakeLockObj) {
			wakeLockObj.release();
			wakeLockObj = null;
			setWakeLock(false);
		} else {
			isWakeLockLoading.value = true;
			navigator.wakeLock
				.request("screen")
				.then((wakeLock) => {
					wakeLockObj = wakeLock;
					isWakeLockLoading.value = false;

					wakeLockObj.addEventListener("release", () => {
						showToasts && console.info("Automatic screen lock enabled", "🔓");
						setWakeLock(false);
						wakeLockObj = null;
					});

					setWakeLock(true);
					showToasts && console.info("Automatic screen lock disabled", "🔒");
				})
				.catch((err) => {
					showToasts && console.error(err);
					isWakeLockLoading.value = false;
					showToasts && console.info("Error while trying to keep screen locked on", "❌");
				});
		}
	} else if ("keepAwake" in screen) {
		screen.keepAwake = !screen.keepAwake;
		setWakeLock(!!screen.keepAwake);
		if (screen.keepAwake) showToasts && console.info("Automatic screen lock disabled", "🔒");
		else showToasts && console.info("Automatic screen lock enabled", "🔓");
	}
};

const isDocumentVisible = signal(document.visibilityState === "visible");
document.addEventListener("visibilitychange", () => (isDocumentVisible.value = document.visibilityState === "visible"));

/**
 * Automatically toggles the wake lock when the document is visible. (toasts are disabled)
 */
export const automaticWakeLock = () => {
	showToasts = false;
	effect(() => void (isDocumentVisible.value && !gs.isWakeLock.value && toggleWakeLock()));
};

/**
 * The wake lock button
 * @returns the button to toggle the wake lock
 */
export const WakeLockButton = () => {
	useReact(isWakeLockLoading);
	useReact(gs.isWakeLock);

	return (
		<>
			{isWakeLockAvailable && (
				<button onClick={toggleWakeLock} disabled={isWakeLockLoading.value}>
					{gs.isWakeLock.value ? "Enable" : "Disable"} Automatic Screen Lock
				</button>
			)}
		</>
	);
};
