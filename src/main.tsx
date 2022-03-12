import React from "react";
import { connect, RenderConfigScreenCtx } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import { render } from "./utils/render";
import { Page } from "./entrypoints/Page";
import { ConfigScreen } from "./entrypoints/ConfigScreen";
import { TabParameters } from "./types";

connect({
  mainNavigationTabs(ctx) {
    const parameters = ctx.plugin.attributes.parameters as TabParameters;
    if (!parameters.tabs) return [];
    return parameters.tabs.map((tab) => ({
      label: tab.title,
      icon: tab.icon,
      pointsTo: {
        pageId: "iframe",
      },
    }));
  },
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    render(<ConfigScreen ctx={ctx} />, ctx);
  },
  renderPage(pageId, ctx) {
    return render(<Page ctx={ctx} />, ctx);
  },
});
