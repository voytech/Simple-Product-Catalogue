import * as  React from 'react';
import { Pagination } from 'react-bootstrap';
import { RenderHeaderProps, RenderCell, RenderCells, RenderBody,
        TableDataProps, TableActionsProps,TableColumns,RenderBodyProps,
        TableCellActions, TableRowActions,TableColumnActions,
        NoArgRender, TableColumn} from '../TableComponent'
import { editButtonCell } from '../renderers/Basics'

interface PaginationProps<E>{
  pageSize : number
  total : number
  offset : number;
  getPage : (offset : number,pageSize :number) => void
}

type WithPaginationProps<E> = {pageSize ?: number,
                               getPage ?: (offset : number,pageSize :number) => void
                               total ?: number,
                               offset ?: number} &
                               TableDataProps<E>    &
                               RenderHeaderProps<E> &
                               TableActionsProps<E> &
                               RenderBodyProps<E>;

interface WithPaginationState {
  pageNr : number
}

export function withPagination<M>(passProps ?: PaginationProps<M>){
  return (Component) => {
    return class extends React.Component<WithPaginationProps<M>,WithPaginationState> {

      constructor(props){
        super(props)
        this.state = {pageNr : 1}
      }

      pageCount(){
        return (this.props.total && (this.props.total > 0)) ?
               Math.ceil(this.props.total / this.props.pageSize) : 0
      }

      currentPage(){
        return (this.props.offset && this.props.pageSize) ?
               (this.props.offset / this.props.pageSize)+1 : 1
      }

      offset(page : number){
        return page * this.props.pageSize;
      }

      requestPage(page : number){
        this.props.getPage(this.offset(page-1),this.props.pageSize)
      }


      renderPageNumbers(){
        return Array.apply(null, Array(this.pageCount())).map((i,idx) =>
          <Pagination.Item active={idx+1 === this.currentPage()} onClick={()=> this.requestPage(idx+1)} >{idx+1}</Pagination.Item>)
      }

      renderPagination = () => {
        return <>
                <Pagination bsSize="small">
                  {this.renderPageNumbers()}
                </Pagination>
               </>
      }

      render(){
        return <>
                <Component {...this.props} />
                {this.renderPagination()}
               </>
      }
    }
  }

}
