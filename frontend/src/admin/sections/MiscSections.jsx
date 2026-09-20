// Editors for: seed reviews and the contact/review form dropdown options.
import { Field, NumberField, ListEditor, StringListEditor } from '../fields.jsx'

export function SeedReviewsEditor({ data, onChange }) {
  return (
    <ListEditor
      label="Reviews shown on the site (visitor-submitted reviews are separate)"
      items={data}
      onChange={onChange}
      blankItem={{ name: '', program: '', rating: 5, text: '' }}
      itemTitle={(r) => r.name || 'New review'}
      addLabel="Add review"
      renderItem={(item, update) => (
        <>
          <div className="adm-grid-3">
            <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <Field label="Program" value={item.program} onChange={(v) => update({ ...item, program: v })} />
            <NumberField
              label="Rating (1–5)"
              value={item.rating}
              min={1}
              max={5}
              onChange={(v) => update({ ...item, rating: Math.min(5, Math.max(1, v || 1)) })}
            />
          </div>
          <Field label="Review text" value={item.text} onChange={(v) => update({ ...item, text: v })} textarea />
        </>
      )}
    />
  )
}

export function FormOptionsEditor({ programOptions, reviewProgramOptions, onChange }) {
  return (
    <>
      <StringListEditor
        label="Contact form — program dropdown options"
        items={programOptions}
        onChange={(v) => onChange({ programOptions: v, reviewProgramOptions })}
        addLabel="Add option"
      />
      <StringListEditor
        label="Review form — program dropdown options"
        items={reviewProgramOptions}
        onChange={(v) => onChange({ programOptions, reviewProgramOptions: v })}
        addLabel="Add option"
      />
    </>
  )
}
