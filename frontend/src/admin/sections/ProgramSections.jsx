// Editors for: Programs, Schedule (grid + legend + tiers).
import { uploadProgramImage } from '../api.js'
import { Field, CheckboxField, ImageUploadField, ListEditor, SelectField } from '../fields.jsx'
import {
  DEFAULT_PROGRAM_IMAGE_VISIBILITY,
  getProgramOverlayStyle,
} from '../../utils/programCard.js'

function ProgramVisibilityField({ program, onChange }) {
  const visibility = program.imageVisibility ?? DEFAULT_PROGRAM_IMAGE_VISIBILITY

  return (
    <div className="adm-visibility-field">
      <div className="adm-program-preview" style={getProgramOverlayStyle(visibility)}>
        <span className="adm-program-preview-watermark" aria-hidden="true">Λ</span>
        {program.image && (
          <img src={program.image} alt="" onError={(event) => event.currentTarget.remove()} />
        )}
        <div className="adm-program-preview-copy">
          <span>{program.age || 'Age range'}</span>
          <strong>{program.name || 'Program name'}</strong>
          <small>{program.desc || 'Program description preview'}</small>
        </div>
      </div>
      <label className="adm-visibility-control">
        <span className="adm-field-label">Image visibility: {visibility}%</span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={visibility}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span className="adm-visibility-scale">
          <span>Darker</span>
          <span>Brighter</span>
        </span>
        <span className="adm-field-hint">
          Adjusts the dark overlay for this program without changing text opacity.
        </span>
      </label>
    </div>
  )
}

function ProgramFields({ item, update, onUnauthorized }) {
  return (
    <>
      <ImageUploadField
        label="Background image"
        value={item.image}
        onChange={(v) => update({ ...item, image: v })}
        onUpload={uploadProgramImage}
        onUnauthorized={onUnauthorized}
        alt={`${item.name || 'Program'} background preview`}
        previewVariant="landscape"
        hint="JPG, PNG, or WebP up to 5MB. Use a wide, centered action photo."
      />
      <ProgramVisibilityField
        program={item}
        onChange={(v) => update({ ...item, imageVisibility: v })}
      />
      <div className="adm-grid-2">
        <Field label="Age range / tag" value={item.age} onChange={(v) => update({ ...item, age: v })} />
        <Field label="Program name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
      </div>
      <Field label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} textarea />
      <div className="adm-grid-2">
        <CheckboxField
          label="Links to external registration page"
          checked={item.external}
          onChange={(v) => update({ ...item, external: v })}
        />
        {item.external ? (
          <Field
            label="Registration link path"
            value={item.slug ?? ''}
            onChange={(v) => update({ ...item, slug: v })}
            hint="Appended to the registration base URL (Site Info section)."
          />
        ) : (
          <Field
            label="Link (e.g. #schedule)"
            value={item.link ?? ''}
            onChange={(v) => update({ ...item, link: v })}
          />
        )}
      </div>
      <Field
        label="Button text (optional)"
        value={item.arrowText ?? ''}
        onChange={(v) => update({ ...item, arrowText: v || undefined })}
        hint='Defaults to "Register Now" when left blank.'
      />
    </>
  )
}

export function ProgramsEditor({ data, onChange, onUnauthorized }) {
  const blank = {
    age: '',
    name: '',
    image: '',
    imageVisibility: DEFAULT_PROGRAM_IMAGE_VISIBILITY,
    desc: '',
    slug: '',
    external: true,
  }
  return (
    <>
      <ListEditor
        label="Main programs (top row)"
        items={data.main}
        onChange={(v) => onChange({ ...data, main: v })}
        blankItem={blank}
        itemTitle={(p) => p.name || 'New program'}
        addLabel="Add program"
        renderItem={(item, update) => (
          <ProgramFields item={item} update={update} onUnauthorized={onUnauthorized} />
        )}
      />
      <ListEditor
        label="Secondary programs (bottom row)"
        items={data.secondary}
        onChange={(v) => onChange({ ...data, secondary: v })}
        blankItem={blank}
        itemTitle={(p) => p.name || 'New program'}
        addLabel="Add program"
        renderItem={(item, update) => (
          <ProgramFields item={item} update={update} onUnauthorized={onUnauthorized} />
        )}
      />
    </>
  )
}

export function ScheduleEditor({ data, onChange, tiers, onTiersChange }) {
  const tierOptions = Object.entries(tiers).map(([value, t]) => ({ value, label: t.name }))
  const firstTier = tierOptions[0]?.value ?? ''

  const updateDay = (i, next) =>
    onChange({ ...data, days: data.days.map((d, j) => (j === i ? next : d)) })

  return (
    <>
      <div className="adm-list-label">Class tiers (names shown in the grid legend)</div>
      <div className="adm-grid-2">
        {Object.entries(tiers).map(([key, tier]) => (
          <Field
            key={key}
            label={`Tier: ${key}`}
            value={tier.name}
            onChange={(v) => onTiersChange({ ...tiers, [key]: { ...tier, name: v } })}
          />
        ))}
      </div>

      <div className="adm-list-label">Weekly grid</div>
      {data.days.map((day, i) => (
        <div className="adm-list-item" key={day.day}>
          <div className="adm-list-item-head">
            <span className="adm-list-item-title">{day.day}</span>
            <span className="adm-list-item-actions">
              <CheckboxField
                label="Rest day"
                checked={!!day.rest}
                onChange={(v) => updateDay(i, { ...day, rest: v, classes: v ? [] : day.classes })}
              />
            </span>
          </div>
          {!day.rest && (
            <div className="adm-list-item-body">
              <ListEditor
                items={day.classes}
                onChange={(v) => updateDay(i, { ...day, classes: v })}
                blankItem={{ tier: firstTier, time: '', name: '' }}
                itemTitle={(c) => c.name || 'New class'}
                addLabel="Add class"
                renderItem={(item, update) => (
                  <div className="adm-grid-3">
                    <SelectField
                      label="Tier (color)"
                      value={item.tier}
                      onChange={(v) => update({ ...item, tier: v })}
                      options={tierOptions}
                    />
                    <Field label="Time" value={item.time} onChange={(v) => update({ ...item, time: v })} />
                    <Field label="Class name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                  </div>
                )}
              />
            </div>
          )}
        </div>
      ))}

      <ListEditor
        label="Legend cards (below the grid)"
        items={data.legend}
        onChange={(v) => onChange({ ...data, legend: v })}
        blankItem={{ tier: firstTier, meta: '', drop: '' }}
        itemTitle={(l) => tiers[l.tier]?.name || l.tier}
        addLabel="Add legend card"
        renderItem={(item, update) => (
          <div className="adm-grid-3">
            <SelectField
              label="Tier"
              value={item.tier}
              onChange={(v) => update({ ...item, tier: v })}
              options={tierOptions}
            />
            <Field
              label="Days & times"
              value={item.meta}
              onChange={(v) => update({ ...item, meta: v })}
              textarea
              hint="Line breaks are kept on the site."
            />
            <Field label="Drop-in text" value={item.drop} onChange={(v) => update({ ...item, drop: v })} />
          </div>
        )}
      />

      <Field label="Schedule note" value={data.note} onChange={(v) => onChange({ ...data, note: v })} textarea />
    </>
  )
}
