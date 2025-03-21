import { objDiffStr } from "@/utils/clientUtils";
import { effect, type ReadonlySignal, signal, Signal } from "@preact/signals";
import { useEffect, useState } from "react";

/**
 * Type corresponding to a recursive read-only signal.
 * @example
 * type RecursiveReadOnlySignal = RecursiveReadOnlySignal<Signal<number>>; // ReadonlySignal<number>
 * type RecursiveReadOnlyArraySignal = RecursiveReadOnlySignal<Signal<number>[]>; // ReadonlySignal<number>[]
 * type RecursiveReadOnlyObjectSignal = RecursiveReadOnlySignal<{ a: Signal<number> }>; // { a: ReadonlySignal<number> }
 */
export type RecursiveReadOnlySignal<T> = T extends Signal<infer U>
	? T extends SignalWithUse<infer V>
		? ReadonlySignal<RecursiveReadOnlySignal<U>> & {
				/** Returns a state with the value of the signal. */
				use: () => V;
		  }
		: T extends SignalWithTime<infer V>
		? ReadonlySignal<RecursiveReadOnlySignal<U>> & {
				/** The value of the signal. */
				readonly vv: V;
		  }
		: ReadonlySignal<RecursiveReadOnlySignal<U>>
	: T extends SignalArray<infer V>
	? {
			/** The value of the signal. */
			readonly value: RecursiveReadOnlySignal<V[]>;
	  }
	: T extends SignalControlled<infer V>
	? {
			/** The value of the signal. */
			readonly value: RecursiveReadOnlySignal<V>;
	  }
	: T extends (infer U)[]
	? RecursiveReadOnlySignal<U>[]
	: T extends object
	? { [K in keyof T]: RecursiveReadOnlySignal<T[K]> }
	: T;

/**
 * Type corresponding to the value of a signal.
 * @example
 * type SignalValue = SignalToValue<Signal<number>>; // number
 * type SignalArrayValue = SignalToValue<Signal<number>[]>; // number[]
 * type SignalObjectValue = SignalToValue<{ a: Signal<number> }>; // { a: number }
 */
export type SignalToValue<T> = T extends Signal<infer U>
	? SignalToValue<U>
	: T extends Signal<infer U>[]
	? SignalToValue<U>[]
	: T extends object
	? { [K in keyof T]: SignalToValue<T[K]> }
	: T;

/**
 * Converts a signal to its value recursively.
 * @param signal the signal to convert
 * @returns the value corresponding to the signal
 * @example
 * signalToValue(signal(5)); // 5
 * signalToValue(signal({ a: signal(5) })); // { a: 5 }
 * signalToValue(signal([signal(5)])); // [5]
 */
export const signalToValue = <T>(signal: T): SignalToValue<T> => {
	if (signal instanceof Signal) return signalToValue(signal.value);
	if (Array.isArray(signal)) return signal.map(signalToValue) as SignalToValue<T>;
	if (typeof signal === "object") {
		const obj: Record<string, unknown> = {};
		for (const key in signal) obj[key] = signalToValue(signal[key]);
		return obj as SignalToValue<T>;
	}
	return signal as SignalToValue<T>;
};

/**
 * Type corresponding to a signal of a value.
 * @example
 * type ValueSignal = ValueToSignal<number>; // Signal<number>
 * type ArrayValueSignal = ValueToSignal<number[]>; // Signal<Signal<number>[]> (array is a special case)
 * type ObjectValueSignal = ValueToSignal<{ a: number }>; // { a: Signal<number> }
 */
export type ValueToSignal<T> = T extends (infer U)[]
	? Signal<ValueToSignal<U>[]>
	: T extends object
	? { [K in keyof T]: ValueToSignal<T[K]> }
	: Signal<T>;

/**
 * Converts a value to a signal recursively.
 * @param value the value to convert
 * @returns the signal corresponding to the value
 * @example
 * const v1 = 5;
 * const signal1 = valueToSignal(v1); // signal(5)
 * const v2 = { a: 5 };
 * const signal2 = valueToSignal(v2); // { a: signal(5) }
 * const v3 = [5];
 * const signal3 = valueToSignal(v3); // signal([signal(5)]) (array is a special case)
 */
export const valueToSignal = <T>(value: T): ValueToSignal<T> => {
	if (value instanceof Signal) return value as ValueToSignal<T>;
	if (Array.isArray(value)) return signal(value.map(valueToSignal)) as ValueToSignal<T>;
	if (typeof value === "object") {
		const obj: Record<string, unknown> = {};
		for (const key in value) obj[key] = valueToSignal(value[key]);
		return obj as ValueToSignal<T>;
	}
	return signal(value) as ValueToSignal<T>;
};

/**
 * Creates a signal that shows a toast with the difference between the old and new value.
 * @param initialValue the initial value of the signal
 * @param onDiff the function to call when a difference is detected
 * @returns the signal
 */
export const signalWithDiff = <T>(initialValue: T, onDiff: (diffStr: string) => void) => {
	const oldSignal = signal<T>(initialValue);
	const newSignal = signal<T>(initialValue);
	effect(() => {
		const oldSignalValue = oldSignal.peek();
		const newSignalValue = newSignal.value;
		const diffStr =
			typeof oldSignalValue === "object"
				? objDiffStr(oldSignalValue ?? {}, typeof newSignalValue === "object" ? newSignalValue ?? {} : {})
				: oldSignalValue !== newSignalValue
				? `${oldSignalValue} --> ${newSignalValue}`
				: "";
		if (!diffStr) return;
		onDiff(diffStr);
		oldSignal.value = newSignal.value;
	});
	return newSignal;
};

/** Creates a signal with a time value. The time is updated every time the value is updated. */
export class SignalWithTime<T> extends Signal<{
	/** The value of the signal. */
	val: T;
	/** The time of the last update of the signal. */
	time: number;
}> {
	/**
	 * Creates a signal with a time value. The time is updated every time the value is updated.
	 * @param initialValue the initial value of the signal
	 * @param initialTime the initial time of the signal
	 * @returns the signal
	 */
	constructor(initialValue: T, initialTime = Date.now()) {
		super({ val: initialValue, time: initialTime });
	}

	/** Get the value of the signal. (not named `v` since it is already defined in Signal) */
	get vv() {
		return this.value.val;
	}

	/** Set the value of the signal. (not named `v` since it is already defined in Signal) */
	set vv(v: T) {
		this.value = { val: v, time: Date.now() };
	}

	/** Updates the time of the signal to the current time. */
	refreshTime() {
		this.value = { val: this.peek().val, time: Date.now() };
	}
}

/** Creates a signal with a time value. The time is updated every time the value is updated. */
export const signalWithTime = <T>(initialValue: T, time = Date.now()) => new SignalWithTime(initialValue, time);

/**
 * Synchronizes two signals with a time value. The signal with the earliest time is updated with the value of the other signal.
 * @param signal1 the first signal
 * @param signal2 the second signal
 */
export const syncSignalWithTime = <T>(signal1: SignalWithTime<T>, signal2: SignalWithTime<T>) =>
	signal1.value.time < signal2.value.time ? (signal1.value = signal2.value) : (signal2.value = signal1.value);

/**
 * Creates a signal with the `use` method that returns a state with the value of the signal. \
 * *(This is a shortcut of the custom hook `useReact`.)* \
 * **This class should not be needed if `@preact/signals-react` is used.**
 */
export class SignalWithUse<T> extends Signal<T> {
	/** Returns a state with the value of the signal. */
	use = () => {
		const [value, setValue] = useState(this.value);
		useEffect(() => effect(() => setValue(this.value)), []);
		return value;
	};
}

/** Creates a signal with the `use` method that returns a state with the value of the signal. */
export const signalWithUse = <T>(signal: T) => new SignalWithUse(signal);

/**
 * Creates a signal of an array. The signal triggers an effect every time the array is updated by value or with \
 * the `push`, `pop`, or `splice` methods.
 */
export class SignalArray<T> {
	private s = signal(false);

	/**
	 * Constructs a signal of an array.
	 * @param array the initial array
	 */
	constructor(private array: T[]) {}

	/** The value of the signal. */
	get value() {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		this.s.value;
		return this.array;
	}

	/** Set the value of the signal. */
	set value(value: T[]) {
		this.array = value;
		this.s.value = !this.s.peek();
	}

	/** Get the value of the signal without registering the trigger. */
	peek = () => this.array;

	/** Push a value to the array. */
	push = (value: T) => {
		this.array.push(value);
		this.s.value = !this.s.peek();
	};

	/** Pop a value from the array. */
	pop = () => {
		this.array.pop();
		this.s.value = !this.s.peek();
	};

	/** Splice the array. */
	splice = (start: number, deleteCount: number, ...items: T[]) => {
		this.array.splice(start, deleteCount, ...items);
		this.s.value = !this.s.peek();
	};
}

/**
 * Creates a signal of an array. The signal triggers an effect every time the array is updated by value or with \
 * the `push`, `pop`, or `splice` methods.
 * @param array the initial array
 * @returns the signal
 */
export const signalArray = <T>(array: T[]) => new SignalArray(array);

/**
 * Creates a controlled signal. The signal triggers an effect every time the `refresh` method is called.
 */
export class SignalControlled<T> {
	private s = signal(false);

	/**
	 * Constructs a controlled signal.
	 * @param value_ the initial value
	 */
	constructor(private value_: T) {}

	/** The value of the signal. */
	get value() {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		this.s.value;
		return this.value_;
	}

	/** Set the value of the signal. */
	set value(v: T) {
		this.value_ = v;
	}

	/** Get the value of the signal without registering the trigger. */
	peek = () => this.value_;

	/** Refresh the signal. */
	refresh = (): void => void (this.s.value = !this.s.value);
}

/**
 * Creates a controlled signal. The signal triggers an effect every time the `refresh` method is called.
 * @param initialValue the initial value
 * @returns the signal
 */
export const signalControlled = <T>(initialValue: T) => new SignalControlled(initialValue);
