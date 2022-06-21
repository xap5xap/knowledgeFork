import LinkIcon from "@mui/icons-material/Link";
import { IconButton, Link, ListItem, ListItemButton, ListItemText, Theme, Tooltip, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import LinkNext from "next/link";
import React, { FC } from "react";

import { isValidHttpUrl } from "../lib/utils";
import { NodeType } from "../src/knowledgeTypes";
import HtmlTooltip from "./HtmlTooltip";
import MarkdownRender from "./Markdown/MarkdownRender";

type Props = {
  title: string;
  linkSrc: string;
  nodeType: NodeType;
  nodeImageUrl?: string;
  nodeContent?: string;
  showListItemIcon?: boolean;
  label: string;
  sx?: SxProps<Theme>;
  secondaryActionSx?: SxProps<Theme>;
};

export const LinkedReference: FC<Props> = ({ nodeImageUrl, nodeContent, title, linkSrc, label, sx }) => {
  return (
    <HtmlTooltip
      title={
        <Box>
          <Typography variant="body2" component="div">
            <MarkdownRender text={nodeContent || ""} />
          </Typography>
          {nodeImageUrl && (
            <Box>
              <img src={nodeImageUrl} width="100%" height="100%" />
            </Box>
          )}
        </Box>
      }
      placement="left"
    >
      <ListItem
        disablePadding
        sx={{ display: "flex", px: 0 }}
        secondaryAction={
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {isValidHttpUrl(label) && (
              <Tooltip title="Open the reference specified section in new tab">
                <IconButton
                  target="_blank"
                  LinkComponent={Link}
                  href={label}
                  sx={{
                    ml: 2,
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    color: theme => theme.palette.common.darkGrayBackground
                  }}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
      >
        <LinkNext passHref href={linkSrc}>
          <ListItemButton component="a" href={linkSrc} sx={{ ...sx }}>
            <ListItemText primary={<MarkdownRender text={title || ""} />} disableTypography={true} />
          </ListItemButton>
        </LinkNext>
      </ListItem>
    </HtmlTooltip>
  );
};
