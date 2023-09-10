import { PropsIcon } from "@/utils/utils";

export default function DragAndDrop({ className }: PropsIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="6"
      fill="none"
      viewBox="0 0 12 6"
      className={className}
    >
      <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
    </svg>
  );
}
