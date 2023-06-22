import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

// {Follow}
const useFollow = (userId: string) => {
    // {useUser(userId) , useCurrentUser}
    // {รับข้อมูลผู้ใช้ปัจจุบัน current , update ข้อมูลผู้ใช้}
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    // {Modal login}
    const loginModal = useLoginModal();

    // {useMemo}
    // { จะถูกเรียกใช้เพื่อคำนวณค่า isFollowing ใหม่}
    // {  currentUser?.followingIds || [] = list}
    // { list.includes(userId) ตรวจสอบว่า userId อยู่ในอาร์เรย์ list หรือไม่
    // isFollowing ถ้ามีเป็นtrue ถ้าไม่มีเป็น false}

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    // {toggleFollow if !current user open modal} 
    // {toggleFollow คือการตรวจสอบสถานะของผู้ใช้ปัจจุบัน 
    // และส่งคำขอเปลี่ยนแปลงการติดตามผู้ใช้ตามสถานะปัจจุบันของ isFollowing 
    // พร้อมกับการอัปเดตข้อมูลผู้ใช้และแสดงข้อความตามผลลัพธ์}
    // {!currentUser open loginModal}
    // {let request => true isFollowing DELETE / false !isFollowing POST}
    // mutateCurrentUser() เพื่ออัปเดตข้อมูลผู้ใช้ปัจจุบัน
    // mutateFetchedUser() เพื่ออัปเดตข้อมูลผู้ใช้ที่ต้องการติดตาม
    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete(`/api/follow?userId=${userId}`)
            } else {
                request = () => axios.post(`/api/follow?userId=${userId}`)
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong');
            console.log
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow;