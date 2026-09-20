// Editors for: Competitions, Staff, Personal Training, Camps.
import { uploadCoachImage } from '../api.js'
import { Field, CheckboxField, ImageUploadField, ListEditor, StringListEditor } from '../fields.jsx'

export function CompetitionsEditor({ data, onChange }) {
  return (
    <>
      <ListEditor
        label="Events"
        items={data.events}
        onChange={(v) => onChange({ ...data, events: v })}
        blankItem={{ month: '', day: '', name: '', venue: '', compete: '', badge: '' }}
        itemTitle={(e) => e.name || 'New event'}
        addLabel="Add event"
        renderItem={(item, update) => (
          <>
            <div className="adm-grid-3">
              <Field label="Month (e.g. Aug)" value={item.month} onChange={(v) => update({ ...item, month: v })} />
              <Field label="Day (e.g. 15)" value={item.day} onChange={(v) => update({ ...item, day: v })} />
              <Field label="Badge (e.g. Duals)" value={item.badge} onChange={(v) => update({ ...item, badge: v })} />
            </div>
            <Field label="Event name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <div className="adm-grid-2">
              <Field label="Venue" value={item.venue} onChange={(v) => update({ ...item, venue: v })} />
              <Field label="Compete date text" value={item.compete} onChange={(v) => update({ ...item, compete: v })} />
            </div>
          </>
        )}
      />
      <Field label="Section note" value={data.note} onChange={(v) => onChange({ ...data, note: v })} textarea />
    </>
  )
}

function AccoladeGroupsEditor({ label, groups, onChange }) {
  return (
    <ListEditor
      label={label}
      items={groups}
      onChange={onChange}
      blankItem={{ label: '', items: [] }}
      itemTitle={(g) => g.label || 'New group'}
      addLabel="Add accolade group"
      renderItem={(group, update) => (
        <>
          <Field label="Group label" value={group.label} onChange={(v) => update({ ...group, label: v })} />
          <StringListEditor
            label="Accolades"
            items={group.items}
            onChange={(v) => update({ ...group, items: v })}
            addLabel="Add accolade"
          />
        </>
      )}
    />
  )
}

export function StaffEditor({ data, onChange, onUnauthorized }) {
  const head = data.headCoach
  const setHead = (key, value) => onChange({ ...data, headCoach: { ...head, [key]: value } })
  const setColumn = (i, groups) =>
    setHead('columns', head.columns.map((c, j) => (j === i ? groups : c)))

  return (
    <>
      <div className="adm-list-label">Head coach</div>
      <ImageUploadField
        label="Portrait"
        value={head.image}
        onChange={(v) => setHead('image', v)}
        onUpload={uploadCoachImage}
        onUnauthorized={onUnauthorized}
        alt={`${head.name || 'Head coach'} portrait preview`}
      />
      <div className="adm-grid-2">
        <Field label="Role" value={head.role} onChange={(v) => setHead('role', v)} />
        <Field label="Name" value={head.name} onChange={(v) => setHead('name', v)} />
        <Field label="Phone" value={head.phone} onChange={(v) => setHead('phone', v)} />
        <Field label="Email" value={head.email} onChange={(v) => setHead('email', v)} />
      </div>
      <AccoladeGroupsEditor
        label="Accolades — left column"
        groups={head.columns[0]}
        onChange={(v) => setColumn(0, v)}
      />
      <AccoladeGroupsEditor
        label="Accolades — right column"
        groups={head.columns[1]}
        onChange={(v) => setColumn(1, v)}
      />

      <ListEditor
        label="Assistant coaches"
        items={data.assistants}
        onChange={(v) => onChange({ ...data, assistants: v })}
        blankItem={{ role: '', name: '', image: '', phone: '', accolades: [] }}
        itemTitle={(c) => c.name || 'New coach'}
        addLabel="Add coach"
        renderItem={(item, update) => (
          <>
            <ImageUploadField
              label="Portrait"
              value={item.image}
              onChange={(v) => update({ ...item, image: v })}
              onUpload={uploadCoachImage}
              onUnauthorized={onUnauthorized}
              alt={`${item.name || 'Assistant coach'} portrait preview`}
            />
            <div className="adm-grid-3">
              <Field label="Role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
              <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
              <Field label="Phone" value={item.phone} onChange={(v) => update({ ...item, phone: v })} />
            </div>
            <StringListEditor
              label="Accolades"
              items={item.accolades}
              onChange={(v) => update({ ...item, accolades: v })}
              addLabel="Add accolade"
            />
          </>
        )}
      />
    </>
  )
}

export function PersonalTrainingEditor({ data, onChange }) {
  return (
    <>
      <Field label="Intro paragraph" value={data.intro} onChange={(v) => onChange({ ...data, intro: v })} textarea />
      <ListEditor
        label="Pricing cards"
        items={data.cards}
        onChange={(v) => onChange({ ...data, cards: v })}
        blankItem={{ tag: '', amount: '', unit: '', name: '', desc: '', featured: false }}
        itemTitle={(c) => c.name || 'New card'}
        addLabel="Add pricing card"
        renderItem={(item, update) => (
          <>
            <div className="adm-grid-3">
              <Field label="Tag (e.g. Solo Session)" value={item.tag} onChange={(v) => update({ ...item, tag: v })} />
              <Field label="Price (e.g. $80)" value={item.amount} onChange={(v) => update({ ...item, amount: v })} />
              <Field label="Unit (e.g. per session)" value={item.unit} onChange={(v) => update({ ...item, unit: v })} />
            </div>
            <Field label="Card name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            <Field label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} textarea />
            <CheckboxField
              label="Featured (highlighted card)"
              checked={item.featured}
              onChange={(v) => update({ ...item, featured: v })}
            />
          </>
        )}
      />
      <ListEditor
        label="Notes (below the cards)"
        items={data.notes}
        onChange={(v) => onChange({ ...data, notes: v })}
        blankItem={{ label: '', text: '', linkText: '', linkHref: '', textAfter: '' }}
        itemTitle={(n) => n.label || 'New note'}
        addLabel="Add note"
        renderItem={(item, update) => (
          <>
            <Field label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
            <Field label="Text (before the link)" value={item.text} onChange={(v) => update({ ...item, text: v })} textarea />
            <div className="adm-grid-3">
              <Field label="Link text" value={item.linkText} onChange={(v) => update({ ...item, linkText: v })} />
              <Field label="Link target (e.g. #programs)" value={item.linkHref} onChange={(v) => update({ ...item, linkHref: v })} />
              <Field label="Text after the link" value={item.textAfter} onChange={(v) => update({ ...item, textAfter: v })} />
            </div>
          </>
        )}
      />
    </>
  )
}

export function CampsEditor({ data, onChange }) {
  return (
    <>
      <ListEditor
        label="Camps & events"
        items={data.items}
        onChange={(v) => onChange({ ...data, items: v })}
        blankItem={{ date: '', name: '', desc: '', link: '#contact' }}
        itemTitle={(c) => c.name || 'New camp'}
        addLabel="Add camp"
        renderItem={(item, update) => (
          <>
            <div className="adm-grid-2">
              <Field label="Date text" value={item.date} onChange={(v) => update({ ...item, date: v })} />
              <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
            </div>
            <Field label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} textarea />
            <Field
              label="Link (e.g. #contact or a URL)"
              value={item.link}
              onChange={(v) => update({ ...item, link: v })}
            />
          </>
        )}
      />
      <Field label="Section note" value={data.note} onChange={(v) => onChange({ ...data, note: v })} textarea />
    </>
  )
}
