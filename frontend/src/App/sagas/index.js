import { watchWsOpen } from "./wsOpen";
import { watchGetStatus } from "./getStatus";

export default [watchWsOpen(), watchGetStatus()];
