import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import Item from './Item'

export default function List() {
    const [PeopleList, setPeopleList] = useState(["ahmed", "adel", "Mohamed", "Kamal", "nour", "Ramy"])
    const getArrID = (id:string | number | undefined) => PeopleList.findIndex(PeopleList => PeopleList == id)
    const handleDragEnd = (event: DragEndEvent) => {
        const {active,over} = event
        if (active.id === over?.id) return
        const originalPosition = getArrID(active.id)
        const newPosition = getArrID(over?.id)
        const newArr = arrayMove(PeopleList,originalPosition,newPosition)
        setPeopleList(newArr)
    }
    const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(TouchSensor),  
    useSensor(KeyboardSensor)    
    )
    return (
        <div className='bg-dark text-light flex-grow-1 d-flex flex-column justify-content-center overflow-hidden'>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={PeopleList} strategy={verticalListSortingStrategy}>
                    {PeopleList.map((item) => (
                        <Item key={item} id={item} item={item} />
                    ))}
                </SortableContext>

            </DndContext>

        </div>
    )
}
