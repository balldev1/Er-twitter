import React, { useState, useEffect, useCallback } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Modal from '../Modal';
import Input from '../Input';
import ImageUpload from '../ImageUpload';


const EditModal = () => {

    // {data curren=> mutate.id =>open editModal}
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    // {state data}
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    // {set state}
    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);

    {/* Loading */ }
    const [isLoading, setIsLoading] = useState(false);

    // {Submit cb => axios.patch => api/edit => data => mutateFetchedUser  }
    const onSubmit = useCallback(async () => {

        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });

            mutateFetchedUser();
            toast.success('Updated');

            editModal.onClose();

        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser])

    // {Content}
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label='Upload profile image'
            />
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label='Upload cover image'
            />
            <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (

        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit your profile'
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal
