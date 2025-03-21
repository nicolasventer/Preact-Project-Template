import { actions, st } from "@/actions/actions.impl";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { ActionIcon, Button, Indicator, Paper, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { signal } from "@preact/signals";
import { GripHorizontal } from "lucide-react";
import { GrClear } from "react-icons/gr";

document.addEventListener("keydown", (ev) => {
	if (ev.key === "z" && ev.altKey) actions.console.log.wrap.toggle();
});

const isHandleHovered = signal(false);
const enableHandleHovered = () => (isHandleHovered.value = true);
const disableHandleHovered = () => (isHandleHovered.value = false);

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
					<Paper
						onMouseDown={actions.console.height.startUpdating}
						onMouseEnter={enableHandleHovered}
						onMouseLeave={disableHandleHovered}
						onTouchStart={actions.console.height.startUpdating}
						style={{
							cursor: "ns-resize",
							backgroundColor:
								isHandleHovered.value || st.console.isResizing.value ? "var(--mantine-primary-color-filled)" : undefined,
							borderRadius: 0,
							display: "flex",
							justifyContent: "center",
							pointerEvents: "auto",
							borderBottom: 0,
							userSelect: "none",
						}}
						withBorder
					>
						<ThemeIcon size="xs" variant="transparent">
							<GripHorizontal />
						</ThemeIcon>
					</Paper>
				)}
				<Paper
					withBorder
					style={{ height: resizable ? st.console.height.value : "100%", pointerEvents: "auto", overflow: "auto" }}
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
									background: isLogToSee ? "var(--mantine-primary-color-light)" : undefined,
									cursor: isLogToSee ? "pointer" : undefined,
								}}
								alignItems="baseline"
								onClick={updateLogToSeeCount}
							>
								<Text
									c={log.type === "error" ? "red" : log.type === "warn" ? "yellow" : log.type === "info" ? "blue" : "gray"}
									style={{ whiteSpace: "pre", fontFamily: "consolas" }}
								>
									{`[${log.type}]`.padEnd(7)}
								</Text>
								<Text style={{ whiteSpace: "pre", fontFamily: "consolas" }}>[{log.time}]</Text>
								<Tooltip label="Press Alt+Z to toggle wrap" hidden={log.message.length < 100}>
									<Text
										style={{
											whiteSpace: "pre",
											fontFamily: "consolas",
											textWrapMode: st.console.log.isWrapped.value ? "wrap" : "nowrap",
											overflowWrap: st.console.log.isWrapped.value ? "anywhere" : undefined,
										}}
									>
										{log.message}
									</Text>
								</Tooltip>
							</Horizontal>
						);
					})}
				</Paper>
			</>
		)}
		<Horizontal gap={12} style={{ background: "var(--mantine-color-body)" }}>
			<Indicator
				label={st.console.log.toSeeCount.value}
				disabled={st.console.log.toSeeCount.value === 0}
				color={"red"}
				position="top-end"
				size={25}
				flex={1}
			>
				<Button onClick={actions.console.display.toggle} size="compact-xs" style={{ pointerEvents: "auto" }} fullWidth>
					Console
				</Button>
			</Indicator>
			<ActionIcon size={24} style={{ margin: "-6px 0", scale: 0.8, pointerEvents: "auto" }} onClick={actions.console.log.clear}>
				<GrClear />
			</ActionIcon>
		</Horizontal>
	</Vertical>
);
