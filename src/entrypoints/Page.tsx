import React from "react";
import { RenderPagePropertiesAndMethods } from "datocms-plugin-sdk";
import styles from "./Page.module.css";
import { TabParameters } from "../types";

type Props = {
  ctx: RenderPagePropertiesAndMethods;
};

export function Page({ ctx }: Props) {
  const parameters = ctx.plugin.attributes.parameters as TabParameters;
  if (!parameters.tabs) return null

  return (
    <iframe
      loading="lazy"
      className={styles.page}
      width="100%"
      height="100%"
      src={parameters.tabs[0].url}
    />
  );
}
