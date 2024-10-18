import toast from "react-hot-toast";
import { tr } from "../context/GlobalState";

/**
 * Creates a toast that says the given description is not implemented yet
 * @param description the description of the feature that is not implemented yet
 */
export const TodoFn = (description: string) => () => toast(`${description} ${tr.v["is not implemented yet"]}`, { icon: "⏳" });

/**
 * Calculates the width size object based on the given size.
 * The width size object is a string that represents the minimum value between the given size in viewport width (vw) and the given size multiplied by 10 pixels.
 *
 * @template T - The type of the size parameter.
 * @param {T} size - The size value to calculate the width size object.
 * @param {number} [scale=10] - The scale value to multiply the size value by to get the pixel value.
 * @returns The width size object as a string.
 */
export const widthSizeObj = <T extends number>(size: T, scale = 10) => `min(${size}vw, ${size * scale}px)` as const;

/**
 * Class that generates unique ids for objects.
 * @example
 * const exampleGenerator = new IdGenerator("key");
 * const a = exampleGenerator.withId({ name: "John" }); // { name: "John", key: 0 }
 * const b = exampleGenerator.withId(10); // { key: 1, data: 10 }
 * @template T - The type of the key parameter.
 * @param {T} key - The key to use for the id.
 * @returns The id generator object.
 */
export class IdGenerator<T extends string> {
	constructor(private key: T) {}
	private id = 0;
	/**
	 * Adds an id to the given object.
	 * @template U - The type of the data.
	 * @param {U} obj - If the data is an object, it adds the id to the object. Otherwise, it returns an object with the id and the data.
	 * @returns The object with the id.
	 */
	withId = <U>(
		obj: U
	): U extends object
		? U & { [K in T]: number }
		: { [K in T]: number } & {
				/** The data */
				data: U;
		  } => (typeof obj === "object" ? ({ ...obj, [this.key]: this.id++ } as any) : ({ [this.key]: this.id++, data: obj } as any));
}

/**
 * Debounces the given function.
 * @param fn The function to debounce.
 * @param ms The milliseconds to wait before calling the function.
 * @returns The debounced function.
 */
export const debounceFn = (fn: Function, ms: number) => {
	// eslint-disable-next-line no-undef
	let timeout: Timer;
	return <T extends any[]>(...args: T) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), ms);
	};
};

/**
 * Waits for the given amount of milliseconds.
 * @param ms the amount of milliseconds to wait
 * @returns a promise that resolves after the given amount of milliseconds
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Checks if the given object is empty.
 * @param obj the object to check
 * @returns true if the object is empty, false otherwise
 */
export const isObjectEmpty = (obj: Record<string, any>) => {
	for (const prop in obj) if (Object.hasOwn(obj, prop)) return false;
	return true;
};

/**
 * Tries to parse the given JSON string.
 * @param jsonString the JSON string to parse
 * @param defaultValue the default value to return if the JSON string is invalid
 * @returns the parsed JSON object or the default value if the JSON string is invalid
 */
export const tryParseJson = <T>(jsonString: string, defaultValue: T) => {
	try {
		return JSON.parse(jsonString) as T;
	} catch {
		return defaultValue;
	}
};

/**
 * Returns a string that represents the difference between two objects.
 * The format of the string is: 'path: value1 --> value2'. For undefined values, '___' is used.
 * @param obj1 first object
 * @param obj2 second object
 * @returns the difference between the two objects as a string
 */
export const objDiffStr = (obj1: Object, obj2: Object): string => {
	const keys = new Set([...Object.keys(obj1 ?? {}), ...Object.keys(obj2 ?? {})]) as Set<keyof typeof obj1 | keyof typeof obj2>;
	const result = [];
	for (const k of keys) {
		if (typeof obj1[k] === "object") {
			if (typeof obj2[k] === "object") {
				const diffStr = objDiffStr(obj1[k], obj2[k]);
				if (diffStr) diffStr.split("\n").forEach((line) => result.push(`${k}.${line}`));
			} else {
				const diffStr = objDiffStr(obj1[k], {});
				if (diffStr) diffStr.split("\n").forEach((line) => result.push(`${k}.${line}`));
				else result.push(`${k}: ${obj1[k] ?? "___"} --> ${obj2[k]}`);
			}
		} else if (typeof obj2[k] === "object") {
			const diffStr = objDiffStr({}, obj2[k]);
			if (diffStr) diffStr.split("\n").forEach((line) => result.push(`${k}.${line}`));
			else result.push(`${k}: ${obj1[k]} --> ${obj2[k] ?? "___"}`);
		} else if (obj1[k] !== obj2[k]) {
			result.push(`${k}: ${obj1[k] ?? "___"} --> ${obj2[k]}`);
		}
	}
	return result.join("\n");
};
