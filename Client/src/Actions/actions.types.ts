export type ViewportSize = {
	height: number;
	width: number;
};

export type ConsoleType = "normal" | "custom" | "both";

export type LogType = "log" | "info" | "warn" | "error";

/** Log type */
export type Log = {
	/** The type of the message */
	type: LogType;
	/** The time of the message (format: HH:mm:ss.SSS) */
	time: string;
	/** The message */
	message: string;
};
