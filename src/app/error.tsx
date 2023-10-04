"use client";

import { PropsError } from "@/types/datas";
import Link from "next/link";

export default function Error({ error, reset }: PropsError) {
  return (
    <div className="error-container">
      <h2 className="headingS error-container_title">Algo deu errado!</h2>
      <div>
        <button
          type="button"
          title="Tentar Novamente"
          aria-label="Tentar Novamente"
          onClick={() => reset()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "") reset();
          }}
          className="buttonPrimary error-container_button"
        >
          Tentar Novamente!
        </button>
        <Link
          href="/"
          target="_self"
          rel="previous"
          title="Home"
          aria-label="Home"
          className="buttonSecondary error-container_link"
        >
          Voltar Para Home
        </Link>
      </div>
    </div>
  );
}
