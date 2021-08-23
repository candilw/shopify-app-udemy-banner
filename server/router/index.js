import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag.js";

const router = combineRouters(scriptTagRouter);
export default router;
