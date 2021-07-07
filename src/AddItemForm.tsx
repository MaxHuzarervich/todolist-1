import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()  //удаляет у строки все пробелы с двух сторон
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('') //чтобы поле очищалось после добавления новой таски.

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={'Title'}
                helperText={error && 'Title is required!'}
                size={'small'}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})

export default AddItemForm;