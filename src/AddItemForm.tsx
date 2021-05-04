import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
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
    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required!</div>
        : null


    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}/>
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;