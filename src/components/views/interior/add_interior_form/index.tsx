"use client"
import Buttons from "@/components/buttons";
import FileInput, { FileValidations } from "@/components/inputs/file_input";
import SimpleInp from "@/components/inputs/simple_input";
import SimpleSelect from "@/components/inputs/simple_select";
import SimpleTypography from "@/components/typography";
import { getAllStyles, selectAllStyles } from "@/data/get_all_styles";
import instance from "@/utils/axios";
import { CircularProgress, Grid, MenuItem } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import axios from "axios";
import { Formik } from "formik";
import Cookies from 'js-cookie'
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { getInteriorCategories, selectInteriorCategories } from '../../../../data/categories';
import { useRouter } from 'next/navigation';
import { selectOneInterior } from "../../../../data/get_one_interior";
import { IMAGES_BASE_URL } from "../../../../utils/env_vars";
import SimpleTextarea from "../../../inputs/textarea";

const supportedFileTypes = 'image/png, image/jpg, image/jpeg, image/webp'
const imagesCountLimit = 9;
const maxCoverFileSize = 5;
const maxImagesFileSize = 10;
const minImages = 1000
const minCover = 300
const maxCover = 800

const coverValidations: FileValidations = {
  allowedTypes: supportedFileTypes.split(', '),
  maxSize: maxCoverFileSize,
  // minWidth: minCover,
  // minHeight: minCover,
  // maxWidth: maxCover,
  // maxHeight: maxCover,
}
const imagesValidations: FileValidations = {
  allowedTypes: supportedFileTypes.split(', '),
  maxSize: maxImagesFileSize,
  minWidth: minImages,
  minHeight: minImages,
}


const formControlSx: SxProps = {
  width: '90%',

  ':not(:last-child)': {
    marginBottom: '24px'
  }
}

const labelStyle: CSSProperties = {
  position: 'relative',
  fontSize: '11px',
  lineHeight: '14px',
  letterSpacing: '0.02em',
  color: '#424242',
  margin: '0 0 6px 0',
}


export function AddInteriorForm({ editing, interior }: { editing?: boolean, interior?: any }) {
  // const dispatch = useDispatch<any>()
  // const stylesData = useSelector(selectAllStyles)
  const categoriesData = useSelector(selectInteriorCategories);
  const router = useRouter()

  const descriptionCharLimit = 1000;

  const initials = {
    name: !!editing && interior?.name ? interior?.name : '',
    description: !!editing && interior?.description ? interior?.description : '',
    style_id: !!editing && interior?.style_id ? interior?.style_id : '',
    category_id: !!!!editing && interior?.category_id ? interior?.category_id : '',
    cover: '',
    images: [],
    removed_images: [],
    submit: null
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        padding: '28px'
      }}
    >
      <Box sx={{ marginBottom: '40px' }}>
        <SimpleTypography
          text={!!editing ? "Редактировать работу" : "Добавить работу"}
          sx={{
            fontSize: '30px',
            fontWeight: '500',
            lineHeight: '36px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
          }}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        {!!interior ? (
          <Formik
            enableReinitialize
            initialValues={initials}

            validationSchema={
              Yup.object().shape(
                !!editing ?
                  {
                    name: Yup.string().max(255, 'Название должно содержать не более 200 символов').optional(),
                    description: Yup.string().max(descriptionCharLimit, `Описание должно содержать не более ${descriptionCharLimit} символов`).optional(),
                    style_id: Yup.number().optional(),
                    category_id: Yup.number().optional(),
                    cover: Yup.mixed().optional(),
                    images: Yup.array().of(Yup.mixed()).optional()
                  }
                  : {
                    name: Yup.string().max(255, 'Название должно содержать не более 200 символов').required('Название не указано'),
                    description: Yup.string().max(descriptionCharLimit, `Описание должно содержать не более ${descriptionCharLimit} символов`).required('Описание не указано'),
                    style_id: Yup.number().optional(),
                    category_id: Yup.number().required('Категория не указано'),

                    cover: Yup.mixed().required('Загрузите изображение обложки'),
                    images: Yup.array().of(Yup.mixed()).required('Загрузите хотя бы одно изображение')
                  }
              )
            }
            onSubmit={async (
              _values, { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
              try {

                const formData = new FormData()

                if (!!editing) {
                  if (_values.name) formData.append('name', _values.name)
                  if (_values.description) formData.append('description', _values.description)
                  if (_values.style_id) formData.append('style_id', _values.style_id)
                  if (_values.category_id) formData.append('category_id', _values.category_id)
                  if (_values.cover) formData.append('cover', _values.cover)
                  if (_values.images && _values.images?.length) {
                    _values.images.forEach(i => formData.append('images', i));
                  }
                  if (_values.removed_images && _values.removed_images?.length) {
                    if (_values.removed_images?.length > 1)
                      _values.removed_images.forEach(i => formData.append('removed_images', i));
                    else if (_values.removed_images?.length != 0)
                      formData.append('removed_images', JSON.stringify(_values.removed_images));
                  }
                } else {
                  formData.append('name', _values.name)
                  formData.append('description', _values.description)
                  if (_values.style_id) formData.append('style_id', _values.style_id)
                  formData.append('category_id', _values.category_id)
                  formData.append('cover', _values.cover)
                  _values.images.forEach(i => formData.append('images', i))
                }

                const res = !!editing
                  ? await instance.put(
                    `/interiors/${interior?.id}`,
                    formData
                  )
                  : await instance.post(
                    `/interiors`,
                    formData
                  );

                toast.success(res?.data?.message);
                setStatus({ success: true });
                setSubmitting(false);
                resetForm()

                router.push(`/interiors/${!!editing ? interior?.slug : res?.data?.data?.interior?.slug}`)

              } catch (err: any) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                toast.error(err?.response?.data?.message);
              }
            }}
          >
            {
              ({
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                isSubmitting,
                touched,
                values,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    width: '100%'
                  }}
                >
                  <Grid container
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                  >

                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        borderRight: '1px solid #E0E0E0'
                      }}
                    >
                      <Box
                        sx={{ ...formControlSx }}
                      >
                        <SimpleInp
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                          name="name"
                          type="text"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          label="Название"
                          placeholderText="Введите название"
                        />
                      </Box>

                      <Box
                        sx={{ ...formControlSx }}
                      >
                        <SimpleTextarea
                          characterLimit={descriptionCharLimit}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                          name="description"
                          type="text"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          label="Описание"
                          placeholderText="Введите текст..."
                        />
                      </Box>

                      <Box
                        sx={{ ...formControlSx }}
                      >
                        {/* <label data-shrink='true' style={labelStyle}> Категория </label> */}
                        <SimpleSelect
                          error={Boolean(touched.category_id && errors.category_id)}
                          helperText={touched.category_id && errors.category_id}
                          name="category_id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Категория"
                          placeholderText="Выберите категория"
                          value={values.category_id || "Выберите категория"}
                        >
                          {
                            categoriesData?.map(
                              (c, i) => (
                                <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                              )
                            )
                          }
                        </SimpleSelect>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {/* <Box sx={{ ...formControlSx }}>
                      <FileInput
                        labelElement={<label data-shrink='true' style={labelStyle}> Обложка </label>}
                        error={Boolean(touched.cover && errors.cover)}
                        helperText={touched.cover && errors.cover}
                        validations={coverValidations}
                        name="cover"
                        onBlur={handleBlur}
                        placeholderText="Перетащите или щелкните файл для загрузки"
                        accept={supportedFileTypes}
                        onChange={(files) => {
                          setFieldValue('cover', files[0])
                        }}
                        initialPreviews={
                          (!!editing && !!interior?.images) ?
                            interior?.images?.filter(i => i?.is_main == true).map(i => `${IMAGES_BASE_URL}/${i?.image_src}`) : []
                        }
                      />
                    </Box> */}

                      <Box sx={{ ...formControlSx }}>
                        <FileInput
                          labelElement={<label data-shrink='true' style={labelStyle}> Изображений </label>}
                          error={Boolean(touched.images && errors.images)}
                          helperText={touched.images && errors.images}
                          validations={imagesValidations}
                          name="images"
                          onBlur={handleBlur}
                          placeholderText="Перетащите или щелкните файл для загрузки"
                          accept={supportedFileTypes}
                          multiple
                          limit={imagesCountLimit}
                          onChange={(files, removed) => {
                            setFieldValue('cover', files[0])
                            setFieldValue('images', files)
                            if (!!editing && interior?.images && removed && removed?.length) {
                              const removed_images: any[] = [];
                              removed.forEach(r => {
                                const img = interior?.images?.find(i => i?.image_src == r.split(`${IMAGES_BASE_URL}/`)[1])
                                removed_images.push(img?.image_id)
                              })
                              setFieldValue('removed_images', removed_images)
                            }
                          }}
                          initialPreviews={
                            !!interior ?
                              interior?.images?.map(i => `${IMAGES_BASE_URL}/${i?.image_src}`)
                              : []
                          }
                        />
                        <SimpleTypography
                          text="Первое изображение также будет загружено в качестве основной обложки."
                          sx={{
                            mt: '8px',
                            fontWeight: '400',
                            fontSize: '14px'
                          }}
                        />
                      </Box>

                    </Grid>

                  </Grid>
                  <Box sx={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    {
                      !!editing ?
                        <Buttons
                          name={"Отмена"}
                          type='button'
                          className="bookmark__btn"
                          sx={{ mr: '8px', padding: '11px 40px !important' }}
                        />
                        : null
                    }
                    <Buttons
                      name={!!editing ? "Сохранить" : "Загрузить"}
                      childrenFirst={true}
                      type='submit'
                      startIcon={isSubmitting}
                      disabled={Boolean(errors.submit) || isSubmitting}
                      loadingColor='#fff'
                      className="upload__btn"
                      sx={{
                        paddingX: '88px !important'
                      }}
                    >
                      {!editing ? <Image
                        alt="upload icon"
                        src='/icons/upload-icon-white.svg'
                        width={20}
                        height={20}
                      /> : null}
                    </Buttons>
                  </Box>
                </form>
              )
            }
          </Formik>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box >
  )
}