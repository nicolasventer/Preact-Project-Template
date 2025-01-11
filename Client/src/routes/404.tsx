import { wait } from "@/Shared/SharedUtils";
import { tr } from "@/gs";
import { navigateToRouteFn } from "@/routerInstance.gen";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { useMount } from "@/utils/useMount";
import { useSignal } from "@preact/signals";

/**
 * Not found page.
 *
 * Redirects to the home page after 3 seconds. The redirection can be cancelled.
 * @returns the not found page.
 */
export const NotFoundPage = () => {
	const cancelled = useSignal(false);
	const cancel = () => (cancelled.value = true);

	useMount(() => void wait(3000).then(() => !cancelled.value && navigateToRouteFn("/")()));

	return (
		<Horizontal justifyContent="center" height="100%">
			<Vertical justifyContent="center">
				<h1>{tr.v["404 Not Found"]}</h1>
				{!cancelled.value && tr.v["Redirecting to the home page..."]}
				{cancelled.value && tr.v["Redirect cancelled."]}
				<Vertical marginTop={20} alignItems="center">
					<div>
						{cancelled.value ? (
							<button onClick={navigateToRouteFn("/")}>{tr.v["Go to Home page"]}</button>
						) : (
							<button onClick={cancel}>{tr.v.Cancel}</button>
						)}
					</div>
				</Vertical>
			</Vertical>
		</Horizontal>
	);
};
