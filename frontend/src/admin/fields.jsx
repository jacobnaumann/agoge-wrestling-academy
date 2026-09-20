import { useId, useRef, useState } from 'react'

// Reusable form building blocks for the admin editor.

export function Field({ label, value, onChange, textarea = false, hint, type = 'text' }) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">{label}</span>
      {textarea ? (
        <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <span className="adm-field-hint">{hint}</span>}
    </label>
  )
}

export function NumberField({ label, value, onChange, min, max, hint }) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">{label}</span>
      <input
        type="number"
        value={value ?? ''}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <span className="adm-field-hint">{hint}</span>}
    </label>
  )
}

export function CheckboxField({ label, checked, onChange, hint }) {
  return (
    <label className="adm-field adm-field-checkbox">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="adm-field-label">{label}</span>
      {hint && <span className="adm-field-hint">{hint}</span>}
    </label>
  )
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">{label}</span>
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ImageUploadField({
  label,
  value,
  onChange,
  onUpload,
  onUnauthorized,
  alt = 'Image preview',
  previewVariant = 'portrait',
  hint = 'JPG, PNG, or WebP up to 5MB. Use a vertical, centered portrait.',
}) {
  const inputId = useId()
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const selectImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const image = await onUpload(file)
      onChange(image)
    } catch (err) {
      if (err.unauthorized) onUnauthorized?.()
      else setError(err.message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="adm-image-field">
      <span className="adm-field-label">{label}</span>
      <div className="adm-image-field-row">
        <div className={`adm-image-preview ${previewVariant === 'landscape' ? 'is-landscape' : ''}${value ? '' : ' is-empty'}`}>
          {value ? <img src={value} alt={alt} /> : <span aria-hidden="true">Λ</span>}
        </div>
        <div className="adm-image-actions">
          <input
            ref={inputRef}
            id={inputId}
            className="adm-image-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={selectImage}
            disabled={uploading}
          />
          <button
            type="button"
            className="adm-image-button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : value ? 'Replace photo' : 'Upload photo'}
          </button>
          {value && (
            <button type="button" className="adm-image-remove" onClick={() => onChange('')} disabled={uploading}>
              Remove
            </button>
          )}
          <span className="adm-field-hint">{hint}</span>
          {error && <span className="adm-image-error" role="alert">{error}</span>}
        </div>
      </div>
    </div>
  )
}

// Generic editor for arrays of objects: add / remove / reorder, with a custom
// renderer for each item's fields.
export function ListEditor({ label, items, onChange, blankItem, itemTitle, renderItem, addLabel }) {
  const updateItem = (i, next) => onChange(items.map((it, j) => (j === i ? next : it)))
  const removeItem = (i) => onChange(items.filter((_, j) => j !== i))
  const moveItem = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const addItem = () => onChange([...items, structuredClone(blankItem)])

  return (
    <div className="adm-list">
      {label && <div className="adm-list-label">{label}</div>}
      {items.map((item, i) => (
        <div className="adm-list-item" key={i}>
          <div className="adm-list-item-head">
            <span className="adm-list-item-title">
              {itemTitle ? itemTitle(item, i) : `Item ${i + 1}`}
            </span>
            <span className="adm-list-item-actions">
              <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0} title="Move up">↑</button>
              <button type="button" onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} title="Move down">↓</button>
              <button type="button" className="adm-danger" onClick={() => removeItem(i)} title="Remove">✕</button>
            </span>
          </div>
          <div className="adm-list-item-body">
            {renderItem(item, (next) => updateItem(i, next))}
          </div>
        </div>
      ))}
      <button type="button" className="adm-add-btn" onClick={addItem}>
        + {addLabel || 'Add item'}
      </button>
    </div>
  )
}

// Editor for arrays of plain strings (accolade lines, dropdown options, …).
export function StringListEditor({ label, items, onChange, addLabel, textarea = false }) {
  const updateItem = (i, next) => onChange(items.map((it, j) => (j === i ? next : it)))
  const removeItem = (i) => onChange(items.filter((_, j) => j !== i))
  const moveItem = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="adm-list adm-string-list">
      {label && <div className="adm-list-label">{label}</div>}
      {items.map((item, i) => (
        <div className="adm-string-row" key={i}>
          {textarea ? (
            <textarea value={item} rows={2} onChange={(e) => updateItem(i, e.target.value)} />
          ) : (
            <input type="text" value={item} onChange={(e) => updateItem(i, e.target.value)} />
          )}
          <span className="adm-list-item-actions">
            <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0} title="Move up">↑</button>
            <button type="button" onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} title="Move down">↓</button>
            <button type="button" className="adm-danger" onClick={() => removeItem(i)} title="Remove">✕</button>
          </span>
        </div>
      ))}
      <button type="button" className="adm-add-btn" onClick={() => onChange([...items, ''])}>
        + {addLabel || 'Add'}
      </button>
    </div>
  )
}
