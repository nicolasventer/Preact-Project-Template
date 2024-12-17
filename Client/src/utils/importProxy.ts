import { computed, signal } from "@preact/signals";

/**
 * Imports a module and returns a proxy that allows to access its properties and methods in a lazy way.
 * @param importFn The function that imports the module.
 * @returns The proxy object.
 */
export const importProxy = <T extends object>(importFn: () => Promise<T>): T => {
	const importSignal = signal<T | undefined>();
	const buildImportFn =
		(path: any[]) =>
		(...params: any[]) => {
			if (!importSignal.value) importFn().then((mod) => (importSignal.value = mod));
			const result = computed(() => path.reduce((acc, key) => acc?.[key], importSignal.value));
			return result.value?.(...params);
		};
	const buildImportProxy = <T extends object>(path: string[] = []): T =>
		new Proxy<T>(buildImportFn(path) as T, { get: (_, prop: string) => buildImportProxy<T>([...path, prop]) });
	return buildImportProxy<T>();
};
