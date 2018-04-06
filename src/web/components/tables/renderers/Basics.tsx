import * as  React from 'react';
import { Button,
         Glyphicon  } from 'react-bootstrap';
import { Cell,
         TableCellActions,
         Column,
         TableColumnActions } from '../../tables/TableComponent'

const  dateOnly = (dateWithTime) => dateWithTime && dateWithTime.split('T')[0]

export const  buttonColumn = (glyph:string, clickFunc : Function) => {
    return (column : Column, actions : TableColumnActions) => {
              return <td key={column.title}>
                      <Button bsSize='xsmall' onClick={() => clickFunc()}>
                        <Glyphicon glyph={glyph} />
                      </Button>
                    </td>
    }
}

export const removeButtonColumn = (column : Column, actions : TableColumnActions) => {
  return <th key={column.title}>
           <Button bsStyle='danger' bsSize='xsmall' onClick={() => alert('removing all')}>
             <Glyphicon glyph='trash' />
           </Button>
         </th>
}

export const  buttonCell = (glyph:string, clickFunc : Function) => {
    return (cell : Cell, actions : TableCellActions) => {
              return <td key={cell.column.title}>
                      <Button bsSize='xsmall' onClick={() => actions.editRow()}>
                        <Glyphicon glyph={glyph} />
                      </Button>
                    </td>
    }
}

export const  editButtonCell = (cell : Cell, actions : TableCellActions) => {
  return <td key={cell.column.title}>
           <Button bsSize='xsmall' onClick={() => actions.editRow()}>
             <Glyphicon glyph='pencil' />
           </Button>
        </td>
}

export const  removeButtonCell = (cell : Cell, actions : TableCellActions) => {
  return <td key={cell.column.title}>
           <Button bsSize='xsmall'  type='button' onClick={(e) => actions.removeRow()}>
             <Glyphicon glyph='trash' />
           </Button>
        </td>
}

export const dateCell = (cell : Cell, actions : TableCellActions) => {
  return <td key={cell.column.title}>{dateOnly(cell.value)}</td>
}
