import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}:AddItemFormPropsType) => {
    console.log("AddItemForm called")

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()  //удаляет у строки все пробелы с двух сторон
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('') //чтобы поле очищалось после добавления новой таски.

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        // if(error !== null) setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                variant={'outlined'}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={'Title'}
                helperText={error && 'Title is required!'}
                size={'small'}
            />
            <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})

export default AddItemForm;