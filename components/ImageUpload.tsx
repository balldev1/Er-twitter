import React, { useCallback, useState } from 'react';
import Image from "next/image";
import { useDropzone } from 'react-dropzone';

interface ImageUploadProp {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

// {Image upload base64}
const ImageUpload: React.FC<ImageUploadProp> = ({
    onChange,
    label,
    value,
    disabled
}) => {

    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange])

    // { get files => files[0],new FileReader =>}
    // { get event => setBase64,handleChange }
    // { reader => (file)}
    // { setBase64 จะกำหนดค่าให้กับตัวแปร base64
    // { handleChange จะถูกเรียกเพื่อจัดการข้อมูลภาพที่อ่านได้ base 64 }
    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            setBase64(e.target.result);
            handleChange(e.target.result);
        }

        reader.readAsDataURL(file);
    }, [handleChange])

    // {Hook Drop zone type upload}
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });
    // {image upload}
    return (
        <div
            {...getRootProps({
                className: 'w-full p-4 text-white text-white text-center border-2 border-dotted rounded-md border-neutral-700 '
            })}
        >
            <input {...getInputProps()} />

            {/* {base64 มีค่าไหมถ้ามี จะแสดง Image} */}
            {
                base64 ? (
                    <div className='flex items-center justify-center'>
                        <Image
                            src={base64}
                            height='100'
                            width='100'
                            alt='Uploaded image'
                        />
                    </div>
                ) : (
                    <p className='text-white'>{label}</p>
                )
            }
        </div >
    )
}

export default ImageUpload
