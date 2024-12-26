import { useState } from "react";

/** A signal that can be used to trigger a re-render when the value changes. */
export type ReactSignal<T> = {
	/** The value of the signal. */
	value: T;
};

/**
 * Creates a signal that can be used to trigger a re-render when the value changes.
 * @param initialValue the initial value of the signal
 * @returns the signal
 */
export const useReactSignal = <T>(initialValue: T | (() => T)): ReactSignal<T> => {
	const [value, setValue] = useState(initialValue);
	const signal = {
		get value() {
			return value;
		},
		set value(newValue: T) {
			setValue(newValue);
		},
	};
	return signal;
};
