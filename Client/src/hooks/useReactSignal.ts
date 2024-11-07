import { useState } from "react";

export type ReactSignal<T> = { value: T };

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
