import { auth } from '@/auth';
import { GetAllUsersAction } from '@/actions/user-auth';
import UsersList from '@/components/dashboard/users/users-list';
import Link from 'next/link';
const Users = async () => {
  const session = await auth();
  const users = await GetAllUsersAction();

  return (
    <div className=''>
      <Link
        href='/dashboard/users/create'
        className='my-6 mr-4 rounded border-2 border-white bg-primary px-4 py-2 text-white dark:bg-gray-900 dark:text-white'
      >
        ساخت کاربر جدید
      </Link>

      <UsersList users={users} />
    </div>
  );
};

export default Users;
