import { tags } from "typia";

namespace customTags{
    export type Username=tags.Pattern<"^[a-zA-Z0-9_]{3,16}$">
}

export default customTags