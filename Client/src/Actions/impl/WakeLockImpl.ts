import { IWakeLock } from "@/Actions/actions.interface";
import { state } from "@/Actions/actions.state";

export class WakeLockImpl implements IWakeLock {
	toggle = () => (state.isWakeLock.value = !state.isWakeLock.value);
}
