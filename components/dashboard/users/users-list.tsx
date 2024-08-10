'use client';

import { DeleteUserAction, EditUserAction } from '@/actions/user-auth';
import { useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import EditUserForm from './edit-user-form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: '110',
    transform: 'translate(-50%, -50%)',
  },
};

type UsersListProps = {
  users:
    | {
        id: string;
        name: string | null;
        email: string | null;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
};

const UsersList = ({ users }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <div className='flex'>
        <div className=' overflow-x-auto'>
          <div className='inline-block min-w-full p-1.5 align-middle'>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500'
                    >
                      نام کاربری
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500'
                    >
                      ایمیل
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500'
                    >
                      دسترسی
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500'
                    >
                      فرمان ها
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {users?.map((user: any) => (
                    <tr>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>
                        {user?.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
                        {user?.email}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
                        {user?.role}
                      </td>
                      <td className='flex items-center justify-center gap-4 whitespace-nowrap px-6 py-4 text-end text-sm font-medium'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                          onClick={() => DeleteUserAction(user?.id)}
                        >
                          حذف
                        </button>
                        <button
                          onClick={() => {
                            setModalIsOpen(true);
                            setUser(user);
                          }}
                          type='button'
                          className='inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                        >
                          ویرایش
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel='ویرایش کاربر'
      >
        <div className='z-50 flex flex-col px-8'>
          <IoClose
            onClick={() => setModalIsOpen(false)}
            className='right-3 top-3'
          />
          <EditUserForm user={user} />
        </div>
      </Modal>
    </>
  );
};

export default UsersList;
