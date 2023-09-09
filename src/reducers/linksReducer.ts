import { CustomizeLink } from "@/types/datas";

export type ActionTypeLinksReducer =
  | {
      type: "save_new_link";
      customizeLink: CustomizeLink;
    }
  | { type: "changed_link"; customizeLink: CustomizeLink }
  | { type: "delete_link"; id: string };

export function linksReducer(
  draft: CustomizeLink[],
  action: ActionTypeLinksReducer,
) {
  switch (action.type) {
    case "save_new_link": {
      return [...draft, action.customizeLink];
    }
    case "changed_link": {
      return draft.map((link) => {
        if (link.id === action.customizeLink.id) {
          return action.customizeLink;
        }
        return link;
      });
    }
    case "delete_link": {
      return draft.filter((link) => link.id !== action.id);
    }
    default: {
      throw Error("Ação desconhecida reducer links");
    }
  }
}
