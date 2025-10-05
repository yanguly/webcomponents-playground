import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("web-components", "routes/web-components.tsx"),
  route("react-custom-elements", "routes/react-custom-elements.tsx"),
] satisfies RouteConfig;
