import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Container, Divider, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextImage from "next/image";
import React from "react";

import logoGoogleCloud from "../public/logo-google-cloud.svg";
import logoHonor from "../public/logo-honor.svg";
import logoSchoolOfInformation from "../public/logo-school-of-information.svg";

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "var(--footer-height)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        color: theme => theme.palette.common.white,
        background: theme => theme.palette.common.darkGrayBackground
      }}
    >
      <Container
        sx={{
          maxWidth: { xs: "195px", md: "700px", lg: "1058px" },
          height: { xs: "472px", md: "110px" },
          p: "0px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Typography fontSize={"40px"} fontFamily={"EB Garamond"} textAlign={{ xs: "center", md: "left" }}>
            1Cademy
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "start" } }}>
            <IconButton
              rel="noreferrer"
              aria-label="Open Youtube channel"
              target="_blank"
              href="https://www.youtube.com/channel/UCKBqMjvnUrxOhfbH1F1VIdQ/"
              sx={{ color: theme => theme.palette.common.white }}
            >
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="mailto:oneweb@umich.edu"
              sx={{ color: theme => theme.palette.common.white }}
              aria-label="Mail us"
            >
              <EmailIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: "10px", md: "50px" }
            }}
          >
            <Typography fontSize={"16px"} component="h6" sx={{ whiteSpace: "nowrap" }}>
              Supported by{" "}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: { xs: "space-between", md: "left" },
                gap: { md: "50px" }
              }}
            >
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://www.si.umich.edu/"
                aria-label="Go to School of information"
              >
                <NextImage src={logoSchoolOfInformation} alt="School of Information" height={41} width={47} />
              </Link>
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://www.honor.education/"
                aria-label="Go to Honor Education"
              >
                <NextImage src={logoHonor} alt="Honor Education" height={41} width={41} />
              </Link>
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://cloud.google.com/edu/researchers"
                aria-label="Go to Google Cloud"
              >
                <NextImage src={logoGoogleCloud} alt="Google Cloud" height={41} width={49} />
              </Link>
            </Box>
          </Box>
          <Divider sx={{ my: "20px" }} />
          <Box
            sx={{
              width: { md: "300px", lg: "511px" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: "30px", md: "10px" }
            }}
          >
            <Link
              target="_blank"
              href="https://1cademy.us/terms"
              underline="none"
              sx={{ color: theme => theme.palette.common.white }}
            >
              Terms
            </Link>
            <Link
              target="_blank"
              href="https://1cademy.us/privacy"
              underline="none"
              sx={{ color: theme => theme.palette.common.white }}
            >
              Privacy
            </Link>
            <Link
              target="_blank"
              href="https://1cademy.us/cookie"
              underline="none"
              sx={{ color: theme => theme.palette.common.white }}
            >
              Cookie
            </Link>
            <Typography color={theme => theme.palette.grey[500]}>{`??  1Cademy ${new Date().getFullYear()}`}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
