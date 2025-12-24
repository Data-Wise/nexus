# Sprint 3: Rich Markdown Editor

**Status**: ⚪ Not Started
**Duration**: 15 hours
**Depends On**: Sprint 1 ✅, Sprint 2

---

## Goal

Replace the plain textarea with a powerful WYSIWYG markdown editor using TipTap.

**What Success Looks Like**:
- Rich markdown editing (bold, italic, lists, headings)
- Live preview (see formatting as you type)
- Syntax highlighting for code blocks
- Image embedding
- Internal link autocomplete
- Keyboard shortcuts work
- Fast and responsive

---

## Tasks

### 1. Set up TipTap Editor (2h)

**Subtasks**:
- [ ] Install TipTap packages
- [ ] Create EditorComponent wrapper
- [ ] Configure basic extensions
- [ ] Style the editor
- [ ] Test basic typing

**Dependencies**:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-code-block-lowlight
npm install lowlight highlight.js
```

**Basic Editor Setup**:
```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      CodeBlockLowlight.configure({ lowlight })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  return <EditorContent editor={editor} />
}
```

---

### 2. Add Markdown Extensions (3h)

**Subtasks**:
- [ ] Configure heading levels (H1-H6)
- [ ] Add bold, italic, strikethrough
- [ ] Add bullet and numbered lists
- [ ] Add blockquotes
- [ ] Add horizontal rules
- [ ] Add code blocks with language selection
- [ ] Add inline code
- [ ] Test all formatting options

**Extensions to Configure**:
```typescript
import { Extension } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Code from '@tiptap/extension-code'

const extensions = [
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Bold,
  Italic,
  Strike,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HorizontalRule,
  Code
]
```

---

### 3. Create Formatting Toolbar (3h)

**Subtasks**:
- [ ] Design toolbar UI
- [ ] Add formatting buttons (bold, italic, etc.)
- [ ] Add heading level dropdown
- [ ] Add list buttons
- [ ] Add link button
- [ ] Add image button
- [ ] Add code block button
- [ ] Show active states
- [ ] Add keyboard shortcuts tooltip

**Toolbar Component**:
```tsx
function Toolbar({ editor }: { editor: Editor }) {
  if (!editor) return null

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
        title="Bold (Cmd+B)"
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
        title="Italic (Cmd+I)"
      >
        <Italic />
      </button>
      {/* ... more buttons */}
      <select
        value={editor.getAttributes('heading').level || 0}
        onChange={(e) => {
          const level = parseInt(e.target.value)
          if (level === 0) {
            editor.chain().focus().setParagraph().run()
          } else {
            editor.chain().focus().toggleHeading({ level }).run()
          }
        }}
      >
        <option value="0">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>
    </div>
  )
}
```

---

### 4. Add Syntax Highlighting (2h)

**Subtasks**:
- [ ] Configure lowlight with common languages
- [ ] Add language selector to code blocks
- [ ] Style code blocks with theme
- [ ] Add line numbers (optional)
- [ ] Test with TypeScript, JavaScript, Python, SQL, Bash

**Code Block Configuration**:
```typescript
import { common, createLowlight } from 'lowlight'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'

const lowlight = createLowlight(common)
lowlight.register('typescript', typescript)
lowlight.register('python', python)
lowlight.register('sql', sql)
lowlight.register('bash', bash)

const CodeBlock = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: 'typescript'
})
```

**Styling**:
```css
/* Import highlight.js theme */
@import 'highlight.js/styles/github-dark.css';

.code-block {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

.code-block select {
  /* Language selector */
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
```

---

### 5. Implement Image Support (2h)

**Subtasks**:
- [ ] Add image upload button
- [ ] Implement drag-and-drop for images
- [ ] Store images in `~/.nexus/images/`
- [ ] Create image IPC handlers
- [ ] Show image preview
- [ ] Add image captions
- [ ] Test image insertion

**Image Handling**:
```typescript
// Main process IPC handler
ipcMain.handle('images:save', async (_, imageData: Buffer, filename: string) => {
  const imagesDir = join(app.getPath('userData'), 'images')
  await fs.promises.mkdir(imagesDir, { recursive: true })
  const imagePath = join(imagesDir, filename)
  await fs.promises.writeFile(imagePath, imageData)
  return imagePath
})

// Renderer: Image upload
async function uploadImage(file: File) {
  const buffer = await file.arrayBuffer()
  const filename = `${Date.now()}-${file.name}`
  const path = await window.api.saveImage(Buffer.from(buffer), filename)
  editor.chain().focus().setImage({ src: `nexus://image/${filename}` }).run()
}

// Custom protocol for local images
import { protocol } from 'electron'

protocol.registerFileProtocol('nexus', (request, callback) => {
  const url = request.url.replace('nexus://image/', '')
  const imagePath = join(app.getPath('userData'), 'images', url)
  callback({ path: imagePath })
})
```

---

### 6. Add Internal Link Autocomplete (3h)

**Subtasks**:
- [ ] Create custom mention extension
- [ ] Implement search as you type
- [ ] Show note suggestions dropdown
- [ ] Insert link to selected note
- [ ] Handle link clicks (navigate to note)
- [ ] Style link suggestions
- [ ] Test autocomplete performance

**Link Autocomplete**:
```typescript
import Mention from '@tiptap/extension-mention'

const InternalLink = Mention.configure({
  HTMLAttributes: {
    class: 'internal-link'
  },
  suggestion: {
    items: async ({ query }) => {
      // Search notes by title
      const notes = await window.db.searchNotes(query)
      return notes.slice(0, 5)
    },
    render: () => {
      let component: any

      return {
        onStart: (props) => {
          component = new MentionList(props)
        },
        onUpdate: (props) => {
          component.update(props)
        },
        onExit: () => {
          component.destroy()
        },
        onKeyDown: (props) => {
          return component.onKeyDown(props)
        }
      }
    }
  }
})
```

**Mention List Component**:
```tsx
function MentionList({ items, command }: MentionListProps) {
  return (
    <div className="mention-dropdown">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => command({ id: item.id, label: item.title })}
          className="mention-item"
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}
```

---

## Deliverables

By end of Sprint 3:

1. **Rich Editor**
   - TipTap integrated and working
   - All markdown formatting supported
   - Toolbar with formatting buttons
   - Keyboard shortcuts working

2. **Syntax Highlighting**
   - Code blocks with language selection
   - 5+ languages supported
   - Dark theme applied

3. **Images**
   - Upload via button or drag-drop
   - Images stored locally
   - Preview in editor
   - Custom protocol for image loading

4. **Internal Links**
   - Type `[[` to trigger autocomplete
   - Search notes as you type
   - Insert link to selected note
   - Click link navigates to note

---

## Testing Checklist

Before marking Sprint 3 complete:

- [ ] Can type and format text
- [ ] Bold, italic, strikethrough work
- [ ] Headings H1-H6 work
- [ ] Bullet and numbered lists work
- [ ] Code blocks with syntax highlighting work
- [ ] Can upload images
- [ ] Can drag-drop images
- [ ] Images display correctly
- [ ] Internal link autocomplete works
- [ ] Clicking internal link navigates
- [ ] Keyboard shortcuts work (Cmd+B, Cmd+I, etc.)
- [ ] Editor is fast (no lag when typing)
- [ ] No memory leaks

---

## Notes & Blockers

### Technical Decisions
- Using TipTap (ProseMirror-based) for flexibility
- lowlight (highlight.js) for syntax highlighting
- Custom Electron protocol for local images
- Mention extension for internal links

### Challenges to Watch For
- TipTap bundle size (tree-shake unused extensions)
- Image loading performance
- Autocomplete search performance
- Memory usage with large documents

### Performance Targets
- Typing latency: < 16ms (60fps)
- Image upload: < 1s
- Autocomplete search: < 100ms
- Render 10,000 word document: < 500ms

---

## Next Sprint Preview

**Sprint 4: PARA Folder Structure** (12h)
- Implement folder hierarchy
- Folder navigation
- Move notes between folders
- Folder metadata (color, icon)
- Folder dashboards

---

**Target Start**: After Sprint 2 completion
**Target Completion**: TBD
**Actual Completion**: TBD
