import { afterAll, expect, test } from "bun:test";
import { api } from "../src/Common/CommonUtils";
import { app } from "../src/testIndex";

test("check server is running", async () => {
	const base = await api.status.get();
	expect(base.status).toBe(200);
});

afterAll(() => app.stop());
