import db from "../db/db.ts";
import MarkdownIt from "markdown-it";
import { LazyCache } from "../../types/lazyload/lazyCache.ts";

const mdi = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

const noticeHtml = new LazyCache<string, undefined>(async () => {
    const result = await db().query(`select content
                                     from key_file
                                     where name = 'notice.md';`);
    return mdi.render(result.rows[0].content);
}, 60 * 60);

export default noticeHtml;
