import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string,
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }


    return (
        editMode
            ? <TextField
                color={'primary'}
                variant={'filled'}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}/>

            : <span onDoubleClick={onEditMode}>  {props.title}  </span>
    )
}

export default EditableSpan;