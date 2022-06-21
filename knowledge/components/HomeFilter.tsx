import { Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import TagsAutocomplete from "../components/TagsAutocomplete";
import { FilterValue } from "../src/knowledgeTypes";
import ContributorsAutocomplete from "./ContributorsAutocomplete";
import InstitutionsAutocomplete from "./InstitutionsAutocomplete";
import NodeTypesAutocomplete from "./NodeTypesAutocomplete";
import { ReferencesAutocomplete } from "./ReferencesAutocomplete";

export type HomeFilterRef = {
  scroll: () => void;
};

type HomeFilterProps = {
  sx?: SxProps<Theme>;
  onTagsChange: (newValues: string[]) => void;
  onInstitutionsChange: (newValues: FilterValue[]) => void;
  onContributorsChange: (newValues: FilterValue[]) => void;
  onNodeTypesChange: (newValues: string[]) => void;
  onReferencesChange: (title: string, label: string) => void;
};

const HomeFilter = forwardRef<HomeFilterRef, HomeFilterProps>(
  ({ sx, onTagsChange, onInstitutionsChange, onContributorsChange, onNodeTypesChange, onReferencesChange }, ref) => {
    const toScrollRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      scroll: () => {
        const clientPosition = toScrollRef.current?.getBoundingClientRect();
        const yPosition = clientPosition ? clientPosition.y + clientPosition.height - 40 : 500;
        setTimeout(() => window.scrollBy({ top: yPosition, behavior: "smooth" }), 150);
      }
    }));

    const handleTagsChange = (values: string[]) => {
      onTagsChange(values);
    };

    const handleInstitutionsChange = (values: FilterValue[]) => {
      onInstitutionsChange(values);
    };

    const handleContributorsChange = (values: FilterValue[]) => {
      onContributorsChange(values);
    };

    const handleNodeTypesChange = (values: string[]) => {
      onNodeTypesChange(values);
    };

    const handleReferencesChange = (title: string, label: string) => {
      onReferencesChange(title, label);
    };

    return (
      <Grid
        ref={toScrollRef}
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
        alignItems="flex-end"
        justifyContent="center"
        sx={{ position: "relative", ...sx }}
      >
        <Grid item xs={1}>
          <TagsAutocomplete onTagsChange={handleTagsChange} />
        </Grid>
        <Grid item xs={1}>
          <NodeTypesAutocomplete onNodesTypeChange={handleNodeTypesChange} />
        </Grid>
        <Grid item xs={1}>
          <ContributorsAutocomplete onContributorsChange={handleContributorsChange} />
        </Grid>
        <Grid item xs={1}>
          <InstitutionsAutocomplete onInstitutionsChange={handleInstitutionsChange} />
        </Grid>
        <Grid item xs={1} sm={2} md={4}>
          <ReferencesAutocomplete onReferencesChange={handleReferencesChange} />
        </Grid>
      </Grid>
    );
  }
);

HomeFilter.displayName = "HomeFilter";

export default HomeFilter;
