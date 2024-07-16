import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import "./item.css"
interface ItemProps {
    item: string;
    id: string;
  }
export default function Item(props:ItemProps) {
    const {item ,id}= props
    const {listeners,attributes,setNodeRef,transform,transition} = useSortable({id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
  return (
    <div style={style} id={id} ref={setNodeRef} {...attributes} {...listeners} className='btn btn-secondary TouchActionNone flex-column my-1' >
        {item}
    </div>
  )
}
