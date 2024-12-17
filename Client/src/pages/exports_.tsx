import { importProxy } from "../utils/importProxy";

// pages

export const { HomePage } = importProxy(() => import("./Home"));
export const { NotFoundPage } = importProxy(() => import("./NotFound"));

// components
