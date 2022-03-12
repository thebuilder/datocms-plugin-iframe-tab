import React, { useMemo } from "react";
import { useCallback, useState } from "react";
import { Form, TextField, SelectField, Button } from "datocms-react-ui";
import { RenderConfigScreenCtx } from "datocms-plugin-sdk";
import { TabParameters } from "../types";
import { fontAwesomeIcons } from "../utils/icon-names";

type PropTypes = {
  ctx: RenderConfigScreenCtx;
};

export function ConfigScreen({ ctx }: PropTypes) {
  const parameters = ctx.plugin.attributes.parameters as TabParameters;
  if (!parameters.tabs) {
    parameters.tabs = [{ title: "", icon: "", url: "" }];
  }
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<TabParameters>(parameters);

  const updateField = useCallback(
    (field: string, value: unknown) => {
      setFormValues((old) => {
        const current = old.tabs[0];
        return { tabs: [{ ...current, [field]: value }] };
      });
    },
    [setFormValues, ctx]
  );

  const options = useMemo(() => {
    return fontAwesomeIcons.map((val) => ({ label: val, value: val }));
  }, [fontAwesomeIcons]);

  const changed = JSON.stringify(parameters) !== JSON.stringify(formValues);
  const tabValue = formValues.tabs[0];

  return (
    <Form>
      <TextField
        id="field_title"
        name="title"
        label="Title"
        hint="Label to show in tab bar"
        required
        value={tabValue.title}
        onChange={(value) => {
          updateField("title", value);
        }}
      />
      <SelectField
        id="field_icon"
        name="icon"
        label="Icon"
        hint="A valid Font Awesome icon name. See https://fontawesome.com/v5/cheatsheet/free"
        placeholder="Select an icon"
        required
        selectInputProps={{ isMulti: false, options }}
        value={options.find((option) => {
          return option.value === tabValue.icon;
        })}
        onChange={(option) => {
          updateField("icon", option?.value);
        }}
      />
      <TextField
        id="field_url"
        name="url"
        label="URL"
        hint="The URL to open inside the tab"
        required
        value={tabValue.url}
        onChange={(value) => {
          updateField("url", value);
        }}
      />
      <Button
        buttonType="primary"
        type="submit"
        fullWidth
        buttonSize="l"
        disabled={!changed}
        onClick={async () => {
          if (submitting) return;
          setSubmitting(true);
          await ctx.updatePluginParameters(formValues);
          setSubmitting(false);
        }}
      >
        Save changes
      </Button>
    </Form>
  );
}
