import Editor from './Editor';
import Bold from './Plugins/Font/bold';
import Italic from './Plugins/Font/italic';
import Strikethrough from './Plugins/Font/strikethrough';
import OrderedList from './Plugins/List/ordered';
import UnorderedList from './Plugins/List/unordered';
import Quote from './Plugins/Block/quote';
import Code from './Plugins/Block/code-block';
import CodeInline from './Plugins/Block/code-inline';
import Hr from './Plugins/Block/wrap';
import Link from './Plugins/link';
import Logger from './Plugins/Logger';
import Image from './Plugins/image';
import Table from './Plugins/table';
import H2 from './Plugins/Header/h2';
import H3 from './Plugins/Header/h3';
import Emoji from './Plugins/Emoji';

Editor.use(H2);
Editor.use(H3);
Editor.use(Bold);
Editor.use(Italic);
Editor.use(Strikethrough);
Editor.use(UnorderedList);
Editor.use(OrderedList);
Editor.use(Quote);
Editor.use(CodeInline);
Editor.use(Code);
Editor.use(Hr);
Editor.use(Link);
Editor.use(Image);
Editor.use(Table);
Editor.use(Emoji);
Editor.use(Logger);

export default Editor;
