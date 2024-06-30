// src/components/DragAndDropInput.tsx
import {useCallback, useState, useEffect} from 'react';
import {setAvatar, getProfile, getAvatar} from '../store/userSlice';
import {useAppDispatch, useAppSelector} from '../hooks';

export const DragAvatar: React.FC=() => {
    const dispatch=useAppDispatch();
    const avatar=useAppSelector(getAvatar);

    const [preview, setPreview]=useState<string|null>(null);

    useEffect(() => {
        if(avatar) {
            setPreview(avatar);
        }
    }, [avatar]);


    const handleDrop=useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file=e.dataTransfer.files[0];
        if(file) {
            const reader=new FileReader();
            reader.onloadend=() => {
                setPreview(reader.result as string);
                dispatch(setAvatar(reader.result as string));
            };
            reader.readAsDataURL(file);
        }
    }, [dispatch]);

    const handleChange=useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file=e.target.files?.[0];
        if(file) {
            const reader=new FileReader();
            reader.onloadend=() => {
                setPreview(reader.result as string);
                dispatch(setAvatar(reader.result as string));
            };
            console.log(reader);
            reader.readAsDataURL(file);
        }
    }, [dispatch]);

    const handleDragOver=(e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            className="dragAvatar"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {preview? (
                <img src={preview} alt="Avatar Preview" />
            ):(
                <p>Drag and drop an avatar here, or click to select one</p>
            )}
            <input type="file" onChange={handleChange} />
        </div>
    );
};