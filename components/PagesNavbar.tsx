import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Fab, IconButton, styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import React, { ComponentType, FC, ReactNode, useState } from "react";

import AppHeaderNavbar from "./AppHeaderNavbar";
import AppMenuMovil from "./AppMenuMovil";
import { Feedback } from "./Feedback";
import Head from "./Head";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  showSearch: boolean;
};

export const AppFooter: ComponentType<any> = dynamic(() => import("./AppFooter").then(m => m.default), {
  ssr: false
});

const PagesNavbar: FC<Props> = ({ children, title, description, showSearch }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const onCloseMenu = () => setShowMenu(false);
  const onShowMenu = () => setShowMenu(true);
  const onToggleShowFeedbackForm = () => setShowFeedbackForm(showFeedbackForm => !showFeedbackForm);
  const onCloseFeedback = () => setShowFeedbackForm(false);

  const onSendFeedback = () => {
    setShowMenu(false);
    setShowFeedbackForm(true);
  };

  return (
    <>
      <Head title={title} description={description} />
      <AppHeaderNavbar showMenu={showMenu} onCloseMenu={onCloseMenu} onShowMenu={onShowMenu} showSearch={showSearch} />
      {showMenu && <AppMenuMovil onSendFeedback={onSendFeedback} />}
      <Box
        component="main"
        sx={{
          position: "relative",
          mt: "var(--navbar-height)",
          minHeight: "calc(100vh - var(--navbar-height) - var(--footer-height) )"
        }}
      >
        {children}
        <FeedbackTooltip
          open={showFeedbackForm}
          placement="top-start"
          title={<Feedback onSuccessFeedback={onCloseFeedback} sx={{ padding: "40px 50px" }} />}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Fab
            aria-label="Open Feedback"
            onClick={onToggleShowFeedbackForm}
            color="primary"
            sx={{
              color: theme => theme.palette.common.white,
              float: "right",
              display: { xs: "none", md: "block" },
              position: "sticky",
              margin: "28px 30px",
              bottom: "28px",
              right: "0px"
            }}
          >
            <Tooltip title={"Question/Feedback"} placement="top">
              <QuestionMarkIcon />
            </Tooltip>
          </Fab>
        </FeedbackTooltip>

        {/* feedback mobil */}
        {showFeedbackForm && (
          <Box
            sx={{
              width: "100vw",
              height: "calc(100vh - var(--navbar-height) )",
              px: "9px",
              position: "fixed",
              bottom: "0px",
              zIndex: "10",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#6028282A"
            }}
          >
            <Box
              sx={{
                maxWidth: "500px",
                width: "100%",
                maxHeight: "600px",
                backgroundColor: theme => theme.palette.common.darkGrayBackground,
                position: "relative"
              }}
            >
              <Feedback onSuccessFeedback={onCloseFeedback} sx={{ padding: "30px 50px" }} />
              <IconButton
                aria-label="Close feedback"
                onClick={onCloseFeedback}
                sx={{ position: "absolute", top: "30px", right: "15px", color: "white" }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <AppFooter />
    </>
  );
};

const FeedbackTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.darkGrayBackground,
    color: theme.palette.text.primary,
    maxWidth: "500px",
    maxHeight: "600px",
    fontWeight: theme.typography.fontWeightRegular,
    padding: "0px",
    border: `1px solid ${theme.palette.grey[400]}`,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
  }
}));

export default PagesNavbar;
