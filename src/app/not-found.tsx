import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h2 className="headingM notfound-container_title">Não Encontrado</h2>
      <p className="bodyM notfound-container_text">
        Não foi possível encontrar o recurso solicitado
      </p>
      <Link href="/" target="_self" rel="previous" className="buttonPrimary notfound-container_link">
        Retornar para Home
      </Link>
    </div>
  );
}
