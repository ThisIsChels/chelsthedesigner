import { createCn } from "cn/config";

// Teach the class merger about our custom `type-*` and `lift` utilities so it
// treats each family as one group instead of guessing.
export const cn = createCn({
  extend: {
    classGroups: {
      "type-style": [
        {
          type: [
            "display-xl", "display-lg", "display-md", "display-sm",
            "heading-lg", "heading-md-semibold", "heading-md-medium", "heading-md", "heading-sm",
            "card-title", "body-xl", "body-lg", "body", "label-md", "label-sm", "caption",
          ],
        },
      ],
    },
  },
});
