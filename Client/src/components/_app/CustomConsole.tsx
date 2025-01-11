import { actions, st } from "@/actions/actions.impl";
import type { Log } from "@/actions/actions.types";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { signal } from "@preact/signals";

document.addEventListener("keydown", (ev) => {
	if (ev.key === "z" && ev.altKey) actions.console.log.wrap.toggle();
});

const isHandleHovered = signal(false);
const enableHandleHovered = () => (isHandleHovered.value = true);
const disableHandleHovered = () => (isHandleHovered.value = false);

let tooltipDisplayed = false;
const logTooltip = (log: Log) => {
	if (tooltipDisplayed) return null;
	if (log.message.length < 100) return null;
	tooltipDisplayed = true;
	console.info("Press Alt+Z to toggle wrap");
	return null;
};

/**
 * The console that displays the execution log and errors, it can be resized and hidden.\
 * Be sure to call {@link actions.console.type.update | actions.console.type.update("custom")} or {@link actions.console.type.update | actions.console.type.update("both")} to use this console.\
 * Put the component in a parent with `relative position` to limit the size.
 * @example
 * ```tsx
 * <Box height={500} width={650} style={{ position: "relative", border: "2px solid gray" }}>
 * 	<CustomConsole resizable={false} />
 * </Box>
 * ```
 * @param props The props of the console.
 * @param {boolean} [props.resizable=true] If the console is resizable, default is true. If not resizable, the console will take the full height.
 * @returns The console that displays the execution log and errors.
 */
export const CustomConsole = ({ resizable = true }: { resizable?: boolean }) => (
	<Vertical
		positionAbsolute
		heightFull
		widthFull
		justifyContent="flex-end"
		style={{ top: 0, zIndex: 200, pointerEvents: "none", margin: "-2px 0" }}
	>
		{st.console.isDisplayed.value && (
			<>
				{resizable && (
					<div
						onMouseDown={actions.console.height.startUpdating}
						onMouseEnter={enableHandleHovered}
						onMouseLeave={disableHandleHovered}
						onTouchStart={actions.console.height.startUpdating}
						style={{
							cursor: "ns-resize",
							backgroundColor: isHandleHovered.value || st.console.isResizing.value ? "grey" : undefined,
							borderRadius: 0,
							display: "flex",
							justifyContent: "center",
							pointerEvents: "auto",
							borderBottom: 0,
							userSelect: "none",
							border: "1px solid black",
						}}
					>
						---
					</div>
				)}
				<div
					style={{
						height: resizable ? st.console.height.value : "100%",
						pointerEvents: "auto",
						overflow: "auto",
						border: "1px solid black",
					}}
				>
					{st.console.log.list.value.map((log, index) => {
						const isLogToSee = st.console.log.list.value.length - index <= st.console.log.toSeeCount.value;
						const updateLogToSeeCount = isLogToSee ? actions.console.log.markAsReadFn(index) : () => {};
						return (
							<Horizontal
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								gap={8}
								style={{
									padding: "4px 8px",
									background: isLogToSee ? "lightblue" : undefined,
									cursor: isLogToSee ? "pointer" : undefined,
								}}
								alignItems="baseline"
								onClick={updateLogToSeeCount}
							>
								<div
									style={{
										whiteSpace: "pre",
										fontFamily: "consolas",
										color: log.type === "error" ? "red" : log.type === "warn" ? "yellow" : log.type === "info" ? "blue" : "gray",
									}}
								>
									{`[${log.type}]`.padEnd(7)}
								</div>
								<div style={{ whiteSpace: "pre", fontFamily: "consolas" }}>[{log.time}]</div>
								<div
									style={{
										whiteSpace: "pre",
										fontFamily: "consolas",
										textWrap: st.console.log.isWrapped.value ? "wrap" : "nowrap",
										overflowWrap: st.console.log.isWrapped.value ? "anywhere" : undefined,
									}}
								>
									{logTooltip(log)}
									{log.message}
								</div>
							</Horizontal>
						);
					})}
				</div>
			</>
		)}
		<Horizontal gap={12} style={{ background: "white" }}>
			<button onClick={actions.console.display.toggle} style={{ pointerEvents: "auto", flex: 1 }}>
				Console
			</button>
			{st.console.log.toSeeCount.value !== 0 && <div style={{ color: "red" }}>{st.console.log.toSeeCount.value}</div>}
			<button onClick={actions.console.log.clear} style={{ pointerEvents: "auto" }}>
				Clear
			</button>
		</Horizontal>
	</Vertical>
);
