"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "../Icons/ChevronDown";
import GitHub from "../Icons/GitHub";
import FrontEndMentor from "../Icons/FrontEndMentor";
import Twitter from "../Icons/Twitter";
import Linkedin from "../Icons/Linkedin";
import YouTube from "../Icons/YouTube";
import Facebook from "../Icons/Facebook";
import Twitch from "../Icons/Twitch";
import Devto from "../Icons/Devto";
import Codewars from "../Icons/Codewars";
import Codepen from "../Icons/Codepen";
import Freecodecamp from "../Icons/Freecodecamp";
import GitLab from "../Icons/GitLab";
import HashNode from "../Icons/HashNode";
import StackOverflow from "../Icons/StackOverflow";
import {
  getRefs,
  setFocusNextItem,
  setToFocus,
  setToFocusPreviousItem,
} from "@/utils/utils";
import LinkIcon from "../Icons/Link";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import styles from "./styles.module.css";

const datas = [
  { icon: <GitHub className={styles.dropdownIcon} />, value: "GitHub" },
  {
    icon: <FrontEndMentor className={styles.dropdownIcon} />,
    value: "Frontend Mentor",
  },
  { icon: <Twitter className={styles.dropdownIcon} />, value: "Twitter" },
  { icon: <Linkedin className={styles.dropdownIcon} />, value: "Linkedln" },
  { icon: <YouTube className={styles.dropdownIcon} />, value: "YouTube" },
  { icon: <Facebook className={styles.dropdownIcon} />, value: "Facebook" },
  { icon: <Twitch className={styles.dropdownIcon} />, value: "Twitch" },
  { icon: <Devto className={styles.dropdownIcon} />, value: "Dev.to" },
  { icon: <Codewars className={styles.dropdownIcon} />, value: "Codewars" },
  { icon: <Codepen className={styles.dropdownIcon} />, value: "Codepen" },
  {
    icon: <Freecodecamp className={styles.dropdownIcon} />,
    value: "FreeCodeCamp",
  },
  { icon: <GitLab className={styles.dropdownIcon} />, value: "GitLab" },
  { icon: <HashNode className={styles.dropdownIcon} />, value: "Hashnode" },
  {
    icon: <StackOverflow className={styles.dropdownIcon} />,
    value: "Stack Overflow",
  },
];

function getData(value: string) {
  const dataFound = datas.find(
    (d) => d.value.toLowerCase() === value.toLowerCase(),
  );
  if (dataFound) {
    return dataFound;
  }
  return { icon: <LinkIcon />, value: "Escolha Plataforma" };
}

type PropsDropdown = {
  onChange: (value: string) => void;
  currentValue: string;
  labelledby?: string;
};

export default function Dropdown({
  onChange,
  currentValue,
  labelledby,
}: PropsDropdown) {
  const [menuDropdownIsOppen, setMenuDropdownIsOppen] = useState(false);
  const refsOptionsDropdown = useRef<HTMLLIElement[] | null>(null);
  const refBtnDropdown = useRef<HTMLButtonElement | null>(null);
  const [optionSelected, setOptionSelected] = useState(getData(currentValue));
  const [keyPressed, setKeyPressed] = useState<null | string>(null);
  const refContainerDropdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (optionSelected.value) {
      onChange(optionSelected.value);
    }
  }, [optionSelected.value]);

  useEffect(() => {
    if (menuDropdownIsOppen) {
      switch (keyPressed) {
        case "ArrowDown":
        case "Down":
        case "Enter":
        case " ":
          setToFocus(0, refsOptionsDropdown);
          break;
        case "ArrowUp":
          setToFocus(
            getRefs(refsOptionsDropdown).length - 1,
            refsOptionsDropdown,
          );
          break;
        default:
          break;
      }
    }
  }, [menuDropdownIsOppen]);

  function handleKeyDownButton(e: React.KeyboardEvent<HTMLButtonElement>) {
    let flag = false;
    switch (e.key) {
      case " ":
      case "Enter":
      case "ArrowDown":
      case "Down":
        flag = true;
        setMenuDropdownIsOppen(true);
        setKeyPressed("ArrowDown");
        break;
      case "Esc":
      case "Escape":
        flag = true;
        setMenuDropdownIsOppen(false);
        refBtnDropdown.current?.focus();
        break;
      case "Up":
      case "ArrowUp":
        flag = true;
        setMenuDropdownIsOppen(true);
        setKeyPressed("ArrowUp");
        break;
      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  function handleClickItemDropdown(option: {
    icon: JSX.Element;
    value: string;
  }) {
    setOptionSelected(option);
    setMenuDropdownIsOppen(false);
    refBtnDropdown.current?.focus();
  }

  function handleKeyDownItemDropdown(
    e: React.KeyboardEvent<HTMLLIElement>,
    option: {
      icon: JSX.Element;
      value: string;
    },
    index: number,
  ) {
    let flag = false;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.shiftKey) {
      if (e.key === "Tab") {
        refBtnDropdown.current?.focus();
        setMenuDropdownIsOppen(false);
        flag = true;
      }
    } else {
      switch (e.key) {
        case "Esc":
        case "Escape":
          setMenuDropdownIsOppen(false);
          refBtnDropdown.current?.focus();
          flag = true;
          break;
        case "Up":
        case "ArrowUp":
          setToFocusPreviousItem(e.currentTarget, refsOptionsDropdown);
          flag = true;
          break;
        case "ArrowDown":
        case "Down":
          setFocusNextItem(e.currentTarget, refsOptionsDropdown);
          flag = true;
          break;
        case "Home":
        case "PageUp":
          setToFocus(0, refsOptionsDropdown);
          flag = true;
          break;
        case "End":
        case "PageDown":
          setToFocus(
            getRefs(refsOptionsDropdown).length - 1,
            refsOptionsDropdown,
          );
          flag = true;
          break;
        case "Tab":
          setMenuDropdownIsOppen(false);
          break;
        case " ":
        case "Enter":
          setOptionSelected(option);
          setMenuDropdownIsOppen(false);
          refBtnDropdown.current?.focus();
          flag = true;
          break;
        default:
          break;
      }
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  function handleOnCloseDropdown() {
    setMenuDropdownIsOppen(false);
  }

  useOnClickOutside({
    ref: refContainerDropdown,
    handle: handleOnCloseDropdown,
  });

  return (
    <div ref={refContainerDropdown} className={styles.containerDropdown}>
      <button
        type="button"
        title={
          menuDropdownIsOppen
            ? "Fechar opções de escolha da plataforma"
            : "Abrir opções de escolha de plataforma"
        }
        id="buttonDrop"
        aria-haspopup="true"
        aria-controls="list"
        aria-expanded={menuDropdownIsOppen}
        aria-label={
          menuDropdownIsOppen
            ? "Fechar opções de escolha da plataforma"
            : "Abrir opções de escolha de plataforma"
        }
        aria-labelledby={labelledby}
        ref={refBtnDropdown}
        onClick={() => setMenuDropdownIsOppen(!menuDropdownIsOppen)}
        onKeyDown={handleKeyDownButton}
        className={`bodyM ${styles.dropdownButton}`}
      >
        <span className={styles.dropdownButtonText}>
          {optionSelected.icon} {optionSelected.value}
        </span>
        <ChevronDown className={styles.dropdownButtonIcon} />
      </button>
      {menuDropdownIsOppen && (
        <ul
          id="list"
          aria-labelledby="buttonDrop"
          className={styles.dropdownList}
        >
          {datas.map((d, index) => (
            <li
              key={index}
              tabIndex={0}
              onClick={() => handleClickItemDropdown(d)}
              onKeyDown={(e) => handleKeyDownItemDropdown(e, d, index)}
              ref={(option) => {
                const refItems = getRefs(refsOptionsDropdown);
                if (option) {
                  refItems[index] = option;
                } else {
                  refItems.slice(index, 1);
                }
              }}
              className={
                d.value.toLowerCase() === optionSelected.value.toLowerCase()
                  ? `bodyM ${styles.dropdownListItem} ${styles.dropdownListItemSelected}`
                  : `bodyM ${styles.dropdownListItem}`
              }
            >
              {d.icon} {d.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
