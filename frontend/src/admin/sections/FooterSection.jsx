import { Field, ListEditor } from '../fields.jsx'

export default function FooterEditor({ data, onChange }) {
  return (
    <ListEditor
      label="Footer navigation groups"
      items={data.groups}
      onChange={(groups) => onChange({ ...data, groups })}
      blankItem={{ title: '', links: [] }}
      itemTitle={(group) => group.title || 'New footer group'}
      addLabel="Add footer group"
      renderItem={(group, updateGroup) => (
        <>
          <Field
            label="Group heading"
            value={group.title}
            onChange={(title) => updateGroup({ ...group, title })}
          />
          <ListEditor
            label="Links"
            items={group.links}
            onChange={(links) => updateGroup({ ...group, links })}
            blankItem={{ label: '', href: '' }}
            itemTitle={(link) => link.label || 'New link'}
            addLabel="Add footer link"
            renderItem={(link, updateLink) => (
              <div className="adm-grid-2">
                <Field
                  label="Link text"
                  value={link.label}
                  onChange={(label) => updateLink({ ...link, label })}
                />
                <Field
                  label="Destination"
                  value={link.href}
                  onChange={(href) => updateLink({ ...link, href })}
                  hint="Use a section anchor such as #staff or a full external URL."
                />
              </div>
            )}
          />
        </>
      )}
    />
  )
}
