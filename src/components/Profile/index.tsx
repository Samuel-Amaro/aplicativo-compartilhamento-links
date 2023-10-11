"use client";

import { isValidDimensionsImage, validFileType } from "@/utils/utils";
import { useEffect, useState } from "react";
import Upload from "../Icons/Upload";
import Image from "next/image";
import { useProfileContext } from "@/context/ProfileContext";
import { ProfileDetails } from "@/types/datas";
import Save from "../Icons/Save";
import Notification from "../Notification";
import styles from "./styles.module.css";

type ValidationFields = {
  validationFirstName: {
    message?: string;
    isValid: boolean;
  };
  validationLastName: {
    message?: string;
    isValid: boolean;
  };
};

export default function Profile() {
  const profileContext = useProfileContext();
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>(
    profileContext.profileDetails,
  );
  const [file, setFile] = useState<File | null>(null);
  const [validationFields, setValidationFields] = useState<ValidationFields>({
    validationFirstName: { message: undefined, isValid: false },
    validationLastName: { message: undefined, isValid: false },
  });
  const [showNotification, setShowNotification] = useState(false);

  function handleChangeField(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "firstName" | "lastName" | "email",
  ) {
    switch (field) {
      case "firstName":
        setProfileDetails({
          ...profileDetails,
          firstName: e.target.value,
        });
        break;
      case "lastName":
        setProfileDetails({
          ...profileDetails,
          lastName: e.target.value,
        });
        break;
      case "email":
        setProfileDetails({
          ...profileDetails,
          email: e.target.value,
        });
        break;
      default:
        break;
    }
  }

  async function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.length === 0 || files === null) {
      alert("atualmente não possui arquivos selecionados para upload");
    } else {
      const fileUpload = files[0];
      if (!validFileType(fileUpload)) {
        alert(
          `Nome do arquivo ${fileUpload.name}: Não é um tipo de arquivo válido. Atualize sua seleção.`,
        );
        return;
      } else {
        const isValidImage = await isValidDimensionsImage(fileUpload);
        if (!isValidImage) {
          alert("A imagem deve ter as dimensões de 1024x1024 pixels ou menos.");
          return;
        }
        setFile(fileUpload);
      }
    }
  }

  function formIsValid() {
    if (
      validationFields.validationFirstName.isValid &&
      validationFields.validationLastName.isValid
    )
      return true;
    return false;
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formIsVal = formIsValid();
    if (formIsVal) {
      profileContext.addProfile(profileDetails);
      setShowNotification(true);
    }
  }

  useEffect(() => {
    let reader: FileReader,
      isCancel = false;
    if (file) {
      reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string" && !isCancel) {
          setProfileDetails({
            ...profileDetails,
            dataUrlPicture: e.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (reader && reader.readyState === 1) {
        reader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    function validateFields() {
      const newValidationFiels: ValidationFields = {
        validationFirstName: { message: undefined, isValid: false },
        validationLastName: { message: undefined, isValid: false },
      };
      if (profileDetails.firstName.trim()) {
        newValidationFiels.validationFirstName.isValid = true;
      } else {
        newValidationFiels.validationFirstName.message = "Não pode estar vazio";
        newValidationFiels.validationFirstName.isValid = false;
      }
      if (profileDetails.lastName.trim()) {
        newValidationFiels.validationLastName.isValid = true;
      } else {
        newValidationFiels.validationLastName.message = "Não pode estar vazio";
        newValidationFiels.validationLastName.isValid = false;
      }
      setValidationFields(newValidationFiels);
    }
    validateFields();
  }, [profileDetails]);

  return (
    <>
      <form onSubmit={handleSubmitForm} className={styles.form}>
        <fieldset className={`${styles.formFieldset} ${styles.formFieldsetContainer}`}>
          <span
            id="label-picture"
            className={`bodyM ${styles.formLabel} ${styles.formFieldsetPictureLabel}`}
          >
            Foto do perfil
          </span>
          <label
            htmlFor="picture"
            aria-labelledby="label-picture"
            className={styles.formLabelInputFile}
          >
            <input
              type="file"
              id="picture"
              title="A imagem deve estar abaixo de 1024x1024px. Utilize o formato PNG ou JPG."
              accept=".jpg, .jpeg, .png"
              onChange={handleChangeFile}
              className={styles.formInputFile}
            />
            {profileDetails.dataUrlPicture ? (
              <div className={styles.formPreviewContainer}>
                <Image
                  src={profileDetails.dataUrlPicture}
                  alt="Imagem perfil"
                  width={193}
                  height={193}
                  className={styles.formPreviewProfile}
                />
                <div className={styles.hoverPreview}>
                  <Upload className={styles.iconUpload} color="white" />
                  <span className="headingS">Alterar imagem</span>
                </div>
              </div>
            ) : (
              <div className={styles.formInputFileContent}>
                <Upload className={styles.iconUpload} color="purple" />
                <span className={`headingS ${styles.formInputFileContentText}`}>
                  + Carregar imagem
                </span>
              </div>
            )}
          </label>
          <span className={`bodyS ${styles.messageWarning}`}>
            A imagem deve estar abaixo de 1024x1024px. Utilize o formato PNG ou
            JPG.
          </span>
        </fieldset>
        <fieldset className={styles.formFieldset}>
          <div className={styles.formGroup}>
            <label
              htmlFor="first-name"
              className={`bodyS ${styles.formGroupLabel}`}
            >
              Primeiro nome*
            </label>
            <div className={styles.formGroupContainerError}>
              <input
                type="text"
                id="first-name"
                title="Primeiro nome"
                placeholder="ex João"
                required
                onChange={(e) => handleChangeField(e, "firstName")}
                value={profileDetails.firstName}
                className={
                  validationFields.validationFirstName.isValid
                    ? `bodyM ${styles.formGroupInput}`
                    : `bodyM ${styles.formGroupInput} ${styles.errorActive}`
                }
              />
              {validationFields.validationFirstName.message &&
                !validationFields.validationFirstName.isValid && (
                  <span
                    role="alert"
                    className={`bodyS ${styles.formGroupContainerValidation}`}
                  >
                    {validationFields.validationFirstName.message}
                  </span>
                )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="last-name"
              className={`bodyS ${styles.formGroupLabel}`}
            >
              Sobrenome*
            </label>
            <div className={styles.formGroupContainerError}>
              <input
                type="text"
                id="last-name"
                title="Sobrenome"
                placeholder="ex Almeida Ramos"
                required
                onChange={(e) => handleChangeField(e, "lastName")}
                value={profileDetails.lastName}
                className={
                  validationFields.validationLastName.isValid
                    ? `bodyM ${styles.formGroupInput}`
                    : `bodyM ${styles.formGroupInput} ${styles.errorActive}`
                }
              />
              {validationFields.validationLastName.message &&
                !validationFields.validationLastName.isValid && (
                  <span
                    role="alert"
                    className={`bodyS ${styles.formGroupContainerValidation}`}
                  >
                    {validationFields.validationLastName.message}
                  </span>
                )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={`bodyS ${styles.formGroupLabel}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              title="Entre com seu email"
              placeholder="ex email@example.com"
              onChange={(e) => handleChangeField(e, "email")}
              value={profileDetails.email}
              className={`bodyM ${styles.formGroupInput}`}
            />
          </div>
        </fieldset>
        <hr className={styles.lineDiviser} />
        <button
          type="submit"
          title="Salvar"
          aria-label="Salvar"
          className={`buttonPrimary headingS ${styles.btn}`}
        >
          Salvar
        </button>
      </form>
      {showNotification && (
        <Notification
          showNotification={showNotification}
          setShowNotification={(show: boolean) => setShowNotification(show)}
          message="Suas mudanças foram salvas com sucesso!"
          icon={<Save />}
        />
      )}
    </>
  );
}
