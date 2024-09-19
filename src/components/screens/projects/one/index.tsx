"use client";

import Buttons from "@/components/buttons";
import { ThemeProps } from "@/types/theme";
import { Box, Grid, Menu, MenuItem, styled } from "@mui/material";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getMyProjects } from "../../../../data/get_my_projects";
import { selectOneProject } from "../../../../data/get_one_project";
import {
  ConfirmContextProps,
  resetConfirmData,
  resetConfirmProps,
  setConfirmProps,
  setConfirmState,
  setEditingProject,
  setEditingProjectState,
  setOpenModal,
} from "../../../../data/modal_checker";
import instance from "../../../../utils/axios";
import SimpleTypography from "../../../typography";
import { ProjectInfoTable } from "../../../views/projects/info_table";
import { ProjectModelsList } from "../../../views/projects/models_list";

const ActionsDropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `
  .MuiList-root{
    overflow-x: auto;
    border: 1px solid #E0E0E0;
    padding: 8px;
  }

  .MuiPaper-root{
    border-radius:0 !important;
    box-shadow: 0px 7px 12px 0px #00000040;
  }
  `
);

export default function OneProject() {
  const dispatch = useDispatch<any>();
  const project = useSelector(selectOneProject);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const pdfContent = useRef(null);

  const downloadPdf = async () => {
    if (pdfContent) {
      const options = {
        margin: 0.5,
        filename: project.name ? `${project.name}.pdf` : "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(options).from(pdfContent.current).save();
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openEditProject(project) {
    dispatch(setEditingProject(project));
    dispatch(setEditingProjectState(true));
    dispatch(setOpenModal(true));
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить проект «${project?.name}»?`,
      actions: {
        on_click: {
          args: [project?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }));
            instance
              .delete(`projects/${id}/?cascade=${!checked}`)
              .then((res) => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message);
                  dispatch(setConfirmState(false));
                  dispatch(setOpenModal(false));
                  dispatch(resetConfirmProps());
                  dispatch(resetConfirmData());
                  dispatch(resetConfirmData());
                  dispatch(getMyProjects());
                } else {
                  toast.success(res?.data?.message);
                }
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
              })
              .finally(() => {
                dispatch(setConfirmProps({ is_loading: false }));
                handleClose();
              });
          },
        },
      },
    };
    dispatch(resetConfirmProps());
    dispatch(setConfirmProps(modalContent));
    dispatch(setConfirmState(true));
    dispatch(setOpenModal(true));
  }

  const Content = (
    <Box
      ref={pdfContent}
      sx={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto !important",
        padding: { xs: "0 18px", lg: 0 },
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          margin: "32px 0 40px 0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ActionsDropDown
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => openEditProject(project)}
            sx={{ padding: "6px 12px" }}
          >
            <Image
              src="/icons/edit-pen.svg"
              alt="icon"
              width={17}
              height={17}
            />
            <SimpleTypography
              className="drow-down__text"
              text="Редактировать"
            />
          </MenuItem>

          <MenuItem onClick={handleClickDelete} sx={{ padding: "6px 12px" }}>
            <Image src="/icons/trash.svg" alt="icon" width={17} height={17} />
            <SimpleTypography className="drow-down__text" text="Удалить" />
          </MenuItem>
        </ActionsDropDown>

        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{}}>
            <SimpleTypography
              text={project?.name}
              sx={{
                fontSize: "22px",
                fontWeight: 400,
                lineHeight: "26px",
                letterSpacing: "-0.02em",
                textAlign: "start",
                color: "#141414",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid itemType="" xs={12}>
          <ProjectModelsList project={project} />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #E0E0E0",
              padding: "24px",
            }}
          >
            <Box sx={{ width: "100%", mb: "18px" }}>
              <SimpleTypography
                text="Информация"
                sx={{
                  fontWeight: 500,
                  fontSize: "22px",
                  lineHeight: "26px",
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              />
            </Box>

            <Box sx={{ width: "100%", mb: "18px" }}>
              <ProjectInfoTable project={project} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{ background: "#fafafa", position: "relative" }}
      className="products"
    >
      <Box
        id="hidden-pdf-preview"
        sx={{
          position: "absolute",
          top: "-2000%",
          right: 0,
          left: 0,
          width: "2480 px",
          minHeight: "3508px",
        }}
      />
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto !important",
          padding: { xs: "0 18px", lg: 0 },
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            margin: "32px 0 40px 0",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ActionsDropDown
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => openEditProject(project)}
              sx={{ padding: "6px 12px" }}
            >
              <Image
                src="/icons/edit-pen.svg"
                alt="icon"
                width={17}
                height={17}
              />
              <SimpleTypography
                className="drow-down__text"
                text="Редактировать"
              />
            </MenuItem>

            <MenuItem onClick={handleClickDelete} sx={{ padding: "6px 12px" }}>
              <Image src="/icons/trash.svg" alt="icon" width={17} height={17} />
              <SimpleTypography className="drow-down__text" text="Удалить" />
            </MenuItem>
          </ActionsDropDown>

          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{}}>
              <SimpleTypography
                text={project?.name}
                sx={{
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: "26px",
                  letterSpacing: "-0.02em",
                  textAlign: "start",
                  color: "#141414",
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box margin={"0 0 0 16px"}>
              <Buttons
                className="bookmark__btn"
                onClick={handleClick}
                sx={{
                  p: "8px !important",
                  width: "40px",
                  height: "40px",
                }}
              >
                <Image
                  style={{ margin: "0" }}
                  alt="icon"
                  width={24}
                  height={24}
                  src={"/icons/horizontal-dots.svg"}
                />
              </Buttons>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            margin: "32px 0 24px 0",
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: { xs: 2, md: 0 },
          }}
        >
          <Grid item md={8.3} xs={12}>
            <ProjectModelsList project={project} />
          </Grid>
          <Grid item md={3.5} xs={12}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #E0E0E0",
                padding: "24px",
              }}
            >
              <Box sx={{ width: "100%", mb: "18px" }}>
                <SimpleTypography
                  text="Информация"
                  sx={{
                    fontWeight: 500,
                    fontSize: "22px",
                    lineHeight: "26px",
                    letterSpacing: "-0.02em",
                    textAlign: "left",
                  }}
                />
              </Box>

              <Box sx={{ width: "100%", mb: "18px" }}>
                <ProjectInfoTable project={project} />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Buttons
                  id="download-pdf"
                  loadingColor="#fff"
                  onClick={downloadPdf}
                  sx={{ width: "100%" }}
                  name="Скачать PDF"
                  childrenFirst={true}
                  className="login__btn"
                >
                  <Image
                    alt="icon"
                    src="/icons/get-pdf.svg"
                    width={22}
                    height={22}
                  />
                </Buttons>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{display: "none"}}>{Content}</Box>
    </Box>
  );
}
