// Editors for: Site Info, Hero, Accolades, About.
import { Field, ListEditor, StringListEditor } from '../fields.jsx'

export function SiteInfoEditor({ data, onChange }) {
  const set = (key, value) => onChange({ ...data, [key]: value })
  return (
    <>
      <div className="adm-grid-2">
        <Field label="Academy name" value={data.name} onChange={(v) => set('name', v)} />
        <Field label="Short name (logo/nav)" value={data.shortName} onChange={(v) => set('shortName', v)} />
        <Field label="Tagline" value={data.tagline} onChange={(v) => set('tagline', v)} />
        <Field label="Year established" value={data.established} onChange={(v) => set('established', v)} />
        <Field
          label="Address line 1"
          value={data.address.line1}
          onChange={(v) => set('address', { ...data.address, line1: v })}
        />
        <Field
          label="Address line 2 (city, state, zip)"
          value={data.address.line2}
          onChange={(v) => set('address', { ...data.address, line2: v })}
        />
        <Field label="Phone" value={data.phone} onChange={(v) => set('phone', v)} />
        <Field label="Email" value={data.email} onChange={(v) => set('email', v)} />
        <Field
          label="Instagram handle"
          value={data.instagram.handle}
          onChange={(v) => set('instagram', { ...data.instagram, handle: v })}
        />
        <Field
          label="Instagram URL"
          value={data.instagram.url}
          onChange={(v) => set('instagram', { ...data.instagram, url: v })}
        />
      </div>
      <Field
        label="Registration base URL"
        value={data.registrationBaseUrl}
        onChange={(v) => set('registrationBaseUrl', v)}
        hint="Program registration links are built from this URL plus each program's link path."
      />
    </>
  )
}

export function HeroEditor({ data, onChange, site }) {
  const set = (key, value) => onChange({ ...data, [key]: value })
  const eyebrowPreview = `${site.address.line1.split(',')[0]} · Est. ${site.established} · ${data.eyebrowTagline}`
  return (
    <>
      <Field
        label="Eyebrow tagline"
        value={data.eyebrowTagline}
        onChange={(v) => set('eyebrowTagline', v)}
        hint={`Shown as: "${eyebrowPreview}"`}
      />
      <div className="adm-grid-2">
        <Field label="Title line 1" value={data.titleLine1} onChange={(v) => set('titleLine1', v)} />
        <Field label="Title line 2" value={data.titleLine2} onChange={(v) => set('titleLine2', v)} />
      </div>
      <Field label="Subtitle paragraph" value={data.sub} onChange={(v) => set('sub', v)} textarea />
    </>
  )
}

export function AccoladesEditor({ data, onChange }) {
  return (
    <ListEditor
      items={data}
      onChange={onChange}
      blankItem={{ num: '', label: '' }}
      itemTitle={(a) => a.num || 'New stat'}
      addLabel="Add stat"
      renderItem={(item, update) => (
        <div className="adm-grid-2">
          <Field label="Number (e.g. 25+)" value={item.num} onChange={(v) => update({ ...item, num: v })} />
          <Field
            label="Label"
            value={item.label}
            onChange={(v) => update({ ...item, label: v })}
            textarea
            hint="Line breaks are kept on the site."
          />
        </div>
      )}
    />
  )
}

export function AboutEditor({ data, onChange }) {
  const set = (key, value) => onChange({ ...data, [key]: value })
  return (
    <>
      <div className="adm-grid-2">
        <Field
          label="Title line 1"
          value={data.title[0]}
          onChange={(v) => set('title', [v, data.title[1]])}
        />
        <Field
          label="Title line 2"
          value={data.title[1]}
          onChange={(v) => set('title', [data.title[0], v])}
        />
      </div>
      <StringListEditor
        label="Paragraphs"
        items={data.paragraphs}
        onChange={(v) => set('paragraphs', v)}
        addLabel="Add paragraph"
        textarea
      />
      <Field label="Badge text" value={data.badge} onChange={(v) => set('badge', v)} />
    </>
  )
}
