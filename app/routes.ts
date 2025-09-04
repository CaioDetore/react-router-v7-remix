import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout(
    "layout/main.tsx", [
    index("routes/home.tsx"),
    route("loaders", "routes/loaders.tsx", [
      route(":id", "routes/cervejaria.tsx"),
    ]),
  ]
  ),
  route("login", "routes/login.tsx")
] satisfies RouteConfig;
