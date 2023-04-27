import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useEffect } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, columnName: readonly string[], theme: Theme) {
  return {
    fontWeight: columnName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

interface MultipleSelectorProps {
  label: string
  names: string[]
  getColumnName: (column: string[]) => void
  value: string[]
}

export default function MultipleSelector(props: MultipleSelectorProps) {
  const { names, getColumnName, label, value } = props
  const theme = useTheme()
  const [columnName, setColumnName] = React.useState<string[]>(value)

  const handleChange = (event: SelectChangeEvent<typeof columnName>) => {
    const {
      target: { value },
    } = event
    setColumnName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  useEffect(() => {
    getColumnName(columnName)
  }, [columnName])

  return (
    <div>
      <FormControl sx={{ m: 1, flex: 1 }}>
        <InputLabel data-testid='multiple-chip-label'>{label}</InputLabel>
        <Select
          labelId='multiple-chip-label'
          id='multiple-chip'
          multiple
          value={columnName}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, columnName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
