import { CustomizeLink } from "@/types/datas";

export type ActionTypeLinksReducer =
  | {
      type: "save_new_link";
      customizeLink: CustomizeLink;
    }
  | { type: "changed_link"; customizeLink: CustomizeLink }
  | { type: "delete_link"; id: string } | { type: "save_batches_link"; batchesLink: CustomizeLink[] } | { type: "reorder_links"; sourceIndex: number; targetIndex: number; };

export function linksReducer(
  draft: CustomizeLink[],
  action: ActionTypeLinksReducer,
) {
  switch (action.type) {
    case "save_new_link": {
      return [...draft, action.customizeLink];
    }
    case "save_batches_link": {
      return [...draft, ...action.batchesLink];
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
    case "reorder_links": {
      const draftClone = [...draft];
      const tempTarget = draftClone[action.targetIndex];
      draftClone[action.targetIndex] = draftClone[action.sourceIndex];
      draftClone[action.sourceIndex] = tempTarget;
      return draftClone;
    }
    default: {
      throw Error("Ação desconhecida reducer links");
    }
  }
}
