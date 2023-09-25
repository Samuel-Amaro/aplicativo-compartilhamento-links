"use client";

import {
  useLinksContext,
  useLinksDispatchContext,
} from "@/context/LinksContext";
import Empty from "../Empty";
import { useEffect, useRef, useState } from "react";
import { CustomizeLink } from "@/types/datas";
import { nanoid } from "nanoid";
import DragAndDrop from "../Icons/DragAndDrop";
import Dropdown from "../Dropdown";
import Image from "next/image";
import { patternsUrlsPlatforms } from "@/utils/utils";
import styles from "./styles.module.css";

type Validation = { id: string; isValid: boolean; message: string };

export default function CustomizeLinks() {
  const linksContext = useLinksContext();
  const linksContextDispatch = useLinksDispatchContext();
  const [customizeLinksLocale, setCustomizeLinksLocale] = useState(
    linksContext.customizeLinks,
  );
  const [validationsCustomizeLinksLocale, setValidationsCustomizeLinksLocale] =
    useState<Validation[]>([]);
  const dragCustomLinkIndex = useRef<number>(0);
  const draggedOverCustomLinkIndex = useRef<number>(0);

  function handleClickBtnAddNewLink() {
    const customizeLink: CustomizeLink = {
      id: nanoid(5),
      plataform: "",
      link: "",
    };
    setCustomizeLinksLocale([...customizeLinksLocale, customizeLink]);
  }

  function handleKeyDownBtnAddNewLink(
    e: React.KeyboardEvent<HTMLButtonElement>,
  ) {
    if (e.key === "" || e.key === "Enter") {
      const customizeLink: CustomizeLink = {
        id: nanoid(5),
        plataform: "",
        link: "",
      };
      setCustomizeLinksLocale([...customizeLinksLocale, customizeLink]);
    }
  }

  function handleOnChangeDropdown(id: string, value: string) {
    setCustomizeLinksLocale(
      customizeLinksLocale.map((cl) => {
        if (cl.id === id) {
          return {
            ...cl,
            plataform: value,
          };
        }
        return cl;
      }),
    );
  }

  function handleChangeInputUrl(
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setCustomizeLinksLocale(
      customizeLinksLocale.map((cl) => {
        if (cl.id === id) {
          return {
            ...cl,
            link: e.target.value,
          };
        }
        return cl;
      }),
    );
  }

  function handleClickBtnRemove(id: string) {
    setCustomizeLinksLocale(
      customizeLinksLocale.filter((customLinkLoc) => customLinkLoc.id !== id),
    );
    linksContextDispatch({ type: "delete_link", id: id });
  }

  function handleKeyDownBtnRemove(
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) {
    if (e.key === "Enter" || e.key === "") {
      setCustomizeLinksLocale(
        customizeLinksLocale.filter((customLinkLoc) => customLinkLoc.id !== id),
      );
      linksContextDispatch({ type: "delete_link", id: id });
    }
  }

  function linkCustomizeValidation(customLink: CustomizeLink) {
    //nova validação
    const validation: Validation = {
      id: customLink.id,
      isValid: true,
      message: "",
    };
    //inicialmente definimos que o custom link e valido
    validation.isValid = true;
    //obtem o padrão de validação a ser usado
    const patternValidation = patternsUrlsPlatforms.find(
      (patterUrlPlat) =>
        patterUrlPlat.platform.toLowerCase() ===
        customLink.plataform.toLowerCase(),
    );
    //validações
    //validação para caso não tenha escolhido uma plataforma
    if (
      !customLink.plataform ||
      customLink.plataform.toLowerCase() === "escolha plataforma"
    ) {
      validation.message = "escolha plataforma";
      validation.isValid = false;
    }
    //validação para caso não tenha um link informado
    if (customLink.link.trim() === "") {
      validation.message = "Não pode estar vazio";
      validation.isValid = false;
    }
    //se o padrão de validação foi encontrado
    if (patternValidation) {
      //aplica a regex via test
      const regex = new RegExp(patternValidation.urlPattern, "gim");
      if (!regex.test(customLink.link)) {
        validation.message = "Verifique o URL";
        validation.isValid = false;
      }
    }
    return validation;
  }

  function saveInContext() {
    customizeLinksLocale.forEach((customLink) => {
      //retornar o customLink pois o value do link context e desatualizado
      const customLinkIsSavedContext = linksContext.customizeLinks.find(
        (cl) => cl.id === customLink.id,
      );
      if (customLinkIsSavedContext) {
        linksContextDispatch({
          type: "changed_link",
          customizeLink: customLink,
        });
      } else {
        linksContextDispatch({
          type: "save_new_link",
          customizeLink: customLink,
        });
      }
    });
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validationsCustomizeLinksLocale.length === 0) {
      saveInContext();
    }
  }

  function handleSort() {
    const customLinksLocaleClone = [...customizeLinksLocale];
    //obtem o custom link que esta sendo arrastado
    const temp = customLinksLocaleClone[dragCustomLinkIndex.current];
    //add o custom link que esta sendo usado como lugar de soltura no lugar do custom link que esta sendo arrastado
    customLinksLocaleClone[dragCustomLinkIndex.current] =
      customLinksLocaleClone[draggedOverCustomLinkIndex.current];
    //add o custom link que esta sendo arrastado no lugar do custom link que esta sendo usado como lugar de soltura
    customLinksLocaleClone[draggedOverCustomLinkIndex.current] = temp;
    setCustomizeLinksLocale(customLinksLocaleClone);
    if (validationsCustomizeLinksLocale.length === 0) {
      linksContextDispatch({
        type: "reorder_links",
        sourceIndex: dragCustomLinkIndex.current,
        targetIndex: draggedOverCustomLinkIndex.current,
      });
    }
  }

  useEffect(() => {
    function validateCustomLinks() {
      const newsValidations: Validation[] = [];

      customizeLinksLocale.forEach((customLinkLoc) => {
        const validation = linkCustomizeValidation(customLinkLoc);
        if (!validation.isValid) {
          newsValidations.push(validation);
        }
      });

      setValidationsCustomizeLinksLocale(newsValidations);
    }

    validateCustomLinks();
  }, [customizeLinksLocale]);

  return (
    <section className={styles.customLinks}>
      <h1 className={`headingM ${styles.customLinksTitle}`}>
        Personalize seus links
      </h1>
      <p className={`bodyM ${styles.customLinksDescription}`}>
        Adicione/edite/remova links abaixo e compartilhe todos os seus perfis
        com o mundo!
      </p>
      <button
        type="button"
        title="Adicionar novo link"
        aria-label="Adicionar novo link"
        onClick={handleClickBtnAddNewLink}
        onKeyDown={handleKeyDownBtnAddNewLink}
        className={`buttonSecondary ${styles.customLinksButton} ${styles.customLinksButtonAdd}`}
      >
        + Adicionar novo link
      </button>
      {customizeLinksLocale.length === 0 ? (
        <Empty />
      ) : (
        <form id="form-links" onSubmit={handleSubmitForm} className={styles.form}>
          <div>
            {customizeLinksLocale.map((customLink, index) => {
              const datasValidation = patternsUrlsPlatforms.find(
                (patterUrl) =>
                  patterUrl.platform.toLowerCase() ===
                  customLink.plataform.toLowerCase(),
              );
              const validation = validationsCustomizeLinksLocale.find(
                (validCustLink) => validCustLink.id === customLink.id,
              );
              return (
                <div
                  key={customLink.id}
                  draggable="true"
                  id={customLink.id}
                  /*...o usuário começa a arrastar um item.*/
                  onDragStart={() => (dragCustomLinkIndex.current = index)}
                  /*...um item arrastado entra em um destino de soltura válido.*/
                  onDragEnter={() =>
                    (draggedOverCustomLinkIndex.current = index)
                  }
                  /*...uma operação de arrastar termina (como soltar o botão do mouse ou pressionar a tecla Esc;*/
                  onDragEnd={handleSort}
                  /*...um item arrastado está sendo arrastado sobre um destino de soltar válido, a cada poucas centenas de milissegundos.*/
                  onDragOver={(e) => e.preventDefault()}
                  className={styles.customLinksRepeat}
                >
                  <div className={styles.customLinksFormGroupContainer}>
                    <button
                      type="button"
                      title="Arrastar ou soltar bloco de link customizavel"
                      aria-label="Arrastar ou soltar bloco de link customizavel"
                      className={`${styles.customLinksButton} ${styles.customLinksBtnDragDrop}`}
                    >
                      <DragAndDrop className={styles.customLinksIcon} />
                      <span>Link {`#${index + 1}`}</span>
                    </button>
                    <button
                      type="button"
                      title="Remover"
                      aria-label="Remover"
                      onClick={() => handleClickBtnRemove(customLink.id)}
                      onKeyDown={(e) =>
                        handleKeyDownBtnRemove(e, customLink.id)
                      }
                      className={`${styles.customLinksButton} ${styles.customLinksBtnRemove}`}
                    >
                      Remover
                    </button>
                  </div>
                  <div className={styles.customLinksFormGroup}>
                    <label
                      htmlFor={`platform${customLink.id}`}
                      className={`bodyS ${styles.customLinkLabel}`}
                    >
                      Plataforma
                    </label>
                    <Dropdown
                      onChange={(value: string) =>
                        handleOnChangeDropdown(customLink.id, value)
                      }
                      currentValue={customLink.plataform}
                      labelledby={`platform${customLink.id}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`link${customLink.id}`}
                      className={`bodyS ${styles.customLinkLabel}`}
                    >
                      Link
                    </label>
                    <div className={styles.customLinkContainerGroup}>
                      <Image
                        src={"./images/icon-link.svg"}
                        alt={""}
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className={styles.customLinkIconInput}
                      />
                      <input
                        type="url"
                        id={`link${customLink.id}`}
                        title={`Insira link no seguinte formato ${
                          datasValidation && datasValidation.urlPlaceholder
                        }`}
                        required
                        value={customLink.link.toLowerCase()}
                        onChange={(e) => handleChangeInputUrl(customLink.id, e)}
                        placeholder={
                          datasValidation && datasValidation.urlPlaceholder
                        }
                        pattern={datasValidation && datasValidation.urlPattern}
                        className={
                          validation
                            ? `${styles.customLinkInput} ${styles.customLinkInputError}`
                            : styles.customLinkInput
                        }
                      />
                      {validation && (
                        <span
                          role="alert"
                          className={`bodyS ${styles.customLinkMessageValidation}`}
                        >
                          {validation.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      )}
      <hr className={styles.customLinkLineDiviser} />
      <button
        type="submit"
        title="Salvar"
        aria-label="Salvar"
        form="form-links"
        className={`${styles.customLinksButton} buttonPrimary ${styles.customLinkBtnSave}`}
        disabled={customizeLinksLocale.length === 0}
      >
        Salvar
      </button>
    </section>
  );
}
