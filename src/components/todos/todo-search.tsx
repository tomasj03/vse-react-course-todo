type TodoSearchProps = {
  value: string
  onChange: (value: string) => void
}

export const TodoSearch = ({ value, onChange }: TodoSearchProps) => {
  return (
    <div className="search-input">
       <input type="text" placeholder="Search task..." value={value} onChange={e => onChange(e.target.value)}/>
    </div>
  )
}