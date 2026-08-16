"use client"

interface Props {
  action: (formData: FormData) => void
  id: string
  label?: string
}

export function DeleteButton({ action, id, label = "Delete" }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${label}? This can't be undone.`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-xs text-red-500 hover:underline">
        {label}
      </button>
    </form>
  )
}
