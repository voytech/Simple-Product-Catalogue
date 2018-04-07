import * as  React from 'react';
import { TableComponent,
         TableProps,
         Row} from '../TableComponent'

export const pagination = (props : TableProps<Row<any>>) => {
  return ( component : TableComponent ) : React.ReactNode => {
     return <>
            <TableComponent  {...props} />

           </>
  }
}
