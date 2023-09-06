import Image from "next/image";

export default function Empty() {
  return (
    <div>
      <Image
        src="./images/illustration-empty.svg"
        alt="Ilustração demostrando contéudo vazio"
        width={250}
        height={161}
      />
      <h2>Vamos começar</h2>
      <p>
        Use o botão “Adicionar novo link” para começar. Depois de ter mais de um
        link, você pode reordená-los e editá-los. Estamos aqui para ajudá-lo a
        compartilhar seus perfis com todos!
      </p>
    </div>
  );
}
