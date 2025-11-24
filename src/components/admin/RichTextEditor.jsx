import { useState, useRef, useEffect } from 'react'
import {
    Bold, Italic, Underline, List, ListOrdered,
    Image as ImageIcon, Link as LinkIcon,
    Heading1, Heading2, Quote, Undo, Redo
} from 'lucide-react'
import './RichTextEditor.css'

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    // Initialize content
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            // Only update if content is significantly different to avoid cursor jumping
            // This is a simple check; for production might need more robust cursor management
            if (document.activeElement !== editorRef.current) {
                editorRef.current.innerHTML = value || ''
            }
        }
    }, [value])

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML
            onChange(html)
        }
    }

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value)
        editorRef.current.focus()
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64 = e.target.result
                // Insert image with max-width style to prevent overflow
                const imgHtml = `<img src="${base64}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />`
                document.execCommand('insertHTML', false, imgHtml)
                handleInput()
            }
            reader.readAsDataURL(file)
        }
        // Reset input
        e.target.value = ''
    }

    const addLink = () => {
        const url = prompt('Ingresa la URL del enlace:')
        if (url) {
            execCommand('createLink', url)
        }
    }

    return (
        <div className={`rich-editor ${isFocused ? 'focused' : ''}`}>
            <div className="editor-toolbar">
                <div className="toolbar-group">
                    <button type="button" onClick={() => execCommand('bold')} title="Negrita">
                        <Bold size={18} />
                    </button>
                    <button type="button" onClick={() => execCommand('italic')} title="Cursiva">
                        <Italic size={18} />
                    </button>
                    <button type="button" onClick={() => execCommand('underline')} title="Subrayado">
                        <Underline size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button type="button" onClick={() => execCommand('formatBlock', 'H2')} title="Título 1">
                        <Heading1 size={18} />
                    </button>
                    <button type="button" onClick={() => execCommand('formatBlock', 'H3')} title="Título 2">
                        <Heading2 size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button type="button" onClick={() => execCommand('insertUnorderedList')} title="Lista con viñetas">
                        <List size={18} />
                    </button>
                    <button type="button" onClick={() => execCommand('insertOrderedList')} title="Lista numerada">
                        <ListOrdered size={18} />
                    </button>
                    <button type="button" onClick={() => execCommand('formatBlock', 'blockquote')} title="Cita">
                        <Quote size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button type="button" onClick={addLink} title="Insertar enlace">
                        <LinkIcon size={18} />
                    </button>
                    <label className="image-upload-btn" title="Insertar imagen">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <ImageIcon size={18} />
                    </label>
                </div>
            </div>

            <div
                className="editor-content-area"
                contentEditable
                ref={editorRef}
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
            />
        </div>
    )
}
