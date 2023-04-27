import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Option {
  value: string | number
  label: string
}

interface BasicSelectProps {
  initialValue: string | null
  label: string
  options: Option[]
  getOption: (value: string | number) => void
}

const BasicSelect: React.FC<BasicSelectProps> = ({ options, getOption, label, initialValue }) => {
  const [value, setValue] = React.useState(initialValue || undefined)

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
    getOption(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select labelId='demo-simple-select-label' id='demo-simple-select' value={value} label='Value' onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect
