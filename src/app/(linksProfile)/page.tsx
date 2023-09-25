import dynamic from "next/dynamic";

const CustomizeLinks = dynamic(
  () => import("../../components/CustomizeLinks/index"),
  { ssr: false },
);

export default function Home() {
  return (
    <CustomizeLinks />
  );
}
