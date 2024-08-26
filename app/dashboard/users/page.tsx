import { GetAllUsersAction } from '@/actions/user-auth';
import UsersList from '@/components/dashboard/users/users-list';
import Link from 'next/link';
const Users = async () => {
  const users = await GetAllUsersAction();

  return (
    <div className='mt-8'>
      <Link
        href='/dashboard/users/create'
        className='mr-4 rounded-md border-2 border-white bg-primary px-4 py-2 text-white dark:bg-gray-900 dark:text-white'
      >
        ساخت کاربر جدید
      </Link>

      <UsersList users={users} />
    </div>
  );
};

export default Users;
